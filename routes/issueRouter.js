const express = require("express")  
const issueRouter = express.Router()
const Issue = require('../models/issue.js')
const Vote = require("../models/vote")
const Comment = require('../models/comment')

// get issue by search
issueRouter.get('/search', (req, res, next) => {
  const { title } = req.query
  const pattern = new RegExp(title)
  Issue.find(
    { title: { $regex: pattern, $options: 'i' } },
    (err, issues) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(issues)
    }
  )
})

// Get All Issues
issueRouter.get("/", (req, res, next) => {
  Issue.find((err, issues) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issues)
  })
})

// Get issues by user id
issueRouter.get("/user", (req, res, next) => {
  Issue.find({ user: req.user._id }, (err, issue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issue)
  })
})

// Add new Issue
issueRouter.post("/", (req, res, next) => {
  req.body.user = req.user._id
  const newIssue = new Issue(req.body)
  newIssue.save((err, savedIssue) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedIssue)
  })
})

// Delete Issue
issueRouter.delete("/:issueId", (req, res, next) => {
  Issue.findOneAndDelete(
    { _id: req.params.issueId, user: req.user._id },
    (err, deletedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(200).send(`Successfully delete issue: ${deletedIssue.title}`)
    }
  )
})

// Update Issue
issueRouter.put("/:issueId", (req, res, next) => {
  Issue.findOneAndUpdate(
    { _id: req.params.issueId, user: req.user._id },
    req.body,
    { new: true },
    (err, updatedIssue) => {
      if(err){
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedIssue)
    }
  )
})
// get specific issue
issueRouter.get('/:issueId', (req, res, next) => {
  Issue.find({_id: req.params.issueId}, (err, issue) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(issue)
  })
})
// comment on issue
issueRouter.post('/:issueId', (req, res, next) => {
  req.body.user = req.user._id
  req.body.issue = req.params.issueId
  const newComment = new Comment(req.body)
  newComment.save((err, comment) => {
    if (err) {
      res.status(500)
      return next(err)
    }
  })
  Issue.findOneAndUpdate(
    {_id: req.params.issueId}, 
    { $push: { comments: newComment._id } },
    { new: true },
    (err, issue) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      return res.status(200).send(newComment)
    }
  )
})
// get all comments for an issue
issueRouter.get('/:issueId/comments', (req, res, next) => {
  Comment.find({issue: req.params.issueId}, (err, comments) => {
    if (err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(comments)
  })
})
// upvote issue
issueRouter.put('/:issueId/upvote', (req, res, next) => {
  Issue.findOneAndUpdate(
    {_id: req.params.issueId, 'votes.upvoteUsers': { $nin: [req.user._id]}},
    {
      $addToSet:
        { "votes.upvoteUsers": req.user._id },
      $pull: 
        { "votes.downvoteUsers": req.user._id },
      $inc:
        { "votes.total" : 1}
    },
    { new: true}, 
    (err, updatedIssue) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      if (!err & !updatedIssue) {
        res.status(500)
        error = {
          message: 'user already upvoted'
        }
        return next(error)
      } 
      return res.status(200).send(updatedIssue)
    }
  )
})
// downvote issue
issueRouter.put('/:issueId/downvote', (req, res, next) => {
  Issue.findOneAndUpdate(
    {_id: req.params.issueId, 'votes.downvoteUsers': { $nin: [req.user._id]}},
    {
      $addToSet:
        { "votes.downvoteUsers": req.user._id },
      $pull: 
        { "votes.upvoteUsers": req.user._id },
      $inc:
        { "votes.total" : -1}
    },
    { new: true}, 
    (err, updatedIssue) => {
      if (err) {
        res.status(500)
        return next(err)
      }
      if (!err & !updatedIssue) {
        res.status(500)
        error = {
          message: 'user already downvoted'
        }
        return next(error)
      } 
      return res.status(200).send(updatedIssue)
    }
  )
})

module.exports = issueRouter
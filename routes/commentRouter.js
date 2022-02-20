const express = require('express')
const commentRouter = express.Router()
const Comment = require('../models/comment')

// get comments by search
commentRouter.get('/search', (req, res, next) => {
    const { comment } = req.query
    const pattern = new RegExp(comment)
    Comment.find(
      { comment: { $regex: pattern, $options: 'i' } },
      (err, comments) => {
        if (err) {
          res.status(500)
          return next(err)
        }
        return res.status(200).send(comments)
      }
    )
})

// get all comments
commentRouter.get('/', (req, res, next) => {
    Comment.find((err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})
// get all user comments
commentRouter.get('/:userId', (req, res, next) => {
    Comment.find({user: req.params.userId}, (err, comments) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(comments)
    })
})


module.exports = commentRouter
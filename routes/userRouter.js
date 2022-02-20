const express = require("express")
const userRouter = express.Router()
const Issue = require('../models/issue')
const Vote = require("../models/vote")
const User = require('../models/user')


userRouter.route('/')
// get all users
    .get((req, res, next) => {
        User.find((err, users) => {
            if (err) {
                res.status(500)
                return next(err)
            }
            return res.status(200).send(users)
        })
    })

userRouter.get('/:userId', (req, res, next) => {
    User.findOne({_id: req.params.userId}, (err, user) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(user)
    })
})
// get all issues user voted on
userRouter.get('/:userId/votes', (req, res, next) => {
    Issue.find({
        $or: [
            { 'votes.upvoteUsers': { $in : req.params.userId } },
            { 'votes.downvoteUsers': { $in : req.params.userId } }
        ]
    }, 
    (err, issues) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(issues)
    })
})


module.exports = userRouter
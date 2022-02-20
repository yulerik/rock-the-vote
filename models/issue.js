const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  time: {
    type: Date,
    default: Date.now,
    required: true
  },
  votes: {
    total: {
      type: Number,
      default: 0,
    },
    upvoteUsers: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true
    }],
    downvoteUsers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }]
  },
  comments: [{
      type: Schema.Types.ObjectId,
      ref: 'Comment'
  }]
})

module.exports = mongoose.model("Issue", issueSchema)
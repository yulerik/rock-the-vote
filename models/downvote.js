const mongoose = require('mongoose')
const Schema = mongoose.Schema

const downvoteSchema = new Schema({
    totalDownvotes: {
        type: Number,
        default: 0,
        required: true
    },
    issueId: {
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    },
    votes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    }]
})

module.exports = Downvote = mongoose.model('Downvote', downvoteSchema)

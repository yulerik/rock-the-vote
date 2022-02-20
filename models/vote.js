const mongoose = require('mongoose')
const Schema = mongoose.Schema

const voteSchema = new Schema({
    issueId: {
        type: Schema.Types.ObjectId,
        ref: 'Issue'
    },
    votes: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        voteType: {
            type: String,
            enum: ['up', 'down']
        }
    }]
})

module.exports = Vote = mongoose.model('Vote', voteSchema)

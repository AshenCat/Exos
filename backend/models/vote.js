const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const voteSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: "comment"
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "article"
    },
    vote: {
        type: String,
        required: true,
        enum: ["up", "down"]
    }
}, {timestamps: true})

module.exports = mongoose.model("Votes", voteSchema)
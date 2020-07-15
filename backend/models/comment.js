const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        default: 0
    },
    character: {
        type: Schema.Types.ObjectId,
        ref: "character",
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "article",
    },
    childOf: {
        type: Schema.Types.ObjectId,
        ref: "comment",
        default: null
    }
}, {timestamps: true})

module.exports = mongoose.model("Comments", commentSchema);
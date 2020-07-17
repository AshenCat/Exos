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
    userVotes: [{
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true
        },
        vote: {
            type: String,
            enum: ["up", "down"],
            required: true
        }
    }],
    points: {
        type: Number,
        default: 0
    },
    message: {
        type: String,
        required: true
    },
    character: {
        type: Schema.Types.ObjectId,
        ref: "character",
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "article",
    },
    subComments: [{
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
        character: {
            type: Schema.Types.ObjectId,
            ref: "character",
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }]
    
}, {timestamps: true})

module.exports = {
    model: mongoose.model("Comments", commentSchema),
    schema : commentSchema
};
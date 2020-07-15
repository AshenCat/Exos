const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    avatar: {
        type: String,
    },
    access: {
        type: String,
        enum: ["admin", "user", "tech"],
        required: true,
    },
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: "comment"
    }]
}, 
{timestamps: true}
)

module.exports = mongoose.model('Users', userSchema);
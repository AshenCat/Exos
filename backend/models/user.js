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
    // email: {
    //     type: String,
    //     unique: true
    // },
    access: {
        type: String,
        enum: ["admin", "user", "tech"],
        required: true,
    }
}, 
{timestamps: true}
)

module.exports = mongoose.model('Users', userSchema);
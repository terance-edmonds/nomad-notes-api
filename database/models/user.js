const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: false
        },
        role: {
            type: String,
            require: true,
            enum: ['USER', 'ADMIN'],
            default: 'USER'
        }
    },
    { timestamps: true }
);

const User = mongoose.model('users', userSchema);
module.exports = User;

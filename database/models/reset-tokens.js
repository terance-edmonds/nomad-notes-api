const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resetTokenSchema = new Schema(
    {
        user_id: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require: true
        },
        otp: {
            type: Number,
            require: true
        }
    },
    { timestamps: true }
);

const ResetToken = mongoose.model('reset_tokens', resetTokenSchema);
module.exports = ResetToken;

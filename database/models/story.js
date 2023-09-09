const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = new Schema(
    {
        user_id: {
            type: mongoose.Types.ObjectId,
            require: true
        },
        title: {
            type: String,
            require: true
        },
        review: {
            type: String,
            require: true
        },
        country: {
            type: String,
            require: true
        },
        location: {
            type: String,
            require: true
        },
        when: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: false
        },
        approved: {
            type: Boolean,
            require: false,
            default: false
        }
    },
    { timestamps: true }
);

const Story = mongoose.model('stories', storySchema);
module.exports = Story;

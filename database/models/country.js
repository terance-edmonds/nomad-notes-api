const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countrySchema = new Schema(
    {
        name: {
            type: String,
            require: true,
            unique: true
        },
        description: {
            type: String,
            require: true
        },
        image: {
            type: String,
            require: false
        }
    },
    { timestamps: true }
);

const Country = mongoose.model('countries', countrySchema);
module.exports = Country;

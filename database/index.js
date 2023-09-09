const mongoose = require('mongoose');
const config = require('../config');
const seedDB = require('../seed');

module.exports = {
    init: () => {
        mongoose
            .connect(config.mongodb_con, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log('>> Connected to the database <<');
            })
            .catch((err) => {
                console.log(`>> DB ERROR << \n ${err}`);

                if (err.code === 'ECONNREFUSED') {
                    console.log('>> Failed to connect to the database <<');
                }
            });
    },
    seed: () => {
        seedDB();
    }
};

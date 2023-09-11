const mongoose = require('mongoose');
const config = require('../config');
const seedDB = require('../seed/index');

module.exports = {
    init: (runSeed = false) => {
        mongoose
            .connect(config.mongodb_con, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then(() => {
                console.log('>> Connected to the database <<');
                if (runSeed) seedDB();
            })
            .catch((err) => {
                console.log(`>> DB ERROR << \n ${err}`);

                if (err.code === 'ECONNREFUSED') {
                    console.log('>> Failed to connect to the database <<');
                }
            });
    }
};

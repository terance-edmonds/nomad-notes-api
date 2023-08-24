const express = require('express');
const user = require('./user');

const router = express.Router();

/* user routes */
router.use('/users', user);

module.exports = router;

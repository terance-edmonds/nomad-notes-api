const express = require('express');
const user = require('./user');
const story = require('./story');
const image = require('./image');

const router = express.Router();

/* user routes */
router.use('/users', user);
/* story routes */
router.use('/stories', story);
/* images routes */
router.use('/images', image);

module.exports = router;

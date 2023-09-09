const express = require('express');
const user = require('./user');
const story = require('./story');
const image = require('./image');
const admin = require('./admin');
const country = require('./country');

const router = express.Router();

/* user routes */
router.use('/users', user);
/* story routes */
router.use('/stories', story);
/* images routes */
router.use('/images', image);
/* admin routes */
router.use('/admins', admin);
/* country routes */
router.use('/countries', country);

module.exports = router;

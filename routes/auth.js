const express = require('express');
const auth = require('../app/auth');
const authentication = require('../auth');

const router = express.Router();

router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.delete('/signout', auth.signout);
router.get('/admin', authentication.verifyToken, authentication.isAdmin, auth.isAdmin);

module.exports = router;

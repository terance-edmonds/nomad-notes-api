const express = require('express');
const auth = require('../app/auth');

const router = express.Router();

router.post('/signup', auth.signup);
router.post('/signin', auth.signin);
router.delete('/signout', auth.signout);
router.put('/request/reset', auth.request_password_change);
router.patch('/reset/password', auth.reset_password);

module.exports = router;

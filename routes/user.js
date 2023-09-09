const express = require('express');
const user = require('../app/user');

const router = express.Router();

router.post('/signup', user.signup);
router.post('/signin', user.signin);
router.delete('/signout', user.signout);
router.get('/:id', user.get);
router.put('/request/reset', user.request_password_change);
router.patch('/reset/password', user.reset_password);
router.patch('/update/:id', user.update);
router.get('/:id', user.get);
router.delete('/remove', user.remove);

module.exports = router;

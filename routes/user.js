const express = require('express');
const user = require('../app/user');
const auth = require('../auth');

const router = express.Router();

router.get('/all', auth.verifyToken, auth.isAdmin, user.all);
router.get('/:id', user.get);
router.patch('/update/:id', auth.verifyToken, user.update);
router.patch('/update/password/:id', auth.verifyToken, user.change_password);
router.delete('/remove/:id', auth.verifyToken, user.remove);

module.exports = router;

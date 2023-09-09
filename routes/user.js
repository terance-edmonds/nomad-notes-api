const express = require('express');
const user = require('../app/user');

const router = express.Router();

router.get('/all', user.all);
router.get('/:id', user.get);
router.patch('/update/:id', user.update);
router.patch('/update/password/:id', user.change_password);
router.delete('/remove/:id', user.remove);

module.exports = router;

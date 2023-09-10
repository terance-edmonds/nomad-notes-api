const express = require('express');
const admin = require('../app/admin');
const auth = require('../auth');

const router = express.Router();

router.post('/create', auth.verifyToken, auth.isAdmin, admin.create);
router.patch('/update/:id', auth.verifyToken, auth.isAdmin, admin.update);
router.get('/all', auth.verifyToken, auth.isAdmin, admin.all);
router.get('/:id', auth.verifyToken, auth.isAdmin, admin.get);
router.delete('/remove/:id', auth.verifyToken, auth.isAdmin, admin.remove);

module.exports = router;

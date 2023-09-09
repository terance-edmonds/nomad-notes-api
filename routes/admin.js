const express = require('express');
const admin = require('../app/admin');

const router = express.Router();

router.post('/create', admin.create);
router.patch('/update/:id', admin.update);
router.get('/:id', admin.get);
router.delete('/remove', admin.remove);

module.exports = router;

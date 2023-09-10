const express = require('express');
const country = require('../app/country');
const auth = require('../auth');

const router = express.Router();

router.post('/create', auth.verifyToken, auth.isAdmin, country.create);
router.patch('/update/:id', auth.verifyToken, auth.isAdmin, country.update);
router.get('/all', country.all);
router.get('/random/:id', country.random);
router.get('/:id', country.get);
router.delete('/remove/:id', auth.verifyToken, auth.isAdmin, country.remove);

module.exports = router;

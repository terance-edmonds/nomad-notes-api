const express = require('express');
const country = require('../app/country');

const router = express.Router();

router.post('/create', country.create);
router.patch('/update/:id', country.update);
router.get('/all', country.all);
router.get('/:id', country.get);
router.delete('/remove', country.remove);

module.exports = router;

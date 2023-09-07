const express = require('express');
const country = require('../app/country');

const router = express.Router();

router.post('/create', country.create);
router.patch('/update', country.update);
router.get('/:id', country.get);
router.delete('/remove', country.remove);

module.exports = router;

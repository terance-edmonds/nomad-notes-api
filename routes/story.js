const express = require('express');
const story = require('../app/story');

const router = express.Router();

router.post('/create', story.create);
router.get('/all', story.all);
router.get('/search', story.search);
router.get('/:id', story.get);

module.exports = router;

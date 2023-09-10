const express = require('express');
const story = require('../app/story');
const auth = require('../auth');

const router = express.Router();

router.post('/create', auth.verifyToken, story.create);
router.get('/all', story.all);
router.get('/search', story.search);
router.get('/random/:id', story.random);
router.get('/:id', story.get);
router.patch('/update/:id', auth.verifyToken, story.update);
router.patch('/update/state/:id', auth.verifyToken, story.state);
router.delete('/remove/:id', auth.verifyToken, story.remove);

module.exports = router;

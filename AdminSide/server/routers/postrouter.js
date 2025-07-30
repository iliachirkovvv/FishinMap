const express = require('express');
const router = express.Router();
const { getAllPosts, updatePostStatus } = require('../controllers/postController');

router.get('/', getAllPosts);

router.put('/:id', updatePostStatus);

module.exports = router;

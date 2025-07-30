const express = require('express');
const router = express.Router();
const {
    getAllPosts,
    approvePost,
    deletePost
} = require('../controllers/postController');

router.get('/', getAllPosts);

router.put('/approve/:id', approvePost);

router.delete('/:id', deletePost);

module.exports = router;

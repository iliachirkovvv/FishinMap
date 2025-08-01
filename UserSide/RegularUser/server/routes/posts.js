// server/routes/posts.js
const express = require('express');
const router  = express.Router();
const Post    = require('../models/post.js');

// POST /api/posts
// Body: { author, fishType, fishWeight, fishLength, catchDate, photoSrc, location }
router.post('/', async (req, res) => {
  const { user, fishType, fishWeight, fishLength, catchDate, photoSrc, location } = req.body;
  try {
    const p = new Post({ user, fishType, fishWeight, fishLength, catchDate, photoSrc, location });
    await p.save();
    res.status(201).json({ message: 'Post created', postId: p._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET all fish locations
router.get('/', async (req, res) => {
  try {
    const locations = await approvedPost.find({});
    res.json(locations);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
// server/routes/posts.js
const express = require('express');
const router  = express.Router();
const Post    = require('../models/post.js');

// POST /api/posts
// Body: { author, fishType, fishWeight, fishLength, catchDate, photoSrc, location }
router.post('/', async (req, res) => {
  const { user, fishType, fishWeight, fishLength, catchDate, photoSrc, location } = req.body;
  // if (!user || !fishType || !fishWeight || !fishLength || !catchDate || !location) {
  //   return res.status(400).json({ error: 'Missing required fields' });
  // }
  try {
    const p = new Post({ user, fishType, fishWeight, fishLength, catchDate, photoSrc, location });
    await p.save();
    res.status(201).json({ message: 'Post created', postId: p._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/posts?author=<userId>
// Возвращает либо все посты, либо только по автору
router.get('/', async (req, res) => {
  const filter = {};
  if (req.query.author) filter.author = req.query.author;
  try {
    const list = await Post.find(filter).sort({ createdAt: -1 });
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// server/routes/expertPosts.js
const express = require('express');
const router  = express.Router();
const ExpertPost = require('../models/expertPost.js');

router.post('/', async (req, res) => {
  const {
    user,
    fishType,
    season,
    fishWeight,
    fishLength,
    amount,
    catchDate,
    location,
    photoSrc,
    __v
  } = req.body;

  // Проверяем обязательные поля
  if (!user || !fishType || !season || !fishWeight ||
      !fishLength || amount == null || !catchDate || !location) {
    return res.status(400).json({ error: 'Missing required fields for expert post' });
  }

  try {
    const ep = new ExpertPost({
      user,
      fishType,
      season,
      fishWeight,
      fishLength,
      amount,
      catchDate,
      location,
      photoSrc,
      status: 1
    });
    await ep.save();
    res.status(201).json({ message: 'Expert post published', postId: ep._id });
  } catch (err) {
    console.error('❌ ExpertPost save error:', err);
    res.status(500).json({ error: 'Server error while saving expert post' });
  }
});

module.exports = router;

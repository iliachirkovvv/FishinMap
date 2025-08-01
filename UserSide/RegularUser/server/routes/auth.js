// server/routes/auth.js
const express = require('express');
const router  = express.Router();
const User    = require('../models/user.js');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // 1) Проверяем, что все поля переданы
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    // 2) Убеждаемся, что email ещё не существует
    if (await User.findOne({ email })) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    // 3) Создаем и сохраняем, по умолчанию isActive=false
    const user = new User({ firstName, lastName, email, password });
    await user.save();
    console.log('➕ New user saved:', user);
    // 4) Отправляем ответ клиенту
    res.status(201).json({ message: 'Registration submitted', userId: user._id });
  } catch (err) {
    console.error('❌ Signup error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // 1) Проверяем наличие полей
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  try {
    // 2) Ищем пользователя с совпадающим email+пароль
    const user = await loginUser.findOne({
      email,
      password,
      __v: 1
    });
    // 3) Если не найден — 401
    if (!user) {
      return res
        .status(401)
        .json({ error: 'Invalid credentials or account not activated' });
    }
    // 4) Если есть — отправляем минимальный объект без пароля
    res.json({
      message: 'OK',
      user: {
        id:        user._id,
        firstName: user.firstName,
        lastName:  user.lastName,
        email:     user.email,
        rank:      user.rank,
        role:      user.role
      }
    });
  } catch (err) {
    console.error('❌ Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

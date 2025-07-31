// server/serverUser.js
require('dotenv').config();
const express  = require('express');
const mongoose =   require('mongoose');
const path     = require('path');
const cors     = require('cors');

const authRouter = require('./server/routes/auth');
const postRouter = require('./server/routes/posts');
// (если позже заведёте users.js или admin.js, подключайте тут)

// 1) Подключаемся к MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser:    true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB error:', err));

const app = express();

// 2) Middlewares
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

// 3) API-маршруты
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

// 4) Раздача фронтенда
//    Предполагается, что рядом с server/ лежит папка client/
const clientPath = path.resolve(__dirname, '.', 'client');
app.use(express.static(clientPath));

// 5) Корень сайта — страница логина
app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath, 'mainUserScrean.html'));
});

// 6) Запуск
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

const expertPostRouter = require('./server/routes/expert');
app.use('/api/posts/expert', expertPostRouter);

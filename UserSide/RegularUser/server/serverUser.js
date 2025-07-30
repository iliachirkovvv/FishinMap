// server.js
require('dotenv').config();
const express = require('express');
const path    = require('path');
const app     = express();

const clientPath = path.join(__dirname, '..', 'client');
console.log('👉 Static files should be served from:', clientPath);

// раздача статики
app.use(express.static(clientPath));

// по «/» отдаём ваш главный html (если не хотите переименовывать в index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(clientPath,'..', 'mainUserScrean.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

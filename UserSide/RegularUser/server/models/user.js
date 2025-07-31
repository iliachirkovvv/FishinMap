// server/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },          // имя
  lastName:  { type: String, required: true },          // фамилия
  email:     { type: String, required: true, unique: true }, 
  password:  { type: String, required: true },          // (хешируйте на проде!)

  rank: {
    type: Number,
    default: 0,        // стартовый ранг
    min: 0
  },
  role: {
    type: String,
    enum: ['Regular', 'Expert', 'Admin'],
    default: 'Regular' // по умолчанию обычный пользователь
  }
  
}, {
  timestamps: true    // автоматически добавит createdAt / updatedAt
});

module.exports = mongoose.model('User', UserSchema);

// server/models/User.js
const mongoose = require('mongoose');
const fishinmapConnection = mongoose.createConnection('mongodb+srv://anna0512521646:Adminadmin@fishinmap.9zvhhlc.mongodb.net/fishinMap?retryWrites=true&w=majority');

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

module.exports = new mongoose.model('User', UserSchema);

loginUser = fishinmapConnection.model('User', UserSchema);

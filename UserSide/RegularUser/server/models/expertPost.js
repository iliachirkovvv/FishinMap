// server/models/expertPost.js
const mongoose = require('mongoose');

const ExpertPostSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fishType:   { type: String, required: true },
  season:     { type: String, required: true },      // сезон — поле эксперта
  fishWeight: { type: String, required: true },
  fishLength: { type: String, required: true },
  amount:     { type: Number, required: true },      // количество рыбы — поле эксперта
  catchDate:  { type: Date,   required: true },
  location:   { type: String, required: true },
  photoSrc:   { type: String },                      // base64 или URL
  __v:     {
    type: Number,
    default: 1                             // сразу одобрён
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ExpertPost', ExpertPostSchema);

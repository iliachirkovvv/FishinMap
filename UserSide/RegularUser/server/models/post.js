// server/models/Post.js
const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fishType:   { type: String, required: true },
  fishWeight: { type: String, required: true },
  fishLength: { type: String, required: true },
  catchDate:  { type: Date,   required: true },
  location:   { type: String, required: true },     // здесь вы храните выбранную строку из selectLocation
  photoSrc:   { type: String },                     // base64 или URL загруженной фотки
  status:     { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);

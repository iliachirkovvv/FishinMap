// server/models/Post.js
const mongoose = require('mongoose');
const fishinmapConnection = mongoose.createConnection('mongodb+srv://anna0512521646:Adminadmin@fishinmap.9zvhhlc.mongodb.net/fishinMap?retryWrites=true&w=majority');

const PostSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
  fishType:   { type: String, required: false },
  fishWeight: { type: String, required: false },
  fishLength: { type: String, required: false },
  catchDate:  { type: Date,   required: false },
  location:   { type: String, required: false },
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
approvedPost = fishinmapConnection.model('Post', PostSchema);

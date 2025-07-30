const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    fishType: { type: String, required: true },
    fishWeight: { type: String, required: true },
    fishLength: { type: String, required: true },
    catchDate: { type: Date, required: true },
    location: { type: String, required: true },
    photoSrc: { type: String },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema);

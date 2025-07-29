const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    phone: String,
    dob: Date,
    isVerified: Boolean,
    subscriptionDate: Date
});

module.exports = mongoose.model('User', userSchema);

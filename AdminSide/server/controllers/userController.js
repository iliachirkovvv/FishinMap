const User = require('../models/user.js');

const getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
};

const createUser = async (req, res) => {
    const newUser = new User(req.body);
    const saved = await newUser.save();
    res.status(201).json(saved);
};

module.exports = {
    getAllUsers,
    createUser
};

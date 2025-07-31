const Post = require('../models/post');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts', err });
    }
};


module.exports = {
    getAllPosts
};

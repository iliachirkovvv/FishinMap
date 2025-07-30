const Post = require('../models/post');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts', err });
    }
};

const updatePostStatus = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: 'Error updating post status', err });
    }
};

module.exports = {
    getAllPosts,
    updatePostStatus
};

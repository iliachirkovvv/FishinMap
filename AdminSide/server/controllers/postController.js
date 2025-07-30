const Post = require('../models/post');

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user');
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching posts', err });
    }
};

const approvePost = async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { status: 'approved', updatedAt: new Date() },
            { new: true }
        );

        if (!updatedPost) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error approving post', error });
    }
};

const deletePost = async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        if (!deletedPost) return res.status(404).json({ message: 'Post not found' });

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post', error });
    }
};

module.exports = {
    getAllPosts,
    approvePost,
    deletePost
};

const mongoose = require('mongoose');
const PostMessage = require('../models/postMessage');

module.exports = {
    getPosts: async (req, res) => {
        try {
            const postMessages = await PostMessage.find();
            res.status(200).json(postMessages);
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    },

    createPost: async (req, res) => {
        try {
            const post = req.body;
            const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

            await newPost.save();
            res.status(201).json(newPost);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    },

    updatePost: async (req, res) => {
        const { id: _id } = req.params;
        const post = req.body;

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Invalid Post id');

        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });
        res.status(200).json(updatedPost);
    },

    deletePost: async (req, res) => {
        const { id: _id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Invalid Post id');
        try {
            await PostMessage.findOneAndDelete(_id);
            res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
            res.status(404).json({ message: 'Unable to delete post' });
        }
    },

    likePost: async (req, res) => {
        const { id: _id } = req.params;

        if (!req.userId) return res.status(403).json({ message: 'Unauthenticated' });

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('Invalid Post id');

        try {
            const post = await PostMessage.findById(_id);

            const index = post.likes.findIndex((id) => id === String(req.userId));
            if (index === -1) {
                post.likes.push(req.userId);
            } else {
                post.likes = post.likes.filter((id) => id !== String(req.userId));
            }

            const updatedPost = await PostMessage.findByIdAndUpdate(post._id, post, { new: true });

            res.status(200).json(updatedPost);
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: 'Unable to update post like' });
        }
    },
};

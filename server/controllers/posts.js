const PostMessage = require('../models/postMessage');

module.exports = {
    getPosts: async (req, res) => {
        try {
            const postMessages = await PostMessage.find();
            return res.status(200).json(postMessages);
        } catch (error) {
            return res.status(404).json({ message: error.message });
        }
    },

    createPost: (req, res) => {
        try {
            const post = req.body;
            const newPost = new PostMessage(post);

            newPost.save();
            return res.status(201).json(newPost);
        } catch (error) {
            return res.status(409).json({ message: error.message });
        }
    },
};

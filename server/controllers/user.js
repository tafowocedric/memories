const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {
    signin: async (req, res) => {
        try {
            const { email, password } = req.body;

            let user = await User.findOne({ email });
            if (!user) return res.status(404).json({ message: 'Invalid Credential' });

            const isPasswordCorrect = await bcrypt.compare(password, user.password[0]);
            if (!isPasswordCorrect) return res.status(404).json({ message: 'Invalid Credential' });

            const token = jwt.sign({ email: user.email, id: user._id }, 'test', { expiresIn: '1h' });

            user = { ...user._doc, name: `${user.firstName} ${user.lastName}` };
            res.status(200).json({ ...user, token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    signup: async (req, res) => {
        try {
            const { firstName, lastName, email, password, confirmPassword } = req.body;

            let user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: 'User already exists' });
            if (password !== confirmPassword) return res.status(400).json({ message: 'Password does not match' });

            const hashPassword = await bcrypt.hash(password, 12);

            user = await User.create({ email, password: hashPassword, firstName, lastName });
            const token = jwt.sign({ email, id: user._id }, 'test', { expiresIn: '1h' });

            user = { ...user._doc, name: `${user.firstName} ${user.lastName}` };
            res.status(200).json({ ...user, token });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

const User = require('../models/user');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Not an admin' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: {
                id: user._id,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                role: user.role,
                rank: user.rank
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error });
    }
};

const getUsersWithRank4 = async (req, res) => {
    try {
        const users = await User.find({ rank: 4 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users with rank 4', error });
    }
};

const upgradeToExpert = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role: 'expert' },
            { new: true }
        );
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json({ message: 'User upgraded to expert', user });
    } catch (error) {
        res.status(500).json({ message: 'Error upgrading user', error });
    }
};


module.exports = {
    getAllUsers,
    loginUser,
    getUsersWithRank4,
    upgradeToExpert
};

const User = require('..models/User');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await user.findOne({ _id: req.params.userId })
                .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No User with this id!' });
            }

            res.json(User);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteUser(req, res) {
        try {
            const user = await user.findOneAndRemove({ _id: req.params.userId })

            if (!user) {
                return res.status(404).json({ message: 'No such user exists' });
            }

            const thought = await Thought.findOneAndUpdate(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'User deleted, but no thought found'
                })
            }
            res.json({ message: 'User successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addFriend(req, res) {
        try {
            const friend = await friend.findOneAndUpdate(
                { _id: req.params.friendId },
                { $addToSet: { responses: req.body } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res.status(404).json({ message: 'No friend with this id!' });
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove friend response
    async removeFriend(req, res) {
        try {
            const friend = await friend.findOneAndUpdate(
                { _id: req.params.friendId },
                { $pull: { reactions: { responseId: req.params.responseId } } },
                { runValidators: true, new: true }
            )

            if (!friend) {
                return res.status(404).json({ message: 'No friend with this id!' });
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
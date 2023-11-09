const Thought = require('..models/Thought');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await thought.findOne({ _id: req.params.ThoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No Thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: {thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res
                  .status(404)
                  .json({ message: 'Thought created, but found no user with that ID' });
              }
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No Thought with this id!' });
            }

            res.json(Thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async deleteThought(req, res) {
        try {
            const thought = await thought.findOneAndRemove({ _id: req.params.ThoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'No such Thought exists' });
            }

            const reaction = await reaction.findOneAndUpdate(
                { Reactions: req.params.ReactionId },
                { $pull: { Reactions: req.params.ReactionId } },
                { new: true }
            );

            if (!reaction) {
                return res.status(404).json({
                    message: 'Reaction deleted, but no Reaction found'
                })
            }
            res.json({ message: 'Reaction successfully deleted' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    async addReaction(req, res) {
        try {
            const reaction = await reaction.findOneAndUpdate(
                { _id: req.params.reactionId },
                { $addToSet: { responses: req.body } },
                { runValidators: true, new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with this id!' });
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove reaction response
    async deleteReaction(req, res) {
        try {
            const reaction = await reaction.findOneAndUpdate(
                { _id: req.params.reactionId },
                { $pull: { reactions: { responseId: req.params.responseId } } },
                { runValidators: true, new: true }
            )

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with this id!' });
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
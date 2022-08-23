const { Thought } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate({path: 'reactions', select: '-_v'})
      .select('-__v')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Update a thought
   updateThought(req,res) {
    Thought.findOneAndUpdate(
      {_id: req.params.thoughtId},
      {$set: req.body},
      )
    .then((thought) =>
      !thought
      ? res.status(404).json({ message: 'No thought with this id!' })
      : res.json(thought)
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  },

  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought exists' })
          : res.json({ message: 'thought deleted!' }))
  },

  // create a reaction
  createReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: 'No thought found with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

 // delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { _id: req.params.reactionId } } },
    )
      .then((reaction) =>
        !reaction
          ? res
              .status(404)
              .json({ message: 'No reaction found with that ID' })
          : res.json({message: 'reaction deleted!'})
      )
      .catch((err) => res.status(500).json(err));
  }
};

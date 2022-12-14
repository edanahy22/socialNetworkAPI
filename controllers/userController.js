const { ObjectId } = require('mongoose').Types;
const { Thought, User } = require('../models');

// Aggregate function to get the number of students overall
// const friendCount = async () =>
//   User.aggregate()
//     .count('friendCount')
//     .then((numberOfFriends) => numberOfFriends);

// // Aggregate function for getting the overall grade using $avg
// const grade = async (studentId) =>
//   Student.aggregate([
//     // only include the given student by using $match
//     { $match: { _id: ObjectId(studentId) } },
//     {
//       $unwind: '$assignments',
//     },
//     {
//       $group: {
//         _id: ObjectId(studentId),
//         overallGrade: { $avg: '$assignments.score' },
//       },
//     },
//   ]);

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a new User
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  // Update a user
  updateUser(req,res) {
    User.findOneAndUpdate(
      {_id: req.params.userId},
      {$set: req.body},
      )
    .then((user) =>
      !user
      ? res.status(404).json({ message: 'No user with this id!' })
      : res.json(user)
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
  },

  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No such user exists' })
          : res.json({ message: 'User deleted!' }))
  },

    // create a friend
    createFriend(req, res) {
      console.log('You are adding a friend');
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      )
        .then((friend) =>
          !friend
            ? res
                .status(404)
                .json({ message: 'No friend found with that ID' })
            : res.json(friend)
        )
        .catch((err) => res.status(500).json(err));
    },

   // Delete a reaction
    deleteFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { reaction: { userId: req.params.userId } } },
        { runValidators: true, new: true }
      )
        .then((friend) =>
          !friend
            ? res
                .status(404)
                .json({ message: 'No friend found with that ID' })
            : res.json({message: 'friend deleted'})
        )
        .catch((err) => res.status(500).json(err));
    }
}
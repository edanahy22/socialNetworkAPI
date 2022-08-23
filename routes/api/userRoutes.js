const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  createFriend,
  deleteFriend
} = require('../../controllers/userController.js');

// /api/courses
router.route('/').get(getUsers).post(createUser);

// /api/courses/:courseId
router
  .route('/:userId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/students/:studentId/assignments
router.route('/:userId/friends').post(createFriend);

// /api/students/:studentId/assignments/:assignmentId
router.route('/:userId/friends/:userId').delete(deleteFriend);

module.exports = router;

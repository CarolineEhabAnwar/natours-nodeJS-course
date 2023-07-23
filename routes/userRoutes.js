/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

router.post('/forgetPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.patch('/updatePassword', authController.updatePassword);

router.patch(
  '/updateCurrentUser',
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateCurrentUser
);
router.delete('/deleteCurrentUser', userController.deleteCurrentUser);
router.get(
  '/getCurrentUser',
  userController.getCurrentUser,
  userController.getUser
);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;

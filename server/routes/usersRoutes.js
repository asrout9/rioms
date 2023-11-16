const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const {
  signupValidation,
  loginValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
} = require('../middlewares/userMiddleware');

// Display all users
router.get('/', usersController.getAllUsers);

// Display one user by ID
router.get('/:id', usersController.getUserById);

// Login
router.post('/login', loginValidation, usersController.login);

// Signup
router.post('/signup', signupValidation, usersController.signup);

//Update
router.post('/updatename', nameValidation, usersController.updateName);
router.post(
  '/updatepassword',
  passwordValidation,
  usersController.updatePassword
);

// Delete user by email
router.delete('/:email', emailValidation, usersController.deleteUserByEmail);

module.exports = router;

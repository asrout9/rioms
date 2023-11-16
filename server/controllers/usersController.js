const usersData = require('../users');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

//Display all users
const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (users.isEmpty) {
    return res.status(400).json({ errors: [{ msg: 'No user found' }] });
  }
  res.status(200).json({ users });
};
// Signup
const signup = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'User already registered' }] });
    }
    user = new User({ name, email, password });
    user.password = bcrypt.hashSync(password, 10);
    await user.save();
    res
      .status(200)
      .json({ messages: [{ msg: 'User registered successfully' }] });
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

//Get a user by its ID
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });
    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ errors: [{ msg: 'User not found' }] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// Login
const login = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty) {
    return res.status(400).json({ errors: result.array() });
  }
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({ user });
    } else {
      res.status(400).json({ message: [{ msg: 'Invalid credentials' }] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

// Delete user by email
const deleteUserByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    let user = await User.findOne({ email });
    if (user) {
      await User.deleteOne({ email });
      return res
        .status(200)
        .json({ message: [{ msg: 'User deleted successfully' }] });
    } else {
      res.status(400).json({ message: [{ msg: 'User does not exists' }] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

//Update name
const updateName = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  try {
    const { name, email } = req.body;
    let user = await User.findOneAndUpdate({ email }, { name });
    if (user) {
      return res
        .status(200)
        .json({ message: [{ msg: 'User name updated successfully' }] });
    } else {
      res.status(400).json({ message: [{ msg: 'User does not exists' }] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

//Update password
const updatePassword = async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }
  try {
    const { password, email } = req.body;
    const cryptPassword = bcrypt.hashSync(password, 10);
    let user = await User.findOneAndUpdate(
      { email },
      { password: cryptPassword }
    );
    if (user) {
      return res
        .status(200)
        .json({ message: [{ msg: 'Password updated successfully' }] });
    } else {
      res.status(400).json({ message: [{ msg: 'User does not exists' }] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  login,
  signup,
  deleteUserByEmail,
  updateName,
  updatePassword,
};

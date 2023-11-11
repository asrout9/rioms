const usersData = require('../users');
const bcrypt = require('bcryptjs');

//Display all users
const getAllUsers = (req, res) => {
  const hashedUsers = usersData.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  }));

  res.json(hashedUsers);
};

//Get a user by its ID
const getUserById = (req, res) => {
  const { id } = req.params;
  const user = usersData.find((user) => user.id === parseInt(id));
  if (user) {
    const hashedUser = { ...user, password: bcrypt.hashSync(user.password) };
    res.json(hashedUser);
  } else {
    res.status(404).json('User not found');
  }
};

// Login
const login = (req, res) => {
    const { email, password } = req.body;
    const user = usersData.find(user => user.email === email);
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  
  // Signup
  const signup = (req, res) => {
    const { name, email, password } = req.body;
    const id = usersData.length + 1;
    const newUser = { id, name, email, password };
    usersData.push(newUser);
    res.status(201).json({ message: 'Signup successful' });
  };
  
  // Delete user by email
  const deleteUserByEmail = (req, res) => {
    const { email } = req.params;
    const index = usersData.findIndex(user => user.email === email);
    if (index !== -1) {
      usersData.splice(index, 1);
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  };
  
  module.exports = {
    getAllUsers,
    getUserById,
    login,
    signup,
    deleteUserByEmail
  };

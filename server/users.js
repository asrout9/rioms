const bcrypt = require('bcryptjs');

const usersData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: bcrypt.hashSync('password123', 10),
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: bcrypt.hashSync('secret456', 10),
  },
  {
    id: 3,
    name: 'Alice Johnson',
    email: 'alice@example.com',
    password: bcrypt.hashSync('qwerty789', 10),
  },
  {
    id: 4,
    name: 'Bob Williams',
    email: 'bob@example.com',
    password: bcrypt.hashSync('pass1234', 10),
  },
  {
    id: 5,
    name: 'Sarah Davis',
    email: 'sarah@example.com',
    password: bcrypt.hashSync('password567', 10),
  },
];

module.exports = usersData;

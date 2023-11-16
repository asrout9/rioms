const { check } = require('express-validator');

const signupValidation = [
  check('name', 'Use name is required').not().isEmpty(),
  check('email', 'A vilid email Id required').isEmail(),
  check('password', 'Password should be minimum 6 character long').isLength({
    min: 6,
  }),
];

const loginValidation = [
  check('email', 'A vilid email Id required').isEmail(),
  check('password', 'Password should be minimum 6 character long').isLength({
    min: 6,
  }),
];

const emailValidation = [check('email', 'A vilid email Id required').isEmail()];

const nameValidation = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'A vilid email Id required').isEmail(),
];

const passwordValidation = [
  check('password', 'Password required').not().isEmpty(),
  check('email', 'A vilid email Id required').isEmail(),
];

module.exports = {
  signupValidation,
  loginValidation,
  emailValidation,
  nameValidation,
  passwordValidation,
};

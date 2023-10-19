const User = require('../models/user');
const Token = require('../models/token');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const AdminPassword = process.env.ADMIN_PASSWORD;

// TODO IMPLEMENT UNIQUE USERNAME AND EMAIL VALIDATION
// UsersSchema.path('username').validate(async function (username) {
//     const user = await this.constructor.findOne({ username });
//     return !user;
//   }, 'Username already exists');

//   UsersSchema.path('email').validate(async function (email) {
//     const user = await this.constructor.findOne({ email });
//     return !user;
//   }, 'Email already exists');

exports.signup = asyncHandler(async (req, res, next) => {
  body('username', 'Username must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape();
  body('password', 'Password must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape();
  body('email', 'Email must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape();

  try {
    const user = await new User({
      username: req.body.username,
      password:
        req.body.password.length > 0
          ? bcrypt.hashSync(req.body.password, 10)
          : req.body.password,
      email: req.body.email,
    }).save();

    let token = await new Token({
      userId: user._id,
      token: crypto.randomBytes(32).toString('hex'),
    }).save();
    res.json({ message: 'User created' });
  } catch (err) {
    const user = user.findByIdAndDelete;
    return res.status(400).json({ error: err });
  }
});

exports.get_login_data = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    res.json({ username: user.username, admin: user.admin });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

exports.delete = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (req.user.admin === true || req.user._id === user._id) {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } else {
    res.json({ error: 'You are not authorized to delete this user' });
  }
});

exports.signin = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });

    var passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!user || !passwordIsValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      config.secret,
      { expiresIn: '1h' }
    );

    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });

    // Send the token in the response
    res.json({ token });
  } catch (err) {
    res.json({ error: err });
  }
});

exports.get_user_admin_status = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).exec();
    res.json({ admin: user.admin });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

exports.change_user_admin_status = asyncHandler(async (req, res, next) => {
  if (req.body.adminPassword === AdminPassword)
    try {
      const user = await User.findById(req.userId).exec();
      User.findByIdAndUpdate(user._id, { admin: !user.admin }).exec();
      res.json({ message: 'User admin status changed', valid: true });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  else {
    res.status(401).json({ message: 'Wrong admin password' });
  }
});

exports.logout = asyncHandler(async (req, res, next) => {
  res.clearCookie('token');
  res.json({ message: 'User signed out' });
});

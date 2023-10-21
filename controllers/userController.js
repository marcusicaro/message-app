const User = require('../models/user');
const Token = require('../models/token');
const sendEmailToUser = require('../utils/sendEmail');
const crypto = require('crypto');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const AdminPassword = process.env.ADMIN_PASSWORD;

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
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send('User with given email already exist!');
    user = await new User({
      username: req.body.username,
      password:
        req.body.password.length > 0
          ? bcrypt.hashSync(req.body.password, 10)
          : req.body.password,
      email: req.body.email,
    }).save();

    let tokenId = crypto.randomBytes(32).toString('hex');

    let token = await new Token({
      userId: user._id,
      token: tokenId,
    }).save();

    sendEmailToUser(req.body.email, tokenId, user._id);

    res.send({ message: 'User created' });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

exports.signin = asyncHandler(async (req, res, next) => {
  try {
    res.json({ message: 'User signed in' });
  } catch (err) {
    res.json({ error: err });
  }
});

exports.signout = asyncHandler(async (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({ message: 'User signed out' });
  });
});

exports.forgot_password = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    let tokenId = crypto.randomBytes(32).toString('hex');

    let token = await new Token({
      userId: user._id,
      token: tokenId,
    }).save();

    sendEmailToUser(req.body.email, tokenId, user._id);

    res.send('Email sent');
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

exports.change_password = asyncHandler(async (req, res, next) => {
  try {
    await User.findByIdAndUpdate(req.param.id, {
      password: bcrypt.hashSync(req.body.password, 10),
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

// some interesting functionalities that in this project don't make sense
// exports.get_user_admin_status = asyncHandler(async (req, res, next) => {
//   try {
//     const user = await User.findById(req.userId).exec();
//     res.json({ admin: user.admin });
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// });

// exports.change_user_admin_status = asyncHandler(async (req, res, next) => {
//   if (req.body.adminPassword === AdminPassword)
//     try {
//       const user = await User.findById(req.userId).exec();
//       User.findByIdAndUpdate(user._id, { admin: !user.admin }).exec();
//       res.json({ message: 'User admin status changed', valid: true });
//     } catch (err) {
//       return res.status(400).json({ error: err });
//     }
//   else {
//     res.status(401).json({ message: 'Wrong admin password' });
//   }
// });

// exports.get_login_data = asyncHandler(async (req, res, next) => {
//   try {
//     const user = await User.findById(req.body.userId).exec();
//     res.json({ username: user.username, admin: user.admin });
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// });

// exports.delete = asyncHandler(async (req, res, next) => {
//   const user = await User.findById(req.params.id);
//   if (req.user.admin === true || req.user._id === user._id) {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: 'User deleted' });
//   } else {
//     res.json({ error: 'You are not authorized to delete this user' });
//   }
// });

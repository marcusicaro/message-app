const User = require('../models/user');
const sendEmailToUser = require('../utils/sendEmail');
const crypto = require('crypto');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
require('dotenv').config();

exports.signup = asyncHandler(async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ error: 'Email already registered' });

  let tokenId = crypto.randomBytes(32).toString('hex');

  user = await new User({
    username: req.body.username,
    password:
      req.body.password.length > 0
        ? bcrypt.hashSync(req.body.password, 10)
        : null,
    email: req.body.email,
    token: tokenId,
  }).save();
  sendEmailToUser(req.body.email, tokenId, user._id);
  res.send({ message: 'User created' });
});

exports.signin = asyncHandler(async (req, res, next) => {
  return res.json({ message: 'User signed in', token: "1" });
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
  const user = await User.findOne({ email: req.body.email });
  let tokenId = crypto.randomBytes(32).toString('hex');

  await Token.deleteMany({ userId: user._id });
  await new Token({
    userId: user._id,
    token: tokenId,
  }).save();

  sendEmailToUser(req.body.email, tokenId, user._id, 'recovery');

  res.json({ message: 'Email sent' });
});

exports.change_password = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    await User.findByIdAndUpdate(req.params.id, {
      password: bcrypt.hashSync(req.body.password, 10),
    });
    return res.json({ message: 'Password changed' });
  }
  if (req.body.password.length < 4)
    return res
      .status(400)
      .json({ error: 'Password must be at least 4 characters long' });
  let token = await User.findOne({
    token: req.params.token,
    userId: req.params.id,
  });
  if (!token) return res.status(400).json({ error: 'Token expired' });
  await User.findByIdAndUpdate(req.params.id, {
    password: bcrypt.hashSync(req.body.password, 10),
  });
  return res.json({ message: 'Password changed' });
});

exports.friends = asyncHandler(async (req, res, next) => {
  const friend = User.findById(req.body.id);
  const user = User.findById(req.user._id);

  user.friends.push(friend);
  await user.save();
  res.status(204).json({ message: 'User created' });
});

exports.upload_profile_picture = asyncHandler(async (req, res, next) => {
  const user = User.findById(req.user._id);
  user.profilePicture = req.file.path;
  await user.save();
  res.status(204).json({ message: 'Photo uploaded' });
});

exports.verify = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ _id: req.params.id });
  if (!user) return res.status(400).json({ message: 'Invalid link' });

  const token = await User.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!token) return res.status(400).json({ message: 'Invalid link' });

  await User.findOneAndUpdate({ _id: user._id }, { validated: true });

  res.json({ message: 'email verified sucessfully' });
});

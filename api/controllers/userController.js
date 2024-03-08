const User = require('../models/user');
const Group = require('../models/group');
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

  let group = await Group.findById('65e31770f4665bbea48969d4');
  group.members.push(user._id);
  await group.save();

  try {
    await sendEmailToUser(req.body.email, tokenId, req.body.username);
    return res.json({
      message: 'User created and validation email has been sent',
      email: true,
    });
  } catch (error) {
    console.log('error: ', error);
    User.findOneAndDelete({ email: req.body.email });
    user = await new User({
      username: req.body.username,
      password:
        req.body.password.length > 0
          ? bcrypt.hashSync(req.body.password, 10)
          : null,
      email: req.body.email,
      token: tokenId,
      validated: true,
    }).save();

    return res.json({
      message: 'User created, but email not sent',
      email: false,
    });
  }
});

exports.signin = asyncHandler(async (req, res, next) => {
  return res.json({
    username: req.user.username,
    profilePicture: req.user.profilePicture,
  });
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
  let tokenId = crypto.randomBytes(32).toString('hex');
  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    { token: tokenId }
  );

  if (!user) return res.status(400).json({ error: 'Email not found' });

  sendEmailToUser(req.body.email, tokenId, user._id, 'recovery');

  res.json({ message: 'Email sent' });
});

exports.change_password = asyncHandler(async (req, res, next) => {
  if (req.isAuthenticated()) {
    await User.findOneAndUpdate(
      { token: req.body.token },
      {
        password: bcrypt.hashSync(req.body.password, 10),
      }
    );
    return res.json({ message: 'Password changed' });
  }
  if (req.body.password.length < 4)
    return res
      .status(400)
      .json({ error: 'Password must be at least 4 characters long' });

  await User.findOneAndUpdate(
    { token: req.body.token },
    {
      password: bcrypt.hashSync(req.body.password, 10),
    }
  );
  return res.json({ message: 'Password changed' });
});

exports.friends = asyncHandler(async (req, res, next) => {
  const friend = User.findById(req.body.id);
  const user = User.findById(req.user._id);

  user.friends.push(friend);
  await user.save();
  res.status(200).json({ message: 'User created' });
});

exports.upload_profile_picture = asyncHandler(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    { profilePicture: req.file.path },
    { new: true }
  );
  user.profilePicture = req.file.path;
  res.status(200).json({ profilePicture: req.file.path });
});

exports.verify = asyncHandler(async (req, res, next) => {
  let username = req.params.username;
  const user = await User.findOne({
    username,
    token: req.params.token,
  });

  if (!user) return res.status(400).json({ message: 'Invalid link' });

  await User.findOneAndUpdate({ username }, { validated: true });

  res.json({ message: 'email verified sucessfully' });
});

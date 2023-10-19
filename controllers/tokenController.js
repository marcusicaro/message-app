// const sendEmail = require('../utils/email');
const Token = require('../models/token');
const { User } = require('../models/user');
const asyncHandler = require('express-async-handler');
const crypto = import('crypto');
const express = require('express');
const router = express.Router();

exports.verify = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send('Invalid link');

    const token = await Token.findOne({
      userId: user._id,
      token: req.body.token,
    });
    if (!token) return res.status(400).send('Invalid link');

    await User.updateOne({ _id: user._id, verified: true });
    await Token.findByIdAndRemove(token._id);

    res.send('email verified sucessfully');
  } catch (error) {
    res.status(400).send('An error occured');
  }
});

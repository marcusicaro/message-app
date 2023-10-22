// const sendEmail = require('../utils/email');
const Token = require('../models/token');
const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const crypto = import('crypto');
const express = require('express');
const router = express.Router();

exports.verify = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (!user) return res.status(400).json({ message: 'Invalid link' });

    const token = await Token.findOne({
      userId: user._id,
      token: req.params.token,
    });
    if (!token) return res.status(400).json({ message: 'Invalid link' });

    await User.findOneAndUpdate({ _id: user._id }, { validated: true });
    await Token.findByIdAndRemove(token._id);

    res.json({ message: 'email verified sucessfully' });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

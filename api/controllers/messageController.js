const Message = require('../models/message');
// const Post = require('../models/post');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.get = asyncHandler(async (req, res, next) => {
  const recipients = req.body.recipients;
  const messages = await Message.find({
    sender: req.body._id,
    group: req.body.group,
    recipients: recipients,
  }).sort({ timestamp: 1 });
  return res.json({ messages: messages });
});

exports.create = asyncHandler(async (req, res, next) => {
  body('text', 'Text must not be empty.').trim().notEmpty().escape();
  body('recipient', 'Recipient must not be empty.').trim().notEmpty().escape();
  const message = new Message({
    timestamp: new Date(),
    sender: await User.findById(req.user._id),
    text: req.body.text,
    isGroupMessage: req.body.isGroupMessage,
    recipients: req.body.recipients,
  });
  await message.save();
  res.json({ message: 'Message created' });
});

exports.delete = asyncHandler(async (req, res, next) => {
  const message = await Message.findById(req.params.messageId);
  const user = await User.findById(req.user._id);
  if (user.admin === true || req.user._id === message.user._id) {
    await Message.findByIdAndDelete(req.params.messageId);
    res.json({ message: 'Message deleted' });
  } else {
    res.json({ error: 'You are not authorized to delete this message' });
  }
});

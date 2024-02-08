const Message = require('../models/message');
const Group = require('../models/group');
// const Post = require('../models/post');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.get = asyncHandler(async (req, res, next) => {
  const recipients = req.body.recipients;
  let messages;

  if(recipients.user) {
  messages = await Message.find({
      sender: req.params.senderId,
      "recipients.user": { $in:  recipients.user},
    }).sort({ timestamp: 1 }).populate('sender');
  } else {
    messages = await Message.find({
      sender: req.params.senderId,
      "recipients.group": { $in:  recipients.group},
    }).sort({ timestamp: 1 }).populate('sender');
  }


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

  if(req.body.isGroupMessage) {
    const group = await Group.findByIdAndUpdate(
      req.body.recipients.group,
      {lastMessage: message},
      { new: true }
    );
  }

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

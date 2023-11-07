const Message = require('../models/message');
// const Post = require('../models/post');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.get = asyncHandler(async (req, res, next) => {
  if (!req.user) {
    res.sendStatus(401);
    return;
  } else {
    const receiverType = req.params.receiverType;
    const receiverId = req.params.receiverId;
    const senderId = req.params.senderId;
    if (receiverType === 'user') {
      const messages = await Message.find({
        sender: senderId,
        recipients: { user: receiverId },
      })
        .sort({ timestamp: 1 })
        .populate('sender')
        .populate('recipients.user');
      return res.json({ messages: messages });
    } else if (receiverType === 'group') {
      const messages = await Message.find({
        sender: senderId,
        recipients: { group: receiverId },
      })
        .sort({ timestamp: 1 })
        .populate('sender')
        .populate('recipients.group');
      return res.json({ messages: messages });
    }
  }
});

exports.create = asyncHandler(async (req, res, next) => {
  body('text', 'Text must not be empty.').trim().isLength({ min: 1 }).escape();
  const message = new Message({
    timestamp: new Date(),
    sender: await User.findById(req.user._id),
    text: req.body.text,
    recipients: [{ user: req.user }],
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

// exports.get_all_comments_on_a_specific_post = asyncHandler(
//   async (req, res, next) => {
//     const comments = await Comment.find({ post: req.params.postId })
//       .sort({ timestamp: 1 })
//       .populate('post')
//       .populate('user')
//       .exec();
//     res.json({ comments: comments });
//   }
// );

// exports.delete = asyncHandler(async (req, res, next) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId).exec();
//     const user = await User.findById(req.userId).exec();
//     if (user.admin === true || req.userId === comment.user._id) {
//       await Comment.findByIdAndDelete(req.params.commentId);
//       res.json({ message: 'Comment deleted' });
//     } else {
//       res.json({ error: 'You are not authorized to delete this comment' });
//     }
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// });
// exports.edit = asyncHandler(async (req, res, next) => {
//   try {
//     const comment = await Comment.findById(req.params.commentId).exec();
//     console.log(comment);
//     const user = await User.findById(req.userId).exec();
//     if (user.admin === true || req.userId === comment.user._id) {
//       const editedComment = new Post({
//         _id: comment.id,
//         timestamp: comment.timestamp,
//         post: comment.post,
//         title: req.body.title,
//         content: req.body.content,
//         user: comment.user,
//       });
//       await Comment.findByIdAndUpdate(req.params.commentId, editedComment, {});
//       res.json({ message: 'Comment edited' });
//     } else {
//       res.json({ error: 'You are not authorized to edit this comment' });
//     }
//   } catch (err) {
//     return res.status(400).json({ error: err });
//   }
// });

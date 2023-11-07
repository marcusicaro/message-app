const Group = require('../models/group');
// const Post = require('../models/post');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.create = asyncHandler(async (req, res, next) => {
  if (req.user) {
    body('title', 'Title must not be empty.')
      .trim()
      .isLength({ min: 1 })
      .escape();
    const group = new Group({
      title: req.body.title,
      members: [req.user],
      admins: [req.user],
    });
    await group.save();
    return res.json({ message: 'Group created' });
  }
});

exports.add_member = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const group = await Group.findById(req.params.groupId);
    const user = await User.findOne({ username: req.body.username });

    if (req.user.admin === true || group.admins.includes(req.user)) {
      group.members.push(user);
      await group.save();
      return res.json({ message: 'Member added' });
    } else {
      return res
        .status(401)
        .json({ error: 'You are not authorized to add members' });
    }
  } else {
    return res
      .status(401)
      .json({ error: 'You are not authorized to add members' });
  }
});

exports.remove_member = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const group = await Group.findById(req.params.groupId);
    const user = await User.findOne({ username: req.params.username });

    if (req.user.admin === true || group.admins.includes(req.user)) {
      group.members.pull(user);
      await group.save();
      return res.json({ message: 'Member removed' });
    }
    return res
      .status(401)
      .json({ error: 'You are not authorized to remove members' });
  }
});

exports.delete_group = asyncHandler(async (req, res, next) => {
  if (req.user) {
    const group = await Group.findById(req.params.groupId);
    if (req.user.admin === true || group.admins.includes(req.user)) {
      await Group.findByIdAndDelete(req.params.groupId);
      return res.json({ message: 'Group deleted' });
    } else {
      return res
        .status(401)
        .json({ error: 'You are not authorized to delete groups' });
    }
  }
});

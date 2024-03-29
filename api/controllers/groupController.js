const Group = require('../models/group');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const Message = require('../models/message');

// get all groups that a certain member is in
exports.get_groups = asyncHandler(async (req, res, next) => {
  const groups = await Group.find({ members: req.user._id }).populate({
    path: 'lastMessage',
    populate: {
      path: 'sender',
    },
  });
  return res.json(groups);
});

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

exports.get_members = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId)
    .populate('members', 'username profilePicture')
    .populate('admins', 'username profilePicture');

  const isCurrentUserAdmin = group.admins.some(
    (admin) => admin._id.toString() === req.user._id
  );

  return res.json({
    members: group.members,
    isCurrentUserAdmin: isCurrentUserAdmin,
    admins: group.admins,
  });
});

exports.add_member = asyncHandler(async (req, res, next) => {
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
});

exports.change_admin = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  const user = await User.findOne({ _id: req.body.userId });

  if (req.user.admin === true || group.admins.includes(req.user)) {
    group.admins.push(user);
    await group.save();
    return res.json({ message: 'Admin added' });
  } else {
    return res
      .status(401)
      .json({ error: 'You are not authorized to add admins' });
  }
});

exports.delete_group = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  if (req.user.admin === true || group.admins.includes(req.user)) {
    await Group.findByIdAndDelete(req.params.groupId);
    return res.json({ message: 'Group deleted' });
  } else {
    return res
      .status(401)
      .json({ error: 'You are not authorized to delete this group' });
  }
});

exports.remove_member = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  const user = await User.findOne({ username: req.body.username });

  if (req.user.admin === true || group.admins.includes(req.user)) {
    group.members.pull(user);
    await group.save();
    return res.json({ message: 'Member removed' });
  }
  return res
    .status(401)
    .json({ error: 'You are not authorized to remove members' });
});

exports.change_group_admins = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  const user = await User.findOne({ username: req.body._id });
  if (req.user.admin === true || group.admins.includes(req.user)) {
    if (group.admins.includes(user)) {
      group.admins.push(user);
      await group.save();
      return res.json({ message: 'Admin adeed' });
    }
    group.admins.pull(user);
    await group.save();
    return res.json({ message: 'Admin adeed' });
  }
  return res
    .status(401)
    .json({ error: 'You are not authorized to remove members' });
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

exports.get_last_message_on_group = asyncHandler(async (req, res, next) => {
  const group = await Group.findById(req.params.groupId);
  const lastMessage = await Message.find({
    recipients: {
      $elemMatch: {
        group: group._id,
      },
    },
  })
    .sort({ timestamp: -1 })
    .limit(1);
  return res.json(lastMessage);
});

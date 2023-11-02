const Group = require('../models/group');
// const Post = require('../models/post');
const User = require('../models/user');
const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');

exports.create = asyncHandler(async (req, res, next) => {
  body('title', 'Title must not be empty.')
    .trim()
    .isLength({ min: 1 })
    .escape();
  try {
    const group = new Group({
      title: req.body.title,
      members: [req.user],
      admins: [req.user],
    });
    await group.save();
    res.json({ message: 'Group created' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'Failed to create group' });
  }
});

exports.add_member = asyncHandler(async (req, res, next) => {
  try {
    if (req.user) {
      const group = await Group.findById(req.params.groupId);
      const user = await User.findOne({ username: req.body.username });

      if (req.user.admin === true || group.admins.includes(req.user)) {
        group.members.push(user);
        await group.save();
        res.json({ message: 'Member added' });
      } else {
        res.json({ message: 'You are not authorized to add members' });
      }
    } else {
      res.json({ message: 'You are not authorized to add members' });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: 'Failed to add member' });
  }
});

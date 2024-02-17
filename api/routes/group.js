var group_controller = require('../controllers/groupController');
var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('session'), group_controller.get_groups);
router.get(
  '/:groupId/members',
  passport.authenticate('session'),
  group_controller.get_members
);
router.post(
  '/create',
  passport.authenticate('session'),
  group_controller.create
);
router.delete(
  '/:groupId',
  passport.authenticate('session'),
  group_controller.delete_group
);
router.put(
  '/:groupId/add-member',
  passport.authenticate('session'),
  group_controller.add_member
);
router.put(
  '/:groupId/change-admin',
  passport.authenticate('session'),
  group_controller.change_admin
);
router.delete(
  '/:groupId',
  passport.authenticate('session'),
  group_controller.remove_member
);

module.exports = router;

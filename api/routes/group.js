var group_controller = require('../controllers/groupController');
var express = require('express');
var router = express.Router();
const passport = require('passport');

router.get('/', passport.authenticate('session'),group_controller.get_groups);
router.post('/create', passport.authenticate('session'), group_controller.create);
router.put('/:groupId/add_member', passport.authenticate('session'), group_controller.add_member);
router.put('/:groupId/change_admin', passport.authenticate('session'), group_controller.change_admin);
router.delete('/:groupId', passport.authenticate('session'), group_controller.remove_member);
router.get('/:groupId/lastMessage', passport.authenticate('session'), group_controller.get_last_message_on_group);

module.exports = router;

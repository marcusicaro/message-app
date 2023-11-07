var group_controller = require('../controllers/groupController');
var express = require('express');
var router = express.Router();
const loggedIn = require('../utils/checkLoggedIn');

router.post('/create', loggedIn, group_controller.create);
router.put('/:groupId/add_member', loggedIn, group_controller.add_member);
router.delete('/:groupId/:memberId', loggedIn, group_controller.remove_member);

module.exports = router;

var group_controller = require('../controllers/groupController');
var express = require('express');
var router = express.Router();

router.post('/create', group_controller.create);
router.put('/:groupId/add_member', group_controller.add_member);

module.exports = router;

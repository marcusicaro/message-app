var express = require('express');
var router = express.Router();
const message_controller = require('../controllers/messageController');
const passport = require('passport');

router.post('/', message_controller.create);
router.get('/:receiverType/:senderId/:receiverId', message_controller.get);
router.delete('/:messageId', message_controller.delete);

module.exports = router;

var express = require('express');
var router = express.Router();
const message_controller = require('../controllers/messageController');
const passport = require('passport');
const checkAuthenticated = require('../utils/checkAuthenticated');

router.post('/', passport.authenticate('session'), message_controller.create);
router.get('/:receiverType/:senderId', message_controller.get);
router.delete('/:messageId', message_controller.delete);

module.exports = router;

var express = require('express');
var router = express.Router();
const message_controller = require('../controllers/messageController');
const passport = require('passport');

router.get('/', message_controller.get_all);

module.exports = router;

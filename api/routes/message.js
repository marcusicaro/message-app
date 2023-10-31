var express = require('express');
var router = express.Router();
const message_controller = require('../controllers/messageController');
const passport = require('passport');

router.post('/', message_controller.create);

module.exports = router;

var user = require('../controllers/userController');
var express = require('express');
var router = express.Router();

router.post('/', user.signup);

module.exports = router;

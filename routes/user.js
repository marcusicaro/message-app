var user = require('../controllers/userController');
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', user.signup);

module.exports = router;

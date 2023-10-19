var token = require('../controllers/tokenController');
var express = require('express');
var router = express.Router();

router.post('/', token.verify);

module.exports = router;

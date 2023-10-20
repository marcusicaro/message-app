var token = require('../controllers/tokenController');
var express = require('express');
var router = express.Router();

router.get('/:id/:token', token.verify);

module.exports = router;

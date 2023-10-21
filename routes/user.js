var user = require('../controllers/userController');
var express = require('express');
var router = express.Router();
const passport = require('passport');

router.post('/', user.signup);
router.post('/signin', passport.authenticate('local'), user.signin);
router.post('/signout', user.signout);

module.exports = router;

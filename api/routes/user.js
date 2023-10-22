var user = require('../controllers/userController');
var express = require('express');
var router = express.Router();
const passport = require('passport');
const checkAuthenticated = require('../utils/checkAuthenticated');

router.post('/signup', user.signup);
router.post('/signin', passport.authenticate('local'), user.signin);
router.post('/signout', checkAuthenticated, user.signout);
router.post('/forgot-password', user.forgot_password);
router.post('/change-password/:id/:token', user.change_password);

module.exports = router;

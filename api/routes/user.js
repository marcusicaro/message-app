var user = require('../controllers/userController');
var express = require('express');
var router = express.Router();
const passport = require('passport');
const { upload } = require('../middlewares/multer');


router.post('/signup', user.signup);
router.post('/signin', passport.authenticate('local'), user.signin);
router.post('/signout', passport.authenticate('session'), user.signout);
router.post('/forgot-password', user.forgot_password);
router.post('/change-password/:id/:token', user.change_password);
router.post('/photos/upload',passport.authenticate('session'), upload, user.upload_profile_picture);
router.get('/:id/:token', user.verify);

module.exports = router;

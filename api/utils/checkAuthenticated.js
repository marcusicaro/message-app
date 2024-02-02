checkAuthenticated = (req, res, next) => {
  if (req.cookie.sessionID === req.sessionID) {
    return next();
  }
  res.redirect('/user/signin');
};

module.exports = checkAuthenticated;

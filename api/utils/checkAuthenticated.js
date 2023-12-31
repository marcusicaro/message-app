checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/user/signin');
};

module.exports = checkAuthenticated;

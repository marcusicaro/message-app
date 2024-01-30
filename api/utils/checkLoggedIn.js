function loggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.json({error: 'You must be logged in to access this page'});
  }
}

module.exports = loggedIn;

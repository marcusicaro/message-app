const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const messageRouter = require('./routes/message');
const userRouter = require('./routes/user');
const { body } = require('express-validator');
const Schema = mongoose.Schema;
require('dotenv').config();
const MongoDBKey = process.env.MONGODB_KEY;
const SessionSecret = process.env.SESSION_SECRET.split(' ');
require('./middlewares/mongoConfig');

app.use(
  session({
    secret: SessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(passport.session());

// determines what to be stored locally, if I include images, should be here also to reduce queries on the db
passport.serializeUser(function (user, done) {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      const match = await bcrypt.compare(password, user.password);

      if (!user) {
        return done(null, false, { message: 'Incorrect username' });
      }
      if (!match) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/message', messageRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('there was an error');
});

app.listen(3002, () => console.log('app listening on port 3002!'));

module.exports = app;

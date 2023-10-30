const express = require('express');
const User = require('./models/user');
const app = express();
const path = require('path');
const createError = require('http-errors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const messageRouter = require('./routes/message');
const userRouter = require('./routes/user');
const tokenRouter = require('./routes/token');
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
    cookie: { secure: false, maxAge: 60000, httpOnly: true },
  })
);

app.use(passport.authenticate('session'));

// determines what to be stored locally, if I include images, should be here also to reduce queries on the db
passport.serializeUser(function (user, done) {
  // console.log('id: ', user._id);
  done(null, user._id);
});

passport.deserializeUser(function (id, cb) {
  // console.log('id is: ', id);
  process.nextTick(function () {
    return cb(null, User.findById(id));
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
app.use('/token', tokenRouter);

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
  res.json(err.message);
});

app.listen(3002, () => console.log('app listening on port 3002!'));

module.exports = app;

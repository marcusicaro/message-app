const express = require('express');
const User = require('./models/user');
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // replace with your client's origin
    methods: ['GET', 'POST', 'DELETE'],
    credentials: true,
  },
});
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
const groupRouter = require('./routes/group');
var cors = require('cors');
require('dotenv').config();
const SessionSecret = process.env.SESSION_SECRET.split(' ');
require('./middlewares/mongoConfig');

app.use(
  session({
    secret: SessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 3600000,
      httpOnly: false,
      sameSite: 'lax',
    },
  })
);

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://localhost:3000',
      'http://localhost:3000/chat-screen',
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    optionsSuccessStatus: 200,
  })
);
app.use(passport.authenticate('session'));

// determines what to be stored locally, if I include images, should be here also to reduce queries on the db
passport.serializeUser(function (user, done) {
  // console.log('id: ', user._id);
  done(null, user);
});

passport.deserializeUser(function (user, cb) {
  // console.log('id is: ', id);
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

app.use(
  '/message',
  (req, res, next) => {
    req.io = io;
    next();
  },
  messageRouter
);
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log('err: ', err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err.message });
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3002, () => console.log('app listening on port 3002!'));

module.exports = app;

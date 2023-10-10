const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
require('dotenv').config();
const MongoDBKey = process.env.MONGODB_KEY;
const SessionSecret = process.env.SESSION_SECRET.split(' ');

const mongoDb = `mongodb+srv://admin:${MongoDBKey}@cluster0.lnrds0m.mongodb.net/user_authentication?retryWrites=true&w=majority`;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

app.use(
  session({
    secret: SessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

passport.serializeUser(function (user, done) {
  done(null, { id: user.id, username: user.username });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

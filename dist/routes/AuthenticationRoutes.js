'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var User = require('../models/UserModel');
var bcrypt = require('bcrypt-nodejs');
var passport = require('passport');

require('../services/passport.js');

var signinStrategy = passport.authenticate('signinStrategy', { session: false });

// Creates token for the user
function tokenForUser(user) {
  var timestamp = new Date().getTime();
  return jwt.encode({ userId: user._id, iat: timestamp }, process.env.SECRET);
}

router.post('/signin', signinStrategy, function (req, res) {
  res.json({ token: tokenForUser(req.user), userId: req.user._id });
});
router.post('/signup', function (req, res, next) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  // No username or password supplied

  if (!username || !password) {
    return res.status(422).json({ error: 'You must provide a username and password!' });
  }

  // Look for a user with the current username
  User.findOne({ username: username }).exec().then(function (existingUser) {
    if (existingUser) {
      return res.status(422).json({ error: 'Username has already been taken' });
    }

    // If the username doesnt exist yet, create the user and bcrypt the password
    bcrypt.genSalt(10, function (salt) {
      bcrypt.hash(password, salt, null, function (err, hashedPassword) {
        if (err) {
          return next(err);
        }

        // Create new user with supplied username and hashed password
        var newUser = new User({ username: username, password: hashedPassword });

        // Save and return user
        newUser.save().then(function (user) {
          return res.json({ token: tokenForUser(user), userId: user._id });
        });
      });
    });
  }).catch(function (err) {
    next(err);
  });
});

module.exports = router;
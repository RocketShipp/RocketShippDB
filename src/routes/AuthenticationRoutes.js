const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');

require('../services/passport.js');

const signinStrategy = passport.authenticate('signinStrategy', { session: false });

// Creates token for the user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ userId: user._id, iat: timestamp}, process.env.SECRET);
}

router.post('/api/signin', signinStrategy, function (req, res) {
  res.json({ token: tokenForUser(req.user)});
});

router.post('/api/signup', function (req, res, next) {
  const { username, password } = req.body;

  // No username or password supplied
  if ( !username || !password) {
    return res.status(422).json({ error: 'You must provide a username and password!'});
  }

  // Look for a user with the current username
  User.findOne({ username }).exec()
    .then((existingUser) => {
      if (existingUser) {
        return res.status(422).json({ error: 'Username has already been taken'});
      }

      // If the username doesnt exist yet, create the user and bcrypt the password
      bcrypt.genSalt(10, function (salt) {
        bcrypt.hash(password, salt, null, function (err, hashedPassword) {
          if (err) {
            return next(err);
          }

          // Create new user with supplied username and hashed password
          const newUser = new User({ username, password: hashedPassword});

          // Save and return user
          newUser.save().then(user => res.json({ token: tokenForUser(user)}));
        });
      });
    })
    .catch(err => {
      next(err);
    });

});

module.exports = router;

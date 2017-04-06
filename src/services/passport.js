const bcrypt = require('bcrypt-nodejs');
const passport = require('passport');
const User = require('../models/UserModel');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');

const signinStrategy = new LocalStrategy(function (username, password, done) {
  User.findOne({ username }).exec()
    .then(user => {
      // If no user, call done with NULL argument and false signifying error
      if (!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, function (err, isMatch) {
        if (err) {
          return done(err, false);
        }
        // If password does not match call done with NULL and false
        if (!isMatch) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
    .catch(err => done(err, false));
});

// JwtStrategy set-up
const jwtOptions = {
  // Get secret from env file
  secretOrKey: process.env.SECRET,
  // Location of token in request header
  jwtFromRequest: ExtractJwt.fromHeader('authorization')
};

// Create strategy that accepts token and decodes it
const authStrategy = new JwtStrategy(jwtOptions, function (payload, done) {
  User.findById(payload.userId, function (err, user) {
    if (err) { return done(err, false); }

    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use('authStrategy', authStrategy);
passport.use('signinStrategy', signinStrategy);

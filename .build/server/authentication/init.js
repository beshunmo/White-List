'use strict';

const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Users = require('../models/users');
const authenticationMiddleware = require('./middleware');

async function findUser(username, callback) {
  let user = await Users.findOne({ username });
  if (user !== null) {
    console.log('TCL: findUser -> user username', user);
    return callback(null, user);
  }
  // user = await Users.findOne({ facebook: username });
  // if (user !== null) {
  //   console.log('TCL: findUser -> user', user);
  //   return callback(null, user);
  // }

  // user = await Users.findOne({ _id: username });
  // if (user !== null) {
  //   console.log('TCL: findUser -> user _id', user);
  //   return callback(null, user);
  // }

  user = await Users.findOne({ facebook: username });
  if (user !== null) {
    console.log('TCL: findUser -> user facebook', user);
    return callback(null, user);
  }

  return callback(null);
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('TCL: user', user);
  console.log(user);
  findUser(user.id, done);
});

function initPassport() {
  passport.use(new LocalStrategy((username, password, done) => {
    findUser(username, (err, user) => {
      // eslint-disable-line
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
      console.log(user);
      bcrypt.compare(password, user.password, (err, isValid) => {
        // eslint-disable-line
        if (err) {
          return done(err);
        }
        if (!isValid) {
          return done(null, false);
        }
        return done(null, user);
      });
    });
  }));

  passport.use(new FacebookStrategy({
    clientID: process.env.facebook_api_id,
    clientSecret: process.env.facebook_api_secret,
    callbackURL: process.env.facebook_callback
  }, async (accessToken, refreshToken, profile, done) => {
    const user = await Users.findOne({ facebook: profile.id });
    if (!user) {
      try {
        const user = new Users({ // eslint-disable-line
          facebook: profile.id,
          username: profile.displayName
        });
        await user.save();
      } catch (error) {
        console.log(error.message);
      }
    }
    process.nextTick(() => done(null, profile));
  }));

  passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;
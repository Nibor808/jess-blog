'use strict'
const passport = require('passport');
const { JWT_SECRET } = require('../config/config.json');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');
const knex = require('./db');
const bcrypt = require('bcrypt-nodejs');

// create local strategy for signing in
const LocalLogin = new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  knex('Users').where('email', email).select()
    .then(data => {
      if(!data.length) {
        return done(null, false); // no such user
      }else {
        bcrypt.compare(password, data[0].password, function(err, isMatch) {
          if(err) { return done(err); }
          if(!isMatch) { return done(null, false); } // no password match

          return done(null, data);
        });
      }
    })
    .catch(err => {
      return done(err);
    });
});

// create JWT strategy for navigation
const JWTOpts = {
  jwtFromRequest: ExtractJWT.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
};

const JWTLogin = new JWTStrategy(JWTOpts, function(payload, done) {
  knex('Users').where('id', payload.sub).select()
    .then(data => {
      if(!data.length) {
        return done(null, false);
      }else {
        return done(null, data);
      }
    })
    .catch(err => {
      return done(err);
    });
});

passport.use(JWTLogin);
passport.use(LocalLogin);

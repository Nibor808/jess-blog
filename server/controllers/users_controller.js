'use strict';
const knex = require('../utils/db');
const bcrypt = require('bcrypt-nodejs');
const JWT = require('jwt-simple');
const sendMail = require('../utils/sendmail');

function tokenForUser(userId) {
  const timestamp = new Date().getTime();
  return JWT.encode({ sub: userId, iat: timestamp }, process.env.JWT_SECRET);
}

module.exports = {

  // get all users
  getUsers(req, res) {
    knex('Users').select()
      .then(data => {
        if (!data.length) {
          res.send({ error: 'No users no get.' });
        } else {
          res.send({ ok: data });
        }
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  },

  // get one user
  getUser(req, res) {
    knex('Users').where('id', req.params.id).select()
      .then(data => {
        if (!data.length) {
          res.send({ error: 'No such user.' });
        } else {
          res.send({ ok: data });
        }
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  },

  // sign up new user
  signupUser(req, res) {
    if (!req.body.username || !req.body.email || !req.body.password) {
      return res.send({ error: 'Please fill out all fields.' });
    }

    // hash password before saving
    bcrypt.hash(req.body.password, null, null, (err, hash) => {
      if (err) {
        return err;
      } else {
        req.body.password = hash;

        knex('Users').insert({
          email: req.body.email.trim().toLowerCase(),
          password: req.body.password.trim(),
          username: req.body.username.trim()
        })
          .then(data => {
            res.send({ token: tokenForUser(data[0]), username: req.body.username });
          })
          .catch(err => {
            res.send({ error: 'Email and/or username already in use' });
          });
      }
    });
  },

  // sign in user
  signinUser(req, res) {
    knex('Users').where('email', req.body.email).select('username')
      .then(data => {
        res.send({ token: tokenForUser(req.user[0].id), username: data[0].username });
      });
  },

  // delete user
  deleteUser(req, res) {
    //first delete any comments associated with the user
    knex('Comments').where('user_id', req.params.id).del();

    knex('Users').where('id', req.params.id).del()
      .then(data => {
        if (data !== 1) {
          res.send({ error: 'User doesn\'t exist.' });
        } else {
          res.send({ ok: 'User deleted.' });
        }
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  },

  // send email for password reset
  passwordReset(req, res) {
    if (!req.body.email) {
      return res.send({ error: 'Please provide an email address.' });
    }

    const passResetToken = Math.random().toString(36);

    const mailData = {
      from: 'JessTech',
      to: req.body.email,
      subject: 'Password Reset',
      html: `Follow this link to <a href=${process.env.ROOT_URL}/passreset/${passResetToken}/${req.body.email}>reset your password</a>.`
    };

    sendMail(mailData)
      .then(() => {
        knex('Users').where('email', req.body.email).update({
          passResetToken
        })
          .then(data => {
            if (data !== 1) {
              res.send({ error: 'User with this email not found.' });
            } else {
              res.send({ ok: 'Email sent.' });
            }
          });
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  },

  // receive request for password reset
  // reset passResetToken to null
  passResetLink(req, res) {
    knex('Users').where('email', req.params.user).select()
      .then(data => {
        if (!data.length) {
          res.send({ error: 'User not found.' });
        } else if (req.params.token !== data.passResetToken) {
          res.send({ error: 'Link expired.' });
        } else {
          res.send({ ok: 'Redirect.' });
          knex('Users').where('email', req.params.user).update('passResetToken', null);
        }
      });
  }
};

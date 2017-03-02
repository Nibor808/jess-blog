const knex = require('../utils/db');
const bcrypt = require('bcrypt-nodejs');

module.exports = UsersController = {

  // get all users
  getUsers(req, res) {
    knex('Users').select()
      .then(data => {
        if(!data.length) {
          res.status(422).send({ error: 'No users no get.'});
          return;
        }else {
          res.send({ ok: data });
        }
      })
      .catch(err => {
        res.status(422).send({ error: 'Could not get users.'});
      });
  },

  // get one user
  getUser(req, res) {
    knex('Users').where('id', req.params.id).select()
      .then(data => {
        if(!data.length) {
          res.status(422).send({ error: 'No such user.' });
          return;
        }else {
          res.send({ ok: data });
        }
      })
      .catch(err => {
        res.status(422).send({ error: 'Could not get user' });
      });
  },

  hashPassword(password) {
    return new Promise((reject, resolve) => {
      bcrypt.hash(password, null, null, (err, hash) => {
        if(hash) {
          console.log('hash',hash)
          resolve(hash);
        }else {
          console.log('hashErr',err)
          reject(err);
        }
      })
    });
  },

  saveUser(req, res) {
    if(!req.body.username || !req.body.email || !req.body.password) {
      res.status(422).send({ error: 'Please fill out all fields.' })
      return;
    }

    // if(req.body.password !== req.body.passConfirm) {
    //   res.status(422).send({ error: 'Your passwords must match.' });
    //   return;
    // }
    // const password = module.exports.hashPassword(req.body.password);

    knex('Users').insert({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username
    })
    .then(data => {
      if(!data[0] > 0) {
        res.status(422).send({ error: 'User was not saved.' });
        return;
      }else {
        res.send({ ok: 'User saved.' });
      }
    })
    .catch(err => {
      res.status(422).send({ error: 'email or Username already in use.' });
    })
  }
};
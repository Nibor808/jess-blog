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

  // save a new user
  saveUser(req, res) {
    if(!req.body.username || !req.body.email || !req.body.password) {
      res.status(422).send({ error: 'Please fill out all fields.' })
      return;
    }

    if(req.body.password !== req.body.passConfirm) {
      res.status(422).send({ error: 'Your passwords must match.' });
      return;
    }

    bcrypt.hash(req.body.password, null, null, (err, hash) => {
        if(err) {
          console.log('hashErr',err)
          return;
        }else {
          req.body.password = hash;

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
            res.status(422).send({ error: 'Email or Username already in use.' });
          })
        }
      })
  },

  // delete user
  deleteUser(req, res) {
    //first delete any comments associated with the user
    knex('Comments').where('user_id', req.params.id).del();

    knex('Users').where('id', req.params.id).del()
      .then(data => {
        if(!data == 1) {
          res.status(422).send({ error: 'User doesn\'t exist.' });
        }else {
          res.send({ ok: 'User deleted.' });
        }
      })
      .catch(err => {
        res.status(422).send({ error: 'User not deleted.' });
      });
  }
};
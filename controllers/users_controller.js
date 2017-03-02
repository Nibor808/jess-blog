const knex = require('../utils/db');

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
        console.log(data.length)
      })
  }
};
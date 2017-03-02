const UserController = require('../controllers/users_controller');

module.exports = function(app) {
  app.get('/users', UserController.getUsers);
  app.get('/user/:id', UserController.getUser);
};
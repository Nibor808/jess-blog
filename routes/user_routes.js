const UserController = require('../controllers/users_controller');
require('../utils/passport');
const passport = require('passport');

const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/users', UserController.getUsers);
  app.get('/user/:id', UserController.getUser);
  app.post('/signup', UserController.signupUser);
  app.post('/signin', requireSignin, UserController.signinUser);
  app.post('/deleteuser/:id', UserController.deleteUser);
  app.post('/passreset', UserController.passwordReset);
  app.post('passresetlink/:token/:user', UserController.passResetLink);
};
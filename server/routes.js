const ArticleController = require('./controllers/articles_controller');
const CommentController = require('./controllers/comments_controller');
const UserController = require('./controllers/users_controller');
require('./utils/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  //articles
  app.get('/articles/:type', ArticleController.getAllArticles);
  app.get('/article/:id', ArticleController.getArticle);
  app.post('/savearticle', ArticleController.saveArticle);
  //comments
  app.get('/comments/:type/:id', CommentController.getComments);
  app.get('/editcomment/:id', CommentController.getAComment);
  app.post('/savecomment', CommentController.saveComment);
  app.post('/updatecomment/:id', CommentController.updateComment);
  //users
  app.get('/users', UserController.getUsers);
  app.get('/user/:id', UserController.getUser);
  app.post('/signup', UserController.signupUser);
  app.post('/signin', requireSignin, UserController.signinUser);
  app.post('/deleteuser/:id', UserController.deleteUser);
  app.post('/passreset', UserController.passwordReset);
  app.post('passresetlink/:token/:user', UserController.passResetLink);
}
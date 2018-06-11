'use strict';
const ArticleController = require('./controllers/articles_controller');
const CommentController = require('./controllers/comments_controller');
const UserController = require('./controllers/users_controller');
const SearchController = require('./controllers/search_controller');
require('./utils/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {
  //articles
  app.get('/articles/:type', ArticleController.getAllArticlesOfType);
  app.get('/article/:id', ArticleController.getArticle);
  app.post('/savearticle', ArticleController.saveArticle);
  app.get('/allarticles/:isPreview', ArticleController.getAllArticles);
  app.post('/publisharticle/:id', requireAuth, ArticleController.publishArticle);
  app.post('/deletearticle/:id', ArticleController.deleteArticle);
  app.post('/updatearticle/:id', ArticleController.updateArticle)
  //comments
  app.get('/comments/:type/:id', CommentController.getComments);
  app.get('/editcomment/:id', CommentController.getAComment);
  app.post('/savecomment', CommentController.saveComment);
  app.post('/updatecomment/:id', CommentController.updateComment);
  app.post('/deletecomment/:id', CommentController.deleteComment);
  //users
  app.get('/users', UserController.getUsers);
  app.get('/user/:id', UserController.getUser);
  app.post('/signup', UserController.signupUser);
  app.post('/signin', requireSignin, UserController.signinUser);
  app.post('/deleteuser/:id', UserController.deleteUser);
  app.post('/passreset', UserController.passwordReset);
  app.post('passresetlink/:token/:user', UserController.passResetLink);
  // search
  app.post('/search', SearchController.getSearchResults);
};

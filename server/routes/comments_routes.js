const CommentsController = require('../controllers/comments_controller');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.post('/savecomment/:idtype/:typeid', requireAuth, CommentsController.saveComment);
  app.get('/getcomments/:idtype/:typeid', CommentsController.getComments);
  app.post('/deletecomment/:id', CommentsController.deleteComment);
}
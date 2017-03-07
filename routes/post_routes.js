const PostsController = require('../controllers/posts_controller');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.get('/posts', PostsController.getAllPosts);
  app.get('/post/:id', PostsController.getPost);
  app.post('/savepost', PostsController.savePost);
  app.post('/updatepost/:id', PostsController.updatePost);
  app.post('/deletepost/:id', PostsController.deletePost);
  app.post('/savecomment', requireAuth, PostsController.saveComment);
  app.post('/deletecomment/:id', PostsController.deleteComment);
}
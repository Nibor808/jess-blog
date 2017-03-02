const PostsController = require('../controllers/posts_controller');

module.exports = function(app) {
  app.get('/posts', PostsController.getAllPosts);
  app.get('/post/:id', PostsController.getPost);
  app.post('/savepost', PostsController.savePost);
  app.post('/updatepost/:id', PostsController.updatePost);
  app.post('/deletepost/:id', PostsController.deletePost);
}
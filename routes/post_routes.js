const PostsController = require('../controllers/posts_controller');

module.exports = function(app) {

  app.get('/', (req, res) => {
    res.send({ post: 'data' });
  });

  app.get('/posts', PostsController.getAllPosts);

  app.get('/post/:id', PostsController.getPost);

  app.post('/savepost', PostsController.savePost);
}
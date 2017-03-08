const ReviewController = require('../controllers/review_controller');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });

module.exports = function(app) {
  app.get('/reviews', ReviewController.getAllReviews);
  app.get('/review/:id', ReviewController.getReview);
  app.post('/savereview', ReviewController.saveReview);
  app.post('/updatereview/:id', ReviewController.updateReview);
  app.post('/deletereview/:id', ReviewController.deleteReview);
  app.post('/savecomment', requireAuth, ReviewController.saveComment);
  app.post('/deletecomment/:id', ReviewController.deleteComment);
}
const ReviewController = require('../controllers/review_controller');

module.exports = function(app) {
  app.get('/reviews', ReviewController.getAllReviews);
  app.get('/review/:id', ReviewController.getReview);
  app.post('/savereview', ReviewController.saveReview);
  app.post('/updatereview/:id', ReviewController.updateReview);
  app.post('/deletereview/:id', ReviewController.deleteReview);
};
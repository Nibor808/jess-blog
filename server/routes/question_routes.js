const QuestionController = require('../controllers/questions_controller');

module.exports = function(app) {
  app.get('/questions', QuestionController.getAllQuestions);
  app.get('/question/:id', QuestionController.getQuestion);
}
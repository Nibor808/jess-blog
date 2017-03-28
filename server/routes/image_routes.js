const ImagesController = require('../controllers/images_controller');

module.exports = function(app) {
  app.get('/image/:idtype/:typeid', ImagesController.getImages);
  app.get('/images/:idtype', ImagesController.getAllImages);
}
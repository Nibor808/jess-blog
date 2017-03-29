const knex = require('../utils/db');

module.exports = {
  getImages(req, res) {
    const images = [];

    knex('Images').where(req.params.idtype, req.params.typeid).select()
    .then(data => {
      if (!data.length) {
        res.status(204).send({ error: 'No matching images' })
      }else {
        data.forEach(item => {
          images.push(item);
        });
        res.send({ ok: images })
      }
    })
    .catch(err => {
      res.status(422).send({ error: err })
    })
  },

  getAllImages(req, res) {
    knex('Images').whereNot(req.params.idtype, null)
    .then(data => {
      if (!data.length) {
        res.status(204).send({ error: 'No images' })
      }else {
        res.send({ ok: data })
      }
    })
    .catch(err => {
      res.status(422).send({ error: err })
    })
  }
}
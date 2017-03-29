const knex = require('../utils/db');
const moment = require('moment');

module.exports = {

  //get all reviews
  getAllReviews(req, res) {
    knex('Reviews').select()
      .then(data => {
        if(!data.length > 0) {
          res.status(204).send({ error: 'No reviews to get' });
        }else {
          data.forEach((item) => {
            item.createdAt = moment(item.createdAt).toString();
          });
          res.send({ ok: data });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
      });
  },

  // get a review
  getReview(req, res) {
    knex('Reviews').where('id', req.params.id)
    .select()
      .then(data => {
        if(!data.length > 0) {
          res.status(204).send({ error: 'Review does not exist' });
          return;
        }else {
          data[0].createdAt = moment(data[0].createdAt).toString();
          data[0].specs = JSON.parse(data[0].specs);
          res.send({ ok: data[0] })
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
      });
  },

  // save a review
  saveReview(req, res) {
    if(!req.body.title || !req.body.content) {
      res.status(422).send({ error: 'All reviews require a title and some content' });
      return;
    }

    knex('Reviews').insert({
      title: req.body.title.trim(),
      content: req.body.content.trim(),
      pros: req.body.pros.trim(),
      cons: req.body.cons.trim(),
      category: req.body.category.trim(),
      keywords: req.body.keywords.trim(),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    })
      .then(data => {
        if(!data[0] > 0) {
          res.status(422).send({ error: 'Review was not saved' });
          return;
        }else {
          knex('Images').insert({
            review_id: data[0],
            file: req.body.imgFile
          })
          .then(data => {
            if(!data[0] > 0) {
              res.status(422).send({ error: 'Images could not be saved.' });
              return;
            }else {
              res.send({ ok: 'Review was saved' });
            }
          })
          .catch(err => {
            res.status(422).send({ error: err });
            return;
          });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
        return;
      });
  },

  //update a review
  updateReview(req, res) {

    knex('Reviews').where('id', req.params.id).update({
      title: req.body.title.trim(),
      content: req.body.content.trim(),
      pros: req.body.pros.trim(),
      cons: req.body.cons.trim(),
      category: req.body.category.trim(),
      keywords: req.body.keywords.trim()
    })
      .then(data => {
        if (!data == 1) {
          res.status(204).send({ error: 'Review does not exist.' });
        }else {
          res.send({ ok: 'Review updated' });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
        return;
      });
  },

  // delete a review, it's comments and images
  deleteReview(req, res) {
    // first delete comments
    knex('Comments').where('review_id', req.params.id).del();
    // then delete images
    knex('Images').where('review_id', req.params.id).del();

    // then delete review
    knex('Review').where('id', req.params.id).del()
      .then(data => {
        if(!data == 1) {
          res.status(204).send({ error: 'Review does not exist.'});
          return;
        }else {
          res.send({ ok: 'Review deleted.' });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
      });
  }
};
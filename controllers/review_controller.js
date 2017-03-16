const knex = require('../utils/db');
const moment = require('moment');

module.exports = ReviewController = {

  //get all reviews
  getAllReviews(req, res) {
    knex('Reviews').select()
      .then(data => {
        if(!data.length) {
          res.status(422).send({ error: 'No reviews to get' });
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

  // get a review and it's corresponding comments and images as an object
  // comments added as an array
  // images added as an array
  // return the review object
  getReview(req, res) {
    const review = {};
    const comments = [];
    const images = [];

    //get review
    knex('Reviews').where('Reviews.id', req.params.id)
    .select(
      'Reviews.id as reviewId',
      'Reviews.title as reviewTitle',
      'Reviews.content as reviewContent',
      'Reviews.pros as reviewPros',
      'Reviews.cons as reviewCons',
      'Reviews.category as reviewCategory',
      'Reviews.keywords as reviewKeywords',
      'Reviews.specs as reviewSpecs',
      'Reviews.createdAt as reviewDate')
      .then(data => {
        if(!data.length) {
          res.status(422).send({ error: 'Review does not exist' });
          return;
        }else {
          data.map(item => {
            review.reviewId = item.reviewId;
            review.reviewTitle = item.reviewTitle;
            review.reviewContent = item.reviewContent;
            review.pros = item.reviewPros;
            review.cons = item.reviewCons;
            review.category = item.reviewCategory;
            review.keywords = item.reviewKeywords;
            review.specs = JSON.parse(item.reviewSpecs);
            review.createdAt = moment(item.reviewDate).toString();
          });

          // get comments
          knex('Comments').where('Comments.review_id', req.params.id)
          .join('Users', 'Comments.user_id', '=', 'Users.id')
          .select(
            'Comments.id as commentId',
            'Comments.title as commentTitle',
            'Comments.content as commentContent',
            'Comments.createdAt as commentCreatedAt',
            'Users.username as username'
          ).orderBy('createdAt', 'asc')
          .then(data => {
            data.forEach((item) => {
              item.commentCreatedAt = moment(item.commentCreatedAt).toString();
              comments.push(item);
            });
            review.comments = comments;

            // get images
            knex('Images').where('review_id', req.params.id).select()
              .then(data => {
                data.forEach((item) => {
                  images.push(item);
                });
                review.images = images;
                res.send({ ok: review });
              })
              .catch(err => {
                res.status(422).send({ error: err });
              });
          })
          .catch(err=> {
            res.status(422).send({ error: err });
          });
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
      title: req.body.title,
      content: req.body.content,
      pros: req.body.pros,
      cons: req.body.cons,
      category: req.body.category,
      keywords: req.body.keywords,
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
      title: req.body.title,
      content: req.body.content,
      pros: req.body.pros,
      cons: req.body.cons,
      category: req.body.category,
      keywords: req.body.keywords
    })
      .then(data => {
        if (!data == 1) {
          res.status(422).send({ error: 'Review does not exist.' });
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
          res.status(422).send({ error: 'Review does not exist.'});
          return;
        }else {
          res.send({ ok: 'Review deleted.' });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
      });
  },

  // save comments
  saveReviewComment(req, res) {
    if(!req.body.content) {
      res.status(422).send({ error: 'You must have some content in your comment.' });
    }

    // for testing remove if block later
    if(!req.body.id || !req.body.user) {
      res.send({ error: 'Missing data'});
    }

    //get user
    knex('Users').where('username', req.body.user).select('id')
      .then(data => {
        //save comment
        knex('Comments').insert({
          review_id: req.body.id,
          user_id: data[0].id,
          title: req.body.title,
          content: req.body.content,
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        .then(data => {
          if(!data[0] > 0) {
            res.status(422).send({ error: 'Comment was not saved.' });
          }else {
            res.send({ ok: 'Comment saved.' });
          }
        })
        .catch(err => {
          res.status(422).send({ error: err });
        });
      })
      .catch(err => {
        res.status(422).send({ error: err });
      });
  },

  // delete a comment
  deleteReviewComment(req, res) {
    knex('Comments').where('id', req.params.id).del()
      .then(data => {
        if(!data == 1) {
          res.status(422).send({ error: 'Comment does not exist.' });
        }else {
          res.send({ ok: 'Comment deleted.' });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
      });
  }
};
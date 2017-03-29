const knex = require('../utils/db');
const moment = require('moment');

module.exports = {

  //get all posts
  getAllPosts(req, res) {
    knex('Posts').select()
      .then(data => {
        if(!data.length > 0) {
          res.status(204).send({ error: 'No posts to get' });
        }else {
          data.forEach((item) => {
            item.createdAt = moment(item.createdAt).toString();
          })
          res.send({ ok: data });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
      });
  },

  // get a post
  getPost(req, res) {
    knex('Posts').where('id', req.params.id)
    .select()
      .then(data => {
        if(!data.length > 0) {
          res.status(204).send({ error: 'Post does not exist' });
          return;
        }else {
          data[0].createdAt = moment(data[0].createdAt).toString();
          res.send({ ok: data[0] });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
      });
  },

  // save a post
  savePost(req, res) {
    if(!req.body.title || !req.body.content) {
      res.status(422).send({ error: 'All posts require a title and some content' });
      return;
    }

    knex('Posts').insert({
      title: req.body.title.trim(),
      content: req.body.content.trim(),
      category: req.body.category.trim(),
      keywords: req.body.keywords.trim(),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    })
      .then(data => {
        if(!data[0] > 0) {
          res.status(422).send({ error: 'Post was not saved' });
          return;
        }else {
          knex('Images').insert({
            post_id: data[0],
            file: req.body.imgFile
          })
          .then(data => {
            if(!data[0] > 0) {
              res.status(422).send({ error: 'Images could not be saved.' });
              return;
            }else {
              res.send({ ok: 'Post was saved' });
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

  //update a post
  updatePost(req, res) {

    knex('Posts').where('id', req.params.id).update({
      title: req.body.title.trim(),
      content: req.body.content.trim(),
      category: req.body.category.trim(),
      keywords: req.body.keywords.trim()
    })
      .then(data => {
        if (!data == 1) {
          res.status(204).send({ error: 'Posts does not exist.' });
        }else {
          res.send({ ok: 'Post updated' });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
        return;
      });
  },

  // delete a post, it's comments and images
  deletePost(req, res) {
    // first delete comments
    knex('Comments').where('post_id', req.params.id).del();
    // then delete images
    knex('Images').where('post_id', req.params.id).del();

    // then delete post
    knex('Posts').where('id', req.params.id).del()
      .then(data => {
        if(!data == 1) {
          res.status(204).send({ error: 'Post does not exist.'});
          return;
        }else {
          res.send({ ok: 'Post deleted.' });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
      });
  }
};
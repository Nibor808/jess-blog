const knex = require('../utils/db');
const moment = require('moment');

module.exports = PostController = {

  //get all posts
  getAllPosts(req, res) {
    knex('Posts').select()
      .then(data => {
        if(!data.length) {
          res.status(422).send({ error: 'No posts to get' });
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

  // get a post and it's corresponding comments and images as an object
  // comments added as an array
  // images added as an array
  // return the post object
  getPost(req, res) {
    const post = {};
    const comments = [];
    const images = [];

    //get post
    knex('Posts').where('Posts.id', req.params.id)
    .select(
      'Posts.id as postId',
      'Posts.title as postTitle',
      'Posts.content as postContent',
      'Posts.category as postCategory',
      'Posts.keywords as postKeywords',
      'Posts.createdAt as postDate')
      .then(data => {
        if(!data.length) {
          res.status(422).send({ error: 'Post does not exist' });
          return;
        }else {
          data.map(item => {
            post.postId = item.postId;
            post.postTitle = item.postTitle;
            post.postContent = item.postContent;
            post.postCategory = item.postCategory;
            post.keywords = item.postKeywords;
            post.createdAt = moment(item.postDate).toString();
          });

          // get comments
          knex('Comments').where('Comments.post_id', req.params.id)
          .join('Users', 'Comments.user_id', '=', 'Users.id')
          .select(
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
            post.comments = comments;

            // get images
            knex('Images').where('post_id', req.params.id).select()
              .then(data => {
                data.forEach((item) => {
                  images.push(item);
                });
                post.images = images;
                res.send({ ok: post });
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

  // save a post
  savePost(req, res) {
    if(!req.body.title || !req.body.content) {
      res.status(422).send({ error: 'All posts require a title and some content' });
      return;
    }

    knex('Posts').insert({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      keywords: req.body.keywords,
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
      })
  },

  //update a post
  updatePost(req, res) {

    knex('Posts').where('id', req.params.id).update({
      title: req.body.title,
      content: req.body.content,
      category: req.body.category,
      keywords: req.body.keywords
    })
      .then(data => {
        if (!data == 1) {
          res.status(422).send({ error: 'Posts does not exist.' });
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
          res.status(422).send({ error: 'Post does not exist.'});
          return;
        }else {
          res.send({ ok: 'Post deleted.' });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
      })
  },

  // save comments
  saveComment(req, res) {
    if(!req.body.content) {
      res.status(422).send({ error: 'You must have some content in your comment.' });
    }

    // for testing remove if block later
    if(!req.body.post_id || !req.body.user_id) {
      res.send({ error: 'Missing data'});
    }

    knex('Comments').insert({
      post_id: req.body.post_id,
      user_id: req.body.user_id,
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
    })
  },

  // delete a comment
  deleteComment(id) {
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
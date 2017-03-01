const knex = require('../utils/db');

const PostController = {

  getAllPosts(req, res) {
    knex('Posts').select()
      .then(data => {
        if(!data.length) {
          res.status(422).send({ error: 'No posts to get' });
        }else {
          res.send({ ok: data });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(422).send({ error: 'Could not get posts' });
      });
  },

  getPost(req, res) {
    const post = {};
    const comments = [];

    knex('Posts').where('Posts.id', req.params.id)
    .select(
      'Posts.id as postId',
      'Posts.title as postTitle',
      'Posts.content as postContent')
      .then(data => {
        if(!data.length) {
          res.status(422).send({ error: 'Post does not exist' });
        }else {
          data.map(item => {
            post.postId = item.postId;
            post.postTitle = item.postTitle;
            post.postContent = item.postContent;
          });
        }
      })
      .then(() => {
        knex('Comments').where('Comments.post_id', req.params.id)
        .join('Users', 'Comments.user_id', '=', 'Users.id')
        .select(
          'Comments.title as commentTitle',
          'Comments.content as commentContent',
          'Users.username as username'
        )
        .then(data => {
          data.forEach((item) => {
            comments.push(item);
          })
          post.comments = comments;
          res.send({ ok: post });
        })
        .catch(err=> {
          console.log(err);
          res.status(422).send({ error: 'Could not get comments or users' });
        });
      })
      .catch(err => {
        console.log(err);
        res.status(422).send({ error: 'Could not get post' });
      });
  },

  savePost(req, res) {
    if(!req.body.title || !req.body.content) {
      res.status(422).send({ error: 'You all posts require a title and some content' });
    }

    knex('Posts').insert({
      title: req.body.title,
      content: req.body.content
    })
      .then(data => {
        if(!data.length) {
          res.status(422).send({ error: 'Post was not saved' });
        }else {
          res.send({ ok: 'Post was saved' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(422).send({ error: 'Post was not saved' });
      })
  },

  updatePost(req, res) {
    if(!req.body.title || !req.body.content) {
      res.status(422).send({ error: 'All posts require a title and some content' });
    }

    knex('Posts').where('id', req.params.id).update({
      title: req.body.title,
      content: req.body.content
    })
      .then(data => {
        if(!data.length) {
          res.status(422).send({ error: 'This post must be saved before updating' });
        }else {
          res.send({ ok: 'Post updated' });
        }
      })
      .catch(err => {
        res.status(422).send({ error: 'Post could not be updated' });
      });
  }
}

module.exports = PostController;
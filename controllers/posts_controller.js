const knex = require('../utils/db');

module.exports = PostController = {

  //get all posts
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

  // get a post and it's corresponding comments as an object
  // comments added as an array
  // return the post object
  getPost(req, res) {
    const post = {};
    const comments = [];

    //get post
    knex('Posts').where('Posts.id', req.params.id)
    .select(
      'Posts.id as postId',
      'Posts.title as postTitle',
      'Posts.content as postContent',
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
            post.createdAt = item.postDate;
          });

          // get comments
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
            });
            post.comments = comments;
            res.send({ ok: post });
          })
          .catch(err=> {
            console.log(err);
            res.status(422).send({ error: 'Could not get comments or users' });
          });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(422).send({ error: 'Could not get post' });
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
      createdAt: new Date()
    })
      .then(data => {
        console.log(data)
        if(!data[0] > 0) {
          res.status(422).send({ error: 'Post was not saved' });
          return;
        }else {
          res.send({ ok: 'Post was saved' });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(422).send({ error: 'Post was not saved' });
        return;
      })
  },

  //update a post
  updatePost(req, res) {
    if(!req.body.title || !req.body.content) {
      res.status(422).send({ error: 'All posts require a title and some content' });
      return;
    }

    knex('Posts').where('id', req.params.id).update({
      title: req.body.title,
      content: req.body.content
    })
      .then(data => {
        res.send({ ok: 'Post updated' });
      })
      .catch(err => {
        res.status(422).send({ error: 'Post could not be updated' });
        return;
      });
  },

  // delete a post and it's comments
  deletePost(req, res) {
    // first delete comments
    knex('Comments').where('post_id', req.params.id).del()

    // then delete post
    knex('Posts').where('id', req.params.id).del()
      .then(data => {
        if(!data == 1) {
          res.status(422).send({ error: 'Post does not exist.'});
          return;
        }else {
          res.send({ ok: 'Post deleted.' });
        }
      });
  },

  // save comments
  saveComment(req, res) {
    if(!req.body.content) {
      res.status(422).send({ error: 'You must have some content in your comment.' });
    }

    // for testing remove later
    if(!req.body.post_id || !req.body.user_id) {
      res.send({ error: 'Missing data'});
    }

    knex('Comments').insert({
      post_id: req.body.post_id,
      user_id: req.body.user_id,
      title: req.body.title,
      content: req.body.content,
      createdAt: new Date()
    })
    .then(data => {
      if(!data[0] > 0) {
        res.status(422).send({ error: 'Comment was not saved.' });
      }else {
        res.send({ ok: 'Comment saved.' });
      }
    })
    .catch(err => {
      res.status(422).send({ error: 'Could not save the comment.'});
    })
  }
};
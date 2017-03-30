const knex = require('../utils/db');
const moment = require('moment');

module.exports = {

  //get all comments for a post, review or question
  getComments(req, res) {
    const comments = [];

    knex('Comments').where(req.params.idtype, req.params.typeid)
    .join('Users', 'Comments.user_id', '=', 'Users.id')
    .select(
      'Comments.id as commentId',
      'Comments.title as commentTitle',
      'Comments.content as commentContent',
      'Comments.createdAt as commentCreatedAt',
      'Comments.post_id as commentPostId',
      'Comments.review_id as commentReviewId',
      'Comments.question_id as commentQuestionId',
      'Comments.parent_comment_id as parentCommentId',
      'Users.username as username'
    ).orderBy('createdAt', 'asc')
    .then(data => {
      if (!data.length > 0) {
        res.status(204).send({ error: 'No comments' })
      }else {
        data.forEach((item) => {
          item.commentCreatedAt = moment(item.commentCreatedAt).toString();
          comments.push(item);
        })
        res.send({ ok: comments });
      }
    })
    .catch(err => {
      res.status(422).send({ error: 'Could not get coments' })
    });
  },

  // get a comment for editing
  getAComment(req, res) {
    knex('Comments').where('id', req.params.id).select()
    .then(data => {
      if (!data.length > 0) {
        res.status(204).send({ error: 'Comment not found' })
      }else {
        res.send({ ok: data[0] })
      }
    })
    .catch(err => {
      res.status(422).send({ error: 'Could not get comment' })
    });
  },

  // save comment
  saveComment(req, res) {
    if(!req.body.content) {
      res.status(422).send({ error: 'You must have some content in your comment.' });
      return;
    }

    //get user_id
    knex('Users').where('username', req.body.user).select('id')
      .then(data => {
        const insertObj = {
          user_id: data[0].id,
          title: req.body.title.trim(),
          content: req.body.content.trim(),
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        };

        insertObj[req.params.idtype] = req.params.typeid;

        // save comment
        knex('Comments').insert( insertObj )
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
  deleteComment(req, res) {
    knex('Comments').where('id', req.params.id).del()
      .then(data => {
        if(!data == 1) {
          res.status(204).send({ error: 'Comment does not exist.' });
        }else {
          res.send({ ok: 'Comment deleted.' });
        }
      })
      .catch(err => {
        res.status(422).send({ error: err });
      });
  },

  // edit comment
  updateComment(req, res) {
    if (!req.body.content) {
      res.status(422).send({ error: 'You must have some content in your comment.' });
      return;
    }

    knex('Comments').where('id', req.params.id).update({
      title: req.body.title,
      content: req.body.content
    })
    .then(data => {
      if (!data == 1) {
        res.status(204).send({ error: 'Comment could not be found' })
      }else {
        res.send({ ok: 'Comment updated' })
      }
    })
    .catch(err => {
      res.status(422).send({ error: err })
    });
  }
}


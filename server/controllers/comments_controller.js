const knex = require('../utils/db');
const moment = require('moment');

module.exports = {

  //get all comments for a post, review or question
  getComments(req, res) {
    const comments = [];

    knex('Comments').modify(queryBuilder => {
      if (req.params.id === 'null') {
        queryBuilder.whereNot(req.params.type, null);
      }else {
        queryBuilder.where(req.params.type, req.params.id);
      }
    })
    .join('Users', 'Comments.user_id', '=', 'Users.id')
    .select(
      'Comments.id',
      'Comments.title',
      'Comments.content',
      'Comments.createdAt',
      'Comments.article_id',
      'Comments.parent_comment_id',
      'Users.username as username'
    ).orderBy('createdAt', 'asc')
    .then(data => {
      if (!data.length > 0) {
        res.send({ error: 'No comments' });
      }else {
        data.forEach((item) => {
          item.createdAt = moment(item.createdAt).toString();
          comments.push(item);
        });
        res.send({ ok: comments });
      }
    })
    .catch(err => {
      res.send({ error: err.message });
    });
  },

  // get a comment for editing
  getAComment(req, res) {
    knex('Comments').where('id', req.params.id).select()
    .then(data => {
      if (!data.length > 0) {
        res.send({ error: 'Comment not found' });
      }else {
        res.send({ ok: data[0] });
      }
    })
    .catch(err => {
      res.send({ error: err.message });
    });
  },

  // save comment
  saveComment(req, res) {
    if(!req.body.content) {
      res.send({ error: 'You must have some content in your comment.' });
      return;
    }

    const title = req.body.title || null;

    //get user_id
    knex('Users').where('username', req.body.user).select('id')
      .then(data => {
        const insertObj = {
          user_id: data[0].id,
          title: title,
          content: req.body.content.trim(),
          createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
        };

        insertObj[req.body.type] = req.body.id;

        // save comment
        knex('Comments').insert( insertObj )
        .then(data => {
          if(!data[0] > 0) {
            res.send({ error: 'Comment was not saved.' });
          }else {
            res.send({ ok: 'Comment saved.' });
          }
        })
        .catch(err => {
          res.send({ error: err.message });
        });
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  },

  // delete a comment
  deleteComment(req, res) {
    console.log(req.params.id)
    knex('Comments').where('id', req.params.id).del()
      .then(data => {
        if(!data == 1) {
          res.send({ error: 'Comment does not exist.' });
        }else {
          knex('Comments').where('parent_comment_id', req.params.id).del()
            .then(() => {
              res.send({ ok: 'Comment deleted.' });
            })
            .catch(err => {
              res.send({ error: err.message });
            });
        }
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  },

  // edit comment
  updateComment(req, res) {
    if (!req.body.content) {
      res.send({ error: 'You must have some content in your comment.' });
      return;
    }

    knex('Comments').where('id', req.params.id).update({
      title: req.body.title,
      content: req.body.content
    })
    .then(data => {
      if (!data == 1) {
        res.status(204).send({ error: 'Comment could not be found' });
      }else {
        res.send({ ok: 'Comment updated' });
      }
    })
    .catch(err => {
      res.send({ error: err.message });
    });
  }
};


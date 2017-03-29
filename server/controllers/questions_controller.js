const knex = require('../utils/db');
const moment = require('moment');

module.exports = {
  getAllQuestions(req, res) {
    knex('Questions').select()
    .then(data => {
      if (!data.length > 0) {
        res.status(204).send({ error: 'No questions' })
      }else {
        data.forEach(item => {
          item.createdAt = moment(item.createdAt).toString()
        })
        res.send({ ok: data })
      }
    })
    .catch(err => {
      res.status(422).send({ error: 'Cannot get questions '})
    })
  },

  getQuestion(req, res) {
    knex('Questions').where('id', req.params.id).select()
    .then(data => {
      if (!data.length > 0) {
        res.status(204).send({ error: 'Question does not exist' })
      }else {
        data[0].createdAt = moment(data[0].createdAt).toString();
        res.send({ ok: data[0] })
      }
    })
    .catch(err => {
      res.status(422).send({ error: 'Cannot get question '})
    })
  },

  saveQuestion(req, res) {
    if (!req.body.title || !req.body.content || !req.body.category) {
      res.status(422).send({ error: 'Your question must have a title, a category and some content.' })
      return;
    }
    const keywords = req.body.keywordArray.join()

    knex('Questions').insert({
      title: req.body.title,
      content: req.body.content,
      answer: null,
      category: req.body.category,
      keywords,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    .then(data => {
      if (!data[0] > 0) {
        res.status(422).send({ error: 'Question not saved' })
      }else {
        res.send({ ok: 'Question was saved' })
      }
    })
    .catch(err => {
      res.status(422).send({ error: err })
    });
  }
}
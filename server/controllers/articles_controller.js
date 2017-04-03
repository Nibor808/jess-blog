const knex = require('../utils/db');
const moment = require('moment');

module.exports = {
  getAllArticles(req, res) {
    knex('Articles').where('type', req.params.type).select()
      .then(data => {
        data.forEach((item) => {
          item.createdAt = moment(item.createdAt).toString();
        })
        res.send({ ok: data });
      })
      .catch(err => {
        res.send({ error: err });
      });
  },

  getArticle(req, res) {
    const article = {};

    knex('Articles').where('id', req.params.id).select()
      .then(data => {
        data[0].createdAt = moment(data[0].createdAt).toString();
        for (let key in data[0]) {
          if (data[0].hasOwnProperty(key)) {
            article[key] = data[0][key];
          }
        }
      })
      .then(() => {
        if (article.type === 2 || article.type === 3) {
          knex('AdditionalInfo').where('article_id', req.params.id).select('pros', 'cons', 'specs', 'answer')
            .then(data => {
              if (data[0].specs) {
                data[0].specs = JSON.parse(data[0].specs);
              }

              for (let key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                  article[key] = data[0][key];
                }
              }
            })
            .catch(err => {
              res.send({ error: err })
            });
        }
      })
      .then(() => {
        const images = [];
        knex('Images').where('article_id', req.params.id).select()
          .then(data => {
            if (data) {
              data.map(image => {
                images.push(image.file);
              })
            }
            article.images = images;
            res.send({ ok: article })
          })
          .catch(err => {
            res.send({ error: err })
          })
      })
      .catch(err => {
        res.send({ error: err });
      });
  },

  saveArticle(req, res) {
    if (!req.body.type || !req.body.title || !req.body.content || !req.body.keywordArray || !req.body.category) {
      res.send({ error: 'Missing Data' });
      return;
    }

    if (req.body.type === 1 || req.body.type === 2) {
      if (!req.body.cover_img) {
        res.send({ error: 'Missing cover image' });
        return;
      }
    }

    if (req.body.type === 2) {
      if (!req.body.pros || !req.body.cons || !req.body.specs) {
        res.send({ error: 'Missing Review Data' });
        return;
      }
    }

    const keywords = req.body.keywordArray.join()

    knex('Articles').insert({
      type: req.body.type.trim(),
      title: req.body.title.trim(),
      content: req.body.content.trim(),
      keywords: keywords,
      category: req.body.category.trim(),
      cover_img: req.body.cover_img.trim(),
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    })
      .then(data => {
        if (!data[0] > 0) {
          res.send({ error: 'Article not saved' });
        }
        const specs = JSON.stringify(req.body.specs);

        knex('AdditionalInfo').insert({
          article_id: data[0],
          pros: req.body.pros,
          cons: req.body.cons,
          specs: specs,
          answer: req.body.answer
        })
        .then(data => {
          if (!data[0] > 0) {
            res.send({ error: 'Additional Info not saved' });
          }
          res.send({ ok: 'Article saved' });
        })
        .catch(err => {
          res.send({ error: err });
        })
      })
      .catch(err => {
        res.send({ error: err });
      });
  },

   //change to update article
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
  }
}
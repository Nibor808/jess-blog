'use strict'
const knex = require('../utils/db');
const moment = require('moment');

module.exports = {

  // get all articles
  getAllArticles(req, res) {
    knex('Articles').where('preview', req.params.isPreview).select()
      .then(data => {
        data.map((item) => {
          item.createdAt = moment(item.createdAt).toString();
        });
        res.send({ ok: data });
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  },

  // get all articles of a type (post = 1, review = 2, question = 3)
  getAllArticlesOfType(req, res) {
    knex('Articles').where({ 'type': req.params.type, 'preview': false }).select()
      .then(data => {
        data.map((item) => {
          item.createdAt = moment(item.createdAt).toString();
        });
        res.send({ ok: data });
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  },

  // get an article
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
        // if it's a review(2) or a question(3) get the additional info
        if (article.type === 2 || article.type === 3) {
          knex('AdditionalInfo').where('article_id', req.params.id).select('pros', 'cons', 'specs', 'answer')
            .then(data => {
              if (data[0].specs) {
                //parse the specs as they are saved as a json string in the database
                data[0].specs = JSON.parse(data[0].specs);
              }

              for (let key in data[0]) {
                if (data[0].hasOwnProperty(key)) {
                  article[key] = data[0][key];
                }
              }
              res.send({ ok: article });
            })
            .catch(err => {
              res.send({ error: err.message });
            });
        }else {
          res.send({ ok: article });
        }
      })
      .catch(err => {
        res.send({ error: err.message });
      });
  },

  // save article
  saveArticle(req, res) {
    if (!req.body.type || !req.body.title || !req.body.content || !req.body.keywordArray.length > 0 || !req.body.category) {
      return res.send({ error: 'Missing Some Info' });
    }

    if (req.body.type === 2) {
      if (!req.body.pros || !req.body.cons || !req.body.specs) {
        return res.send({ error: 'Missing Review Info' });
      }
    }

    if (req.body.type === 1 || req.body.type === 2) {
      if (!req.body.cover_img) {
        return res.send({ error: 'Missing cover image' })
      }else if (req.body.cover_img.indexOf('.png') == -1 &&
        req.body.cover_img.indexOf('.jpg') == -1 &&
        req.body.cover_img.indexOf('.jpeg') == -1 &&
        req.body.cover_img.indexOf('.gif') == -1
        ) {
          return res.send({ error: 'Invalid cover_img' })
        }
    }

    // if post or review put in pre publish state (publish will update preview state)
    let preview;
    if (req.body.type === 1 || req.body.type === 2) {
      preview = true
    }else {
      preview = false
    }

    const keywords = req.body.keywordArray.join();

    knex('Articles').insert({
      type: req.body.type,
      title: req.body.title.trim(),
      content: req.body.content.trim(),
      keywords: keywords,
      category: req.body.category,
      cover_img: req.body.cover_img,
      preview: preview,
      createdAt: moment().format('YYYY-MM-DD HH:mm:ss')
    })
    .then(data => {
      if (!data[0] > 0) {
        return res.send({ error: 'Article not saved' });
      }
      const specsObj = {};

      if (req.body.specs) {
        req.body.specs.map((spec) => {
          specsObj[spec.key] = spec.value;
        });
      }

      knex('AdditionalInfo').insert({
        article_id: data[0],
        pros: req.body.pros,
        cons: req.body.cons,
        specs: JSON.stringify(specsObj),
        answer: req.body.answer
      })
      .then(data => {
        if (!data[0] > 0) {
          return res.send({ error: 'Additional Info not saved' });
        }
        res.send({ success: 'Article saved' });
      })
      .catch(err => {
        res.send({ error: err.message });
      });
    })
    .catch(err => {
      res.send({ error: err.message });
    });
  },

   //update article
  updateArticle(req, res) {
    if (!req.body.type || !req.body.title || !req.body.content || !req.body.keywordArray.length > 0 || !req.body.category || !req.body.cover_img) {
      return res.send({ error: 'Missing Data' });
    }

    if (req.body.type === 2) {
      if (!req.body.pros || !req.body.cons || !req.body.specs) {
        return res.send({ error: 'Missing Review Data' });
      }
    }

    const keywords = req.body.keywordArray.join();

    knex('Articles').where('id', req.params.id).update({
      type: req.body.type,
      title: req.body.title.trim(),
      content: req.body.content.trim(),
      keywords: keywords,
      category: req.body.category,
      cover_img: req.body.cover_img,
    })
    .then(data => {
      if (!data == 1) {
        res.send({ error: 'Article does not exist.' });
      }else {
        const specsObj = {};

        if (req.body.specs) {
          req.body.specs.map((spec) => {
            specsObj[spec.key] = spec.value;
          });
        }

        knex('AdditionalInfo').insert({
          article_id: data[0],
          pros: req.body.pros,
          cons: req.body.cons,
          specs: JSON.stringify(specsObj),
          answer: req.body.answer
        })
        .then(data => {
          if (!data[0] > 0) {
            return res.send({ error: 'Additional Info not updated' });
          }
          res.send({ success: 'Article updated' });
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

  publishArticle(req, res) {
    knex('Articles').where('id', req.params.id).update('preview', 0)
      .then(data => {
        if (!data == 1) {
          res.send({ error: 'Article does not exist' })
        }else {
          res.send({ success: 'Article published' })
        }
      })
      .catch(err => {
        res.send({ error: err.message })
      });
  },

  deleteArticle(req, res) {
    knex('Articles').where('id', req.params.id).del()
      .then(data => {
        if (!data == 1) {
          res.send({ error: 'Article does not exist' })
        }else {
          res.send({ success: 'Article deleted' })
        }
      })
      .catch(err => {
        res.send({ error: err.message })
      });
  }
};

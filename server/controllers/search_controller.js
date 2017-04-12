'use strict';
const knex = require('../utils/db.js');
const moment = require('moment');

module.exports = {

  // return search results
  getSearchResults(req, res) {
    if (!req.body.keywordArray.length > 0) {
      return res.send({ error: 'Please select 1 or more keywords to search for.' })
    }

    const articles = [];
    let merged;

    // use a promise to avoid repetative res.sends
    const result = new Promise((resolve, reject) => {
      req.body.keywordArray.map(keyword => {
        knex('Articles').where('keywords', 'like', `%${keyword}%`)
          .then(data => {
            if (!data.length > 0) {
              res.send({ error: 'No articles matching your search' })
            }else {
              articles.push(data)
              // concat and flatten the articles array
              // .apply flattens one level of array and turns the articles array into a list of values to concat to merge
              merged = [].concat.apply([], articles)
              resolve()
            }
          })
          .catch(err => {
            res.send({ error: err.message })
            reject()
          });
      })
    })
    .catch(err => {
      console.log(err.message)
    })

    result.then(() => res.send({ ok: merged }))

  }
}

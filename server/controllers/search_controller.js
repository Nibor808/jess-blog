'use strict';
const knex = require('../utils/db.js');
const moment = require('moment');

module.exports = {

  // return search results
  getSearchResults(req, res) {
    console.log('here', req.body)
    if (!req.body.keywordArray.length > 0) {
      return res.send({ error: 'Please select 1 or more keywords to search for.' })
    }

    const articles = [];
    let merged;

    // use a promise to avoid repetative res.sends
    const result = new Promise((resolve, reject) => {
      req.body.keywordArray.map(keyword => {
        knex('Articles').where('title', 'like', `%${keyword}%`)
          .then(data => {
            if (!data.length) {
              res.send({ error: 'No articles matching your search' })
            }else {
              data.map((item) => {
                item.createdAt = moment(item.createdAt).toString();
              });
              articles.push(data)
              /*
              - concat and flatten the articles array
              - .apply flattens one level of array and turns the articles array into a list of values to concat to merge
              - we pass the empty array as the this binding to insulate the global object from side effects
              - and make sure that any unexpected usage of 'this' only refers to the empty object
              */
              merged = [].concat.apply([], articles)
              resolve()
            }
          })
          .catch(err => {
            res.send({ error: err.message })
          });
      })
    })
    .catch(err => {
      console.log(err.message)
      reject()
    })

    result.then(() => res.send({ ok: merged }))

  }
}
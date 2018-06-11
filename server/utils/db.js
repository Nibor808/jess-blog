'use strict'
const knex = require('knex');
const config = require('../config/knexfile');

if (process.env.NODE_ENV !== 'production') {
  console.log('ENV', process.env.NODE_ENV);
}

module.exports = knex(config);

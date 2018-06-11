const { DB_HOST, DB_NAME, DB_USER, DB_PASS } = require('./db_config.json');

module.exports = {
  client: 'mysql',
  connection: {
    host: process.env.DB_HOST || DB_HOST,
    user: process.env.DB_USER || DB_USER,
    password: process.env.DB_PASS || DB_PASS,
    database: process.env.DB_NAME || DB_NAME
  }
};

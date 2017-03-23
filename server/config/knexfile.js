const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = require('./config.json');

module.exports = {
  client: 'mysql',
  connection: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME
  }
};

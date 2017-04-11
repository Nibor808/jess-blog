'use strict';
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('short'));
app.use(cors());

routes(app);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

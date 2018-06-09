// copy to dist
const express = require('express');
const path = require('path');
import logger from './utils/logger';

global.logger = logger;

const app = express();
app.use(morgan('dev'));

app.use(express.static(__dirname));

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening');
});

const path = require('path');
const morgan = require('morgan');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post_routes');
const userRoutes = require('./routes/user_routes');
const reviewRoutes = require('./routes/review_routes');
const passport = require('passport');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send({ post: 'data' });
});

postRoutes(app);
userRoutes(app);
reviewRoutes(app);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
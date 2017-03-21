const path = require('path');
const morgan = require('morgan');
const express = require('express');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const postRoutes = require('./routes/post_routes');
const userRoutes = require('./routes/user_routes');
const reviewRoutes = require('./routes/review_routes');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('short'));

postRoutes(app);
userRoutes(app);
reviewRoutes(app);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
// only used to copy to dist
const express = require('express');

const app = express();

app.use(express.static(__dirname));

app.get('*', function(req, res) {
  res.render(`${__dirname}/index.html`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening')
});
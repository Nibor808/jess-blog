// copy to dist
const express = require('express');
const path = require('path');

const app = express();

app.set('view options', { layout: false });
app.use(express.static(__dirname));

app.get('*', (req, res) => {
  res.render(path.resolve(__dirname, 'index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening');
});
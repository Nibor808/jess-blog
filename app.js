import express from 'express';
import path from 'path';
import env from 'node-env-file';

env('./.env', { logger: console });

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Listening');
});
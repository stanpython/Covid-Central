const express = require('express');

const app = express();
const fetch = require('node-fetch');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app.listen(3000, () => console.log(`Listening on port ${port}`));

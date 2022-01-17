'use strict';
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.listen(3000, () => {
  console.log('Server has been started');
});

process.on('hello', () => {
  console.log('Hello, friend!');
});

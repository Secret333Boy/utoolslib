'use strict';
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ data: 'Hello world!' });
});

app.listen(3000, () => {
  console.log('Server has been started');
});

process.on('message', (message) => {
  if (message === 'hello') console.log('Hello, friend!');
});

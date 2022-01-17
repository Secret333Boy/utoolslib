'use strict';

const fetch = require('../../../src/tools/fetch/fetch.js');

setInterval(async () => {
  try {
    await fetch('http://localhost:3000');
    console.log('Server is UP');
  } catch (e) {
    console.log('Server is DOWN');
  }
}, 2000);

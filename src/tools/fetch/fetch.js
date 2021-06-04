'use strict';
const http = require('node:https');

const fetch = async url => new Promise((resolve, reject) => {
  http.get(url, res => {
    const statusCode = res.statusCode;

    if (statusCode !== 200) {
      console.error(`Failed to load: ${url}`);
      res.resume();
      reject();
    } else {
      res.setEncoding('utf8');
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        resolve(JSON.parse(responseData));
      });
    }
  });
});

module.exports = fetch;

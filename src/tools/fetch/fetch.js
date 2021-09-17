'use strict';
const http = require('https');

const fetch = async (url) =>
  new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        const statusCode = res.statusCode;

        if (statusCode !== 200) {
          console.error(`Failed to load: ${url}`);
          res.resume();
          reject();
        } else {
          res.setEncoding('utf8');
          let responseData = '';
          res.on('data', (chunk) => (responseData += chunk));
          res.on('end', () => {
            try {
              const parsedData = JSON.parse(responseData);
              resolve(parsedData);
            } catch (err) {
              console.error(`Failed to parse data: ${err.message}`);
              reject();
            }
          });
        }
      })
      .on('error', (err) => {
        console.error(`Get request failed: ${err.message}`);
        reject();
      });
  });

module.exports = fetch;

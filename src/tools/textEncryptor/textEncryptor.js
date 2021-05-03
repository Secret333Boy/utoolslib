'use strict';
const fs = require('fs');

class TextEncryptor {
  constructor(seed) {
    this._seed = seed;
    this._enternalSeed = 99241492;
  }

  _modifyCode(code) {
    return code ^ (this._seed ^ 1 ^ this._enternalSeed);
  }

  encryptFile(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) throw err;
      const newData = [];
      for (let i = 0; i < data.length; i++) {
        let code = data[i].charCodeAt(0);
        code = this._modifyCode(code);
        newData.push(String.fromCharCode(code));
      }
      fs.writeFileSync(path, newData.join(''));
    });
  }

  decryptFile(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) throw err;
      const newData = [];
      for (let i = 0; i < data.length; i++) {
        let code = data[i].charCodeAt(0);
        code = this._modifyCode(code);
        newData.push(String.fromCharCode(code));
      }
      fs.writeFileSync(path, newData.join(''));
    });
  }
}

module.exports = TextEncryptor;

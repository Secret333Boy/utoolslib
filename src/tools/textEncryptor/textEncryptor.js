'use strict';
const fs = require('fs');

class TextEncryptor {
  constructor(seed) {
    if (typeof(seed) !== 'number')
      throw new Error(
        `Seed is expected to be a number. Its type is ${typeof seed}`
      );
    Object.defineProperties(this, {
      _seed: {
        value: seed,
      },
      _enternalSeed: {
        value: 99241492,
      },
    });
    Object.freeze(this);
  }

  _modifyCode(code) {
    return code ^ (this._seed ^ 1 ^ this._enternalSeed);
  }

  encryptString(data) {
    const newData = [];
    for (let i = 0; i < data.length; i++) {
      let code = data[i].charCodeAt(0);
      code = this._modifyCode(code);
      newData.push(String.fromCharCode(code));
    }
    return newData.join('');
  }

  encryptFile(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) throw err;
      fs.writeFileSync(path, this.encryptString(data));
    });
  }
}

module.exports = TextEncryptor;

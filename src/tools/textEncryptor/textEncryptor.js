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
      _internalSeed: {
        value: 99241492,
      },
    });
    Object.freeze(this);
  }

  _modifyCode(code) {
    return code ^ (this._seed ^ 1 ^ this._internalSeed);
  }

  encryptString(data) {
    // eslint-disable-next-line eqeqeq
    if (typeof data !== 'string' || !data) {
      throw new Error('There is no data to encrypt!');
    }
    const newData = data.split('').map(char => {
      const code = this._modifyCode(char.charCodeAt(0));
      return String.fromCharCode(code);
    });
    return newData;
  }

  encryptFile(path) {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) throw err;
      try {
        fs.writeFileSync(path, this.encryptString(data));
      } catch (error) {
        console.error(`Failed to write the file: ${path}`);
      }
    });
  }
}

module.exports = TextEncryptor;

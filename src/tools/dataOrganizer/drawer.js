'use strict';
const fs = require('fs');

class Drawer {
  constructor(obj, mode) {
    this.mode = mode;
    this.stringImage = this._getImage(obj);
  }

  // _getImage(obj) {

  // }

  draw(path) {
    try {
      fs.writeFileSync(path, this.stringImage);
    } catch (e) {
      console.log(`Failed to write: ${e}`);
    }
  }
}

module.exports = Drawer;

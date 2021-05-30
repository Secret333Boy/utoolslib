'use strict';
const fs = require('fs');

class Drawer {
  static SYMBOLS = {
    corners: { topLeft: '┌', topRight: '┐', bottomLeft: '└', bottomRight: '┘' },
    lines: { horizontal: '―', vertical: '│' },
    ternaryLines = { top: '┬', left: '├', right: '┤', bottom: '┴' },
  };
  constructor(obj, mode) {
    this.mode = mode;
    this.stringImage = this._getImage(obj);
  }

  _getImage(obj) {
    if (mode === 'table' || !mode) {

    }
  }

  draw(path) {
    try {
      fs.writeFileSync(path, this.stringImage);
    } catch (e) {
      console.log(`Failed to write: ${e}`);
    }
  }
}

module.exports = Drawer;

'use strict';
const fs = require('fs');
const Graph = require('./graph.js');

class Drawer {
  constructor(obj) {
    if (Graph.isGraph(obj)) {
      this._mode = 'graph';
      this.stringImage = this._getImage(obj);
    }
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

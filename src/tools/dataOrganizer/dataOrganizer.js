'use strict';
const Drawer = require('./drawer');
const Table = require('../dataStructures/table.js');

class DataOrganizer {
  constructor(settings = {}) {
    this.settings = settings;
  }

  drawString(obj, path = '') {
    let mode;
    if (Table.isTable(obj)) {
      mode = 'table';
    }
    const drawer = new Drawer(obj, mode);

    if (path) {
      drawer.draw(path);
    }
    return drawer.stringImage;
  }
}

module.exports = DataOrganizer;

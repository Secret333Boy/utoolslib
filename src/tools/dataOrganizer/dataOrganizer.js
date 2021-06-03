'use strict';
const Drawer = require('./drawer');
const Table = require('../dataStructures/table.js');

class DataOrganizer {
  constructor(settings = {}) {
    this.settings = settings;
  }

  drawString(obj, path = '') {
    const mode = Table.isTable(obj) ? 'table' : '';
    const drawer = new Drawer(obj, mode);

    drawer.draw(path);
    return drawer.stringImage;
  }
}

module.exports = DataOrganizer;

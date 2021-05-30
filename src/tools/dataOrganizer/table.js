'use strict';

class Table {
  constructor(arr) {
    this.map = new Map(arr);
  }

  static isTable(obj) {
    return obj instanceof Table;
  }
}

module.exports = Table;

'use strict';

class Table {
  constructor(obj) {
    this.obj = obj;
    this.rawsNum = Object.keys(obj).length;
    this.colsNum = Object.keys(obj).reduce((acc, key) =>
      (Array.isArray(obj[key]) ? obj[key] > acc : acc)
    );
  }

  static isTable(obj) {
    return obj instanceof Table;
  }
}

module.exports = Table;

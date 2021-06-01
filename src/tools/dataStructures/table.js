'use strict';

class Table {
  constructor(obj) {
    this.obj = obj;
    this.rawsNum = Object.keys(obj).length;
    this.colsNum = Object.keys(obj).reduce((acc, key) => {
      const el = obj[key];

      if (Array.isArray(el) && el.length + 1 > acc) {
        return el.length + 1;
      } else {
        return acc;
      }
    }, 2);
  }
  static isTable(obj) {
    return obj instanceof Table;
  }
}

module.exports = Table;

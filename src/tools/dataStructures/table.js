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
    const keysLength = Object.keys(obj).map(key => String(key).length);
    const valuesLength = Object.values(obj).map(value => {
      let res = 0;
      if (Array.isArray(value)) {
        res = Math.max(...value.map(el => String(el).length));
      } else {
        res = String(value).length;
      }
      return res;
    });
    this.maxValueLength = Math.max(...keysLength.concat(valuesLength));
  }
  static isTable(obj) {
    return obj instanceof Table;
  }
}

module.exports = Table;

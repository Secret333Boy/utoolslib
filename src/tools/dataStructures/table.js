'use strict';

class Table {
  constructor(obj) {
    this.obj = obj;
  }
  static isTable(obj) {
    return obj instanceof Table;
  }

  get rowsNum() {
    return Object.keys(this.obj).length;
  }

  get colsNum() {
    return Object.keys(this.obj).reduce((acc, key) => {
      const el = this.obj[key];

      if (Array.isArray(el) && el.length + 1 > acc) {
        return el.length + 1;
      }
      return acc;
    }, 2);
  }

  get maxValueLength() {
    const keysLength = Object.keys(this.obj).map(key => String(key).length);
    const valuesLength = Object.values(this.obj).map(value => {
      let res = 0;
      if (Array.isArray(value)) {
        res = Math.max(...value.map(el => String(el).length));
      } else {
        res = String(value).length;
      }
      return res;
    });
    return Math.max(...keysLength.concat(valuesLength));
  }
}

module.exports = Table;

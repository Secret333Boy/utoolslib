'use strict';

class Table {
  constructor(arr) {
    this.map = new Map(arr);
    this.rawsNum = this.map.entries.length;
    this.colsNum = this._calcCols(arr);
  }

  static isTable(obj) {
    return obj instanceof Table;
  }

  _calcCols(arr) {
    let res = 2;
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i])) {
        res++;
        const tempArr = arr[i];
        arr = arr.slice(0, i);
        arr = arr.concat(tempArr);
        i--;
      }
    }
    return res;
  }
}

module.exports = Table;

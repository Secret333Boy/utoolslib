'use strict';

class PatternCollection {
  constructor(dict) {
    Object.defineProperty(this, 'dictionary', {
      enumerable: false,
      writable: true,
      configurable: true,
      value: dict,
    });
  }

  add(inExpr, outExpr) {
    if (!(outExpr in this)) {
      this[outExpr] = [inExpr];
      this[outExpr].frequency = this.frequency(outExpr);
      return this;
    }

    if (!this[outExpr].includes(inExpr)) {
      this[outExpr].push(inExpr);
    }
  }

  frequency(expr, dict = this.dictionary) {
    const occurs = dict.words.reduce(
      (acc, w) => acc + (w.indexOf(expr) >= 0 ? 1 : 0),
      0
    );
    return occurs / dict.length;
  }
}

module.exports = PatternCollection;

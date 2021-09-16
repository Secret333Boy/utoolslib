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

  frequency(expr, words = this.dictionary.words) {
    const occurAmount = words.reduce(
      (acc, w) => acc + (w.indexOf(expr) >= 0 ? 1 : 0),
      0
    );
    return occurAmount / words.length;
  }

  clearFrequencies() {
    Object.values(this).forEach((expr) => (expr.frequency = 0));
  }

  updateFrequencies(words = this.dictionary.words) {
    Object.entries(this).forEach((entry) => {
      entry[1].frequency = this.frequency(entry[0], words);
    });
  }
}

module.exports = PatternCollection;

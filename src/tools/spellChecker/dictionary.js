'use strict';

class Dictionary {
  constructor(words = []) {
    this._words = words.sort();
    this._length = words.length;
    //this[Symbol.iterator] = this._words[Symbol.iterator];
  }

  push(words) {
    this._words = words.concat(this._words);
    this._length += words.length;
    this._words.sort();
    return this;
  }

  clear() {
    const words = this._words;
    this._words = [];
    this._length = 0;
    return words;
  }

  get words() {
    return this._words;
  }

  get length() {
    return this._length;
  }
}

module.exports = Dictionary;

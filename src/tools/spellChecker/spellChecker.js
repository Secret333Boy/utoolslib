'use strict';

class Dictionary {
  constructor(words = []) {
    this._words = words.sort();
    this._length = words.length;
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

class spellChecker {
  constructor(words = []) {
    this.dictionary = new Dictionary(words);
  }
}

module.exports = spellChecker;

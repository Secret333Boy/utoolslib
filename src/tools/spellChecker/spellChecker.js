'use strict';
class Dictionary {
  constructor(words = []) {
    this._words = words.sort();
  }

  push(words) {
    this._words = words.concat(this._words);
    this._words.sort();
    return this;
  }

  clear() {
    const words = this._words;
    this._words = [];
    return words;
  }

  get words() {
    return this._words;
  }
}

class spellChecker {
  constructor(words = []) {
    this.dictionary = new Dictionary(words);
  }
}

module.exports = spellChecker;

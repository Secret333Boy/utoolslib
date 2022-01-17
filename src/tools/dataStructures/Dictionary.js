'use strict';

class Dictionary {
  constructor(words = []) {
    this.words = words.sort();
    this.length = words.length;
  }

  push(words) {
    this.words = words.concat(this.words).sort();
    this.length += words.length;
    return this;
  }

  clear() {
    const words = this.words;
    this.words = [];
    this.length = 0;
    return words;
  }
}

module.exports = Dictionary;

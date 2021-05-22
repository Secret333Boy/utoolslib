'use strict';

const Dictionary = require('./dictionary.js');
const Searcher = require('./searcher.js');
const Worder = require('./worder.js');
const Mapper = require('./mapper.js');
const PatternCollection = require('./patternCollection.js');
const proxify = require('./proxify.js');
const fs = require('fs');

class SpellChecker {
  constructor() {
    this.searcher = new Searcher();
    this.replaceMap = new Map();
    this.maxDiff = 5;
  }

  createDictionary(path) {
    if ('dictionary' in this) return false;

    const data = fs.readFileSync(path, 'utf8');
    const words = data.match(Worder.WORD_REGEXP).map((w) => w.toLowerCase());
    this.dictionary = new Dictionary(words);
    this.patterns = new PatternCollection(this.dictionary);

    const push = (words) => {
      this.replaceMap = Mapper.update(this, words);
      this.patterns.updateFrequencies(this.dictionary.words.concat(words));
    };
    const clear = () => {
      this.replaceMap.clear();
      this.patterns.clearFrequencies();
    };
    this.dictionary = proxify(this.dictionary, { push, clear });

    return true;
  }

  extendDictionary(path) {
    if (!('dictionary' in this)) return false;

    const data = fs.readFileSync(path, 'utf8');
    const words = data.match(Worder.WORD_REGEXP).map((w) => w.toLowerCase());
    this.dictionary.push(words);

    return true;
  }

  addPattern(inExpr, outExpr) {
    if (typeof inExpr !== 'string' || typeof outExpr !== 'string') return false;
    this.patterns.add(inExpr, outExpr);
  }

  check(text, maxDiff = this.maxDiff) {
    if (!('dictionary' in this)) return text;

    const dictWords = this.dictionary.words;
    const inWords = Worder.parse(text).map((w) => w.toLowerCase());

    for (const inWord of inWords) {
      if (this.replaceMap.has(inWord)) continue;
      if (dictWords.includes(inWord)) continue;

      this.replaceMap = Mapper.setMatch(
        inWord,
        this.replaceMap,
        dictWords,
        maxDiff,
        this
      );
    }

    const res = Worder.replace(text, this.replaceMap);
    this.replaceMap = Mapper.lowCase(this.replaceMap);
    return res;
  }
}

module.exports = SpellChecker;

'use strict';

const Dictionary = require('../dataStructures/dictionary.js');
const Searcher = require('./searcher.js');
const Worder = require('./worder.js');
const Mapper = require('./mapper.js');
const PatternCollection = require('./patternCollection.js');
const proxify = require('../proxify/proxify.js');
const fs = require('fs');

class SpellChecker {
  static defaultMaxDiff = 3;

  constructor() {
    this.searcher = new Searcher();
    this.replaceMap = new Map();
  }

  createDictionary(path) {
    if ('dictionary' in this) return false;

    let data;
    try {
      data = fs.readFileSync(path, 'utf8');
    } catch (err) {
      console.log(`Can't read file: ${path}`);
      return false;
    }

    const words = data.match(Worder.WORD_REGEXP).map(w => w.toLowerCase());
    this.dictionary = new Dictionary(words);
    this.patterns = new PatternCollection(this.dictionary);

    const push = words => {
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

  setMaxDiff(val) {
    if (!Number.isSafeInteger(val) || val <= 0) {
      console.log(`Can't set maxDiff: illegal input - ${val}`);
      return false;
    }

    this.maxDiff = val;
    return true;
  }

  extendDictionary(path) {
    if (!('dictionary' in this)) {
      console.log('Can`t extend dictionary: no dictionary in checker');
      return false;
    }

    let data;
    try {
      data = fs.readFileSync(path, 'utf8');
    } catch (err) {
      console.log(`Can't read file: ${path}`);
      return false;
    }

    const words = data.match(Worder.WORD_REGEXP).map(w => w.toLowerCase());
    this.dictionary.push(words);

    return true;
  }

  addPattern(inExpr, outExpr) {
    if (typeof inExpr !== 'string' || typeof outExpr !== 'string') {
      console.log(
        'Pattern adding failed: both arguments must be strings, they are: ' +
          `${typeof inExpr} and ${typeof outExpr}`
      );
      return false;
    }

    this.patterns.add(inExpr, outExpr);
  }

  check(text, maxDiff = this.maxDiff || SpellChecker.defaultMaxDiff) {
    if (!('dictionary' in this)) {
      console.log('Check failed: no dictionary in checker');
      return false;
    }
    if (typeof text !== 'string' || !text) {
      console.log('Check failed: invalid input text');
      return false;
    }

    const dictWords = this.dictionary.words;
    const inWords = Worder.parse(text).map(w => w.toLowerCase());

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

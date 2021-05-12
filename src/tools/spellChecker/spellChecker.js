'use strict';

const Dictionary = require('./dictionary.js');
const Searcher = require('./searcher.js');
const PatternCollection = require('./patternCollection.js');
const proxify = require('./proxify.js');
const fs = require('fs');

const WORD_REGEXP = /\b[a-z]+\b/gi;

class SpellChecker {
  constructor() {
    this.searcher = new Searcher();
    this.replaceMap = new Map();
    this.maxDiff = 5;
  }

  createDictionary(path) {
    if ('dictionary' in this) return false;

    const data = fs.readFileSync(path, 'utf8');
    const words = data.match(WORD_REGEXP).map((w) => w.toLowerCase());
    this.dictionary = new Dictionary(words);
    this.patterns = new PatternCollection(this.dictionary);

    const push = this._updateMap.bind(this);
    const clear = this._clearMap.bind(this);
    this.dictionary = proxify(this.dictionary, { push, clear });

    return true;
  }

  extendDictionary(path) {
    if (!('dictionary' in this)) return false;

    const data = fs.readFileSync(path, 'utf8');
    const words = data.match(WORD_REGEXP).map((w) => w.toLowerCase());
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
    const inWords = this._parseWords(text).map((w) => w.toLowerCase());

    for (const inWord of inWords) {
      if (this.replaceMap.has(inWord.toLowerCase())) continue;
      if (dictWords.includes(inWord.toLowerCase())) continue;

      this._setMatch(inWord, this.replaceMap, dictWords, maxDiff);
    }

    const res = this._replaceWords(text, this.replaceMap);
    this._lowCaseMap();
    return res;
  }

  _parseWords(text) {
    const words = text.match(WORD_REGEXP);
    return words;
  }

  _replaceWords(text, replaceMap) {
    let res = text;
    for (const entry of replaceMap) {
      const regExp = new RegExp(`\\b${entry[0]}\\b`, 'gi');
      const matches = text.match(regExp);
      if (matches !== null) {
        res = matches.reduce((acc, match) => {
          const newWord = this._capitalize(match, entry[1]);
          const mRegExp = new RegExp(`\\b${match}\\b`);
          return acc.replace(mRegExp, newWord);
        }, res);
      }
    }
    return res;
  }

  _capitalize(w1, w2) {
    let tempWord = w2;
    if (w1[0] === w1[0].toUpperCase()) {
      tempWord = w2[0].toUpperCase() + w2.substring(1);
    }
    return tempWord;
  }

  _clearMap() {
    this.replaceMap.clear();
  }

  _lowCaseMap() {
    for (const entry of this.replaceMap.entries()) {
      const newEntry = entry.map((el) => el.toLowerCase());
      this.replaceMap.set(...newEntry);
    }
  }

  _updateMap(words) {
    if (!('dictionary' in this)) return;
    const allWords = this.dictionary.words.concat(words);
    const tempMap = new Map();

    for (const key of this.replaceMap.keys()) {
      if (words.includes(key)) continue;

      this._setMatch(key, tempMap, allWords, this.maxDiff);
    }

    this.replaceMap = tempMap;
  }

  _setMatch(key, map, words, diff) {
    let [matchFound, match] = this.searcher.oneEditSearch(key, words);

    if (!matchFound) {
      [matchFound, match] = this.searcher.linearSearch(key, words, diff);
    }

    if (matchFound) {
      map.set(key, match);
    }
  }
}

module.exports = SpellChecker;

'use strict';

const Dictionary = require('./dictionary.js');
const Searcher = require('./searcher.js');
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

    const push = this.updateMap.bind(this);
    const clear = this.clearMap.bind(this);
    this.dictionary = this._proxify(this.dictionary, { push, clear });

    return true;
  }

  extendDictionary(path) {
    if (!('dictionary' in this)) return false;

    const data = fs.readFileSync(path, 'utf8');
    const words = data.match(WORD_REGEXP).map((w) => w.toLowerCase());
    this.dictionary.push(words);

    return true;
  }

  check(text, maxDiff = this.maxDiff) {
    if (!('dictionary' in this)) return text;

    const dictWords = this.dictionary.words;
    const inWords = this._parseWords(text).map((w) => w.toLowerCase());

    for (const inWord of inWords) {
      if (this.replaceMap.has(inWord)) continue;

      if (!dictWords.includes(inWord.toLowerCase())) {
        let [matchFound, outWord] = this.searcher.oneEditSearch(
          inWord,
          dictWords
        );

        if (!matchFound) {
          [matchFound, outWord] = this.searcher.linearSearch(
            inWord,
            dictWords,
            maxDiff
          );
        }

        if (matchFound) {
          this.replaceMap.set(inWord, outWord);
        }
      }
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

  _proxify(obj, methodMixins) {
    const handler = {
      get(target, prop) {
        if (prop in methodMixins) {
          return (...args) => {
            methodMixins[prop](...args);
            return target[prop](...args);
          };
        }

        return target[prop];
      },
    };

    return new Proxy(obj, handler);
  }

  clearMap() {
    this.replaceMap.clear();
  }

  _lowCaseMap() {
    for (const entry of this.replaceMap.entries()) {
      const newEntry = entry.map((el) => el.toLowerCase());
      this.replaceMap.set(...newEntry);
    }
  }

  updateMap(words) {
    if (!('dictionary' in this)) return;
    const allWords = this.dictionary.words.concat(words);
    const tempMap = new Map();

    for (const key of this.replaceMap.keys()) {
      if (words.includes(key)) continue;

      let [matchFound, newVal] = this.searcher.oneEditSearch(key, allWords);
      if (!matchFound) {
        [matchFound, newVal] = this.searcher.linearSearch(
          key,
          allWords,
          this.maxDiff
        );
      }

      if (matchFound) {
        tempMap.set(key, newVal);
      }
    }

    this.replaceMap = tempMap;
  }
}

module.exports = SpellChecker;

'use strict';

const Dictionary = require('./dictionary.js');
const Searcher = require('./searcher.js');
const fs = require('fs');

const WORD_REGEXP = /\b[a-z]+\b/gi;

class SpellChecker {
  constructor() {
    this.searcher = new Searcher();
  }

  createDictionary(path) {
    const data = fs.readFileSync(path, 'utf8');
    const words = data.match(WORD_REGEXP).map((w) => w.toLowerCase());
    this.dictionary = new Dictionary(words);
  }

  check(text, maxDiff) {
    if (this.dictionary === undefined) return text;

    const dictWords = this.dictionary.words;
    const inWords = this._parseWords(text);
    const replaceMap = new Map();

    for (const inWord of inWords) {
      if (replaceMap.has(inWord)) continue;

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
          replaceMap.set(inWord, this._capitalize(inWord, outWord));
        }
      }
    }

    return this._replaceWords(text, replaceMap);
  }

  _parseWords(text) {
    const words = text.match(WORD_REGEXP);
    return words;
  }

  _replaceWords(text, replaceMap) {
    let res = text;
    for (const entry of replaceMap) {
      const regExp = new RegExp(`\\b${entry[0]}\\b`, 'gi');
      res = res.replace(regExp, entry[1]);
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
}

module.exports = SpellChecker;

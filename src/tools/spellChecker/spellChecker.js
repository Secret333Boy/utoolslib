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

class SpellChecker {
  constructor(words = []) {
    this.dictionary = new Dictionary(words);
  }

  check(text, maxDiff) {
    const dictWords = this.dictionary.words;
    const inWords = this._parseWords(text);
    const changeMap = new Map();

    for (const inWord of inWords) {
      if (changeMap.has(inWord)) continue;

      if (!dictWords.includes(inWord)) {
        let minDiff;
        let matchFound = false;
        let outWord;

        for (const dictWord of dictWords) {
          const diff = this._calcDiff(inWord, dictWord);

          if (diff >= inWord.length) continue;
          if (diff > maxDiff) continue;
          if (minDiff === undefined) minDiff = diff;

          if (diff <= maxDiff && diff <= minDiff) {
            matchFound = true;
            minDiff = diff;
            outWord = dictWord;
          }
        }

        if (matchFound) {
          changeMap.set(inWord, outWord);
        }
      }
    }

    let res = text;
    for (const entry of changeMap) {
      const regExp = new RegExp(entry[0], 'gi');
      res = res.replace(regExp, entry[1]);
    }
    return res;
  }

  _parseWords(text) {
    const WORD_REGEX = /[a-z]+/gi;
    const words = text.match(WORD_REGEX);
    return words;
  }

  _calcDiff(word1, word2) {
    const arr1 = word1.split('');
    const arr2 = word2.split('');
    const minLength = Math.min(arr1.length, arr2.length);
    const maxLength = Math.max(arr1.length, arr2.length);
    let diff = 0;

    for (let i = 0; i < minLength; i++) {
      if (!arr2.includes(arr1[i])) {
        diff++;
        continue;
      }
      arr2.splice(arr2.indexOf(arr1[i]), 1);
    }

    diff += maxLength - minLength;
    return diff;
  }
}

module.exports = SpellChecker;

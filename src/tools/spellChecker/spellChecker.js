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
    const replaceMap = new Map();

    for (const inWord of inWords) {
      if (replaceMap.has(inWord.toLowerCase())) continue;

      if (!dictWords.includes(inWord.toLowerCase())) {
        let minDiff;
        let maxSame;
        let matchFound = false;
        let outWord;

        for (const dictWord of dictWords) {
          const diff = this._calcDiff(inWord, dictWord);
          const same = this._calcSame(inWord, dictWord);

          if (diff >= inWord.length) continue;
          if (diff > maxDiff) continue;
          if (minDiff === undefined) {
            minDiff = diff;
            maxSame = same;
          }

          if (diff <= maxDiff && diff <= minDiff && same >= maxSame) {
            matchFound = true;
            minDiff = diff;
            maxSame = same;
            outWord = dictWord;
          }
        }

        if (matchFound) {
          if (inWord[0] === inWord[0].toUpperCase()) {
            outWord = outWord[0].toUpperCase() + outWord.substring(1);
          }
          replaceMap.set(inWord, outWord);
        }
      }
    }

    return this._replaceWords(text, replaceMap);
  }

  _parseWords(text) {
    const WORD_REGEX = /[a-z]+/gi;
    const words = text.match(WORD_REGEX);
    return words;
  }

  _calcDiff(w1, w2) {
    const [short, long] = [w1, w2]
      .sort((w1, w2) => w1.length - w2.length)
      .map((el) => el.toLowerCase().split(''));

    let diff = long.length - short.length;
    diff += short.reduce((acc, val) => {
      if (!long.includes(val)) return acc + 1;

      long.splice(long.indexOf(val), 1);
      return acc;
    }, 0);

    return diff;
  }

  _calcSame(w1, w2) {
    const [arr1, arr2] = [w1, w2].map((el) => el.toLowerCase().split(''));
    let same = 0;
    let index2 = 0;

    for (let i = 0; i < arr1.length; i++) {
      if (index2 >= arr2.length - 1) break;
      for (let j = index2; j < arr2.length; j++) {
        if (arr1[i] === arr2[j]) {
          same++;
          index2 = j;
          break;
        }
      }
    }

    return same;
  }

  _replaceWords(text, replaceMap) {
    let res = text;
    for (const entry of replaceMap) {
      const regExp = new RegExp(`\\b${entry[0]}\\b`, 'gi');
      res = res.replace(regExp, entry[1]);
    }
    return res;
  }
}

module.exports = SpellChecker;

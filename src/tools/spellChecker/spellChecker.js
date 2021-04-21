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

class Searcher {
  static oneEditSearch(inWord, dictWords) {
    const oneEdits = this._edits(inWord);

    for (const edit of oneEdits) {
      if (dictWords.includes(edit)) {
        return [true, edit];
      }
    }

    return [false, inWord];
  }

  static linearSearch(inWord, dictWords, maxDiff) {
    let maxSame = 0;
    let minDiff = inWord.length;
    let matchFound = false;
    let outWord = inWord;

    for (const dictWord of dictWords) {
      const same = this._calcSame(inWord, dictWord);
      const diff = this._calcDiff(inWord, dictWord);

      if (diff >= inWord.length) continue;
      if (diff > maxDiff) continue;

      if (same > maxSame && diff <= maxDiff && diff < minDiff) {
        matchFound = true;
        maxSame = same;
        minDiff = diff;
        outWord = dictWord;
      }
    }

    return [matchFound, outWord];
  }

  static _edits(word) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const splits = this._splits(word);
    const deletes = this._deletes(word, splits);
    const transposes = this._transposes(word, splits);
    const replaces = this._replaces(word, splits, letters);
    const inserts = this._inserts(word, splits, letters);

    return deletes.concat(transposes, replaces, inserts);
  }

  static _splits(word) {
    const res = [];
    for (let i = 0; i < word.length + 1; i++) {
      res.push([word.substring(0, i), word.substring(i)]);
    }
    return res;
  }

  static _deletes(word, splits) {
    const res = [];
    for (const split of splits) {
      if (split[1] !== '') {
        res.push(split[0] + split[1].substring(1));
      }
    }
    return res;
  }

  static _transposes(word, splits) {
    const res = [];
    for (const split of splits) {
      if (split[1].length >= 2) {
        res.push(split[0] + split[1][1] + split[1][0] + split[1].substring(2));
      }
    }
    return res;
  }

  static _replaces(word, splits, letters) {
    const res = [];
    for (const split of splits) {
      for (const letter of letters) {
        if (split[1] !== '') {
          res.push(split[0] + letter + split[1].substring(1));
        }
      }
    }
    return res;
  }

  static _inserts(word, splits, letters) {
    const res = [];
    for (const split of splits) {
      for (const letter of letters) {
        res.push(split[0] + letter + split[1]);
      }
    }
    return res;
  }

  static _calcDiff(w1, w2) {
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

  static _calcSame(w1, w2) {
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
      if (replaceMap.has(inWord)) continue;

      if (!dictWords.includes(inWord.toLowerCase())) {
        let [matchFound, outWord] = Searcher.oneEditSearch(inWord, dictWords);

        if (!matchFound) {
          [matchFound, outWord] = Searcher.linearSearch(
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
    const WORD_REGEX = /[a-z]+/gi;
    const words = text.match(WORD_REGEX);
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

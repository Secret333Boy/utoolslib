'use strict';

class Searcher {
  oneEditSearch(inWord, dictWords) {
    const oneEdits = this._edits(inWord);

    for (const edit of oneEdits) {
      if (dictWords.includes(edit)) {
        return [true, edit];
      }
    }

    return [false, inWord];
  }

  linearSearch(inWord, dictWords, maxDiff) {
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

  _edits(word) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const splits = this._splits(word);
    const deletes = this._deletes(word, splits);
    const transposes = this._transposes(word, splits);
    const replaces = this._replaces(word, splits, letters);
    const inserts = this._inserts(word, splits, letters);

    return deletes.concat(transposes, replaces, inserts);
  }

  _splits(word) {
    const res = [];
    for (let i = 0; i < word.length + 1; i++) {
      res.push([word.substring(0, i), word.substring(i)]);
    }
    return res;
  }

  _deletes(word, splits) {
    const res = [];
    for (const split of splits) {
      if (split[1] !== '') {
        res.push(split[0] + split[1].substring(1));
      }
    }
    return res;
  }

  _transposes(word, splits) {
    const res = [];
    for (const split of splits) {
      if (split[1].length >= 2) {
        res.push(split[0] + split[1][1] + split[1][0] + split[1].substring(2));
      }
    }
    return res;
  }

  _replaces(word, splits, letters) {
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

  _inserts(word, splits, letters) {
    const res = [];
    for (const split of splits) {
      for (const letter of letters) {
        res.push(split[0] + letter + split[1]);
      }
    }
    return res;
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
}

module.exports = Searcher;

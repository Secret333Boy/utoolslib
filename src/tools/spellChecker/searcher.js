'use strict';

class Searcher {
  patternSearch(inWord, dictWords, patterns, maxDiff) {
    const variants = this._patternedVariants(inWord, patterns);
    let minDiff = maxDiff;

    const reducer = (res, w) => {
      if (!dictWords.includes(w)) return res;

      if (this._calcDiff(inWord, w) <= minDiff) {
        minDiff = this._calcDiff(inWord, w);
        return w;
      }
    };

    console.log(variants);
    const outWord = variants.reduce(reducer, inWord);
    const matchFound = outWord !== inWord;
    return [matchFound, outWord];
  }

  oneEditSearch(inWord, dictWords) {
    const oneEdits = this._edits(inWord.toLowerCase());

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

  _patternedVariants(inWord, patterns) {
    const variants = [];
    for (const outExpr in patterns) {
      if (patterns[outExpr].frequency < 0.01) continue;

      const match = patterns[outExpr].find((p) => inWord.indexOf(p) >= 0);
      if (match !== undefined) {
        const mRegExp = new RegExp(match, 'gi');
        const newWords = variants.concat(
          variants.map((w) => w.replace(mRegExp, outExpr))
        );
        variants.push(...newWords, inWord.replace(mRegExp, outExpr));
      }
    }
    return variants;
  }

  _edits(word) {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const splits = this.splits(word);
    const reducer = (res, edit) =>
      res.concat(this[edit](word, splits, letters));
    const res = ['deletes', 'transposes', 'replaces', 'inserts'].reduce(
      reducer,
      []
    );
    return res;
  }

  splits(word) {
    const res = [];
    for (let i = 0; i < word.length + 1; i++) {
      res.push([word.substring(0, i), word.substring(i)]);
    }
    return res;
  }

  deletes(word, splits) {
    const res = [];
    for (const split of splits) {
      if (split[1] !== '') {
        res.push(split[0] + split[1].substring(1));
      }
    }
    return res;
  }

  transposes(word, splits) {
    const res = [];
    for (const split of splits) {
      if (split[1].length >= 2) {
        res.push(split[0] + split[1][1] + split[1][0] + split[1].substring(2));
      }
    }
    return res;
  }

  replaces(word, splits, letters) {
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

  inserts(word, splits, letters) {
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

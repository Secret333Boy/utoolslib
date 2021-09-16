'use strict';

const Worder = {
  WORD_REGEXP: /\b[a-z]+\b/gi,

  parse(text) {
    return text.match(this.WORD_REGEXP);
  },

  replace(text, replaceMap) {
    let res = text;
    for (const entry of replaceMap) {
      const regExp = new RegExp(`\\b${entry[0]}\\b`, 'gi');
      const matches = text.match(regExp);
      if (matches !== null) {
        res = matches.reduce((acc, match) => {
          const newWord = this.checkCapital(match, entry[1]);
          const mRegExp = new RegExp(`\\b${match}\\b`);
          return acc.replace(mRegExp, newWord);
        }, res);
      }
    }
    return res;
  },

  checkCapital(w1, w2) {
    let tempWord = w2;
    if (w1[0] === w1[0].toUpperCase()) {
      tempWord = w2[0].toUpperCase() + w2.substring(1);
    }
    return tempWord;
  },
};

module.exports = Worder;

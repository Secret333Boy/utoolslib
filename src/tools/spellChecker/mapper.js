'use strict';

const Mapper = {
  lowCase(map) {
    const lowMap = new Map();
    for (const entry of map.entries()) {
      const newEntry = entry.map(el => el.toLowerCase());
      lowMap.set(...newEntry);
    }
    return lowMap;
  },

  update(checker, words) {
    const allWords = checker.dictionary.words.concat(words);
    let tempMap = new Map();

    for (const key of checker.replaceMap.keys()) {
      if (words.includes(key)) continue;

      tempMap = this.setMatch(key, tempMap, allWords, checker.maxDiff, checker);
    }

    return tempMap;
  },

  setMatch(key, map, words, diff, checker) {
    const newMap = this.copy(map);
    const [matchFound, match] = checker.searcher.combinedSearch(
      key,
      words,
      diff,
      checker.patterns
    );

    if (matchFound) {
      newMap.set(key, match);
    }

    return newMap;
  },

  copy(map) {
    return new Map(map);
  },
};

module.exports = Mapper;

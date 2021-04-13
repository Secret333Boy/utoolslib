'use strict';

const fs = require('fs');
const SpellChecker = require('../../src/tools/spellChecker/spellChecker.js');

const dictPath = 'tests/spellChecker/bigDict.txt';
const textPath = 'tests/spellChecker/bigText.txt';
const wordRegex = /[a-z]+/gi;
const testDict = fs.readFileSync(dictPath, 'utf8').match(wordRegex);
const testText = fs.readFileSync(textPath, 'utf8');

const test = () => {
  const spellChecker = new SpellChecker(testDict);
  spellChecker.check(testText, 3);
};

console.time('test');

test();

console.timeEnd('test');

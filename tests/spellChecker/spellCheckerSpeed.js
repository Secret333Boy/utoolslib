'use strict';

const fs = require('fs');
const SpellChecker = require('../../src/tools/spellChecker/spellChecker.js');

const dictPath = 'tests/spellChecker/bigDict.txt';
const textPath = 'tests/spellChecker/bigText.txt';
const testText = fs.readFileSync(textPath, 'utf8');

const checker = new SpellChecker();
checker.createDictionary(dictPath);

console.time('test');

checker.check(testText, 3);

console.timeEnd('test');

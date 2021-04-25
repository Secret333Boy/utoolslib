'use strict';

const fs = require('fs');
const SpellChecker = require('../../src/tools/spellChecker/spellChecker.js');
const testRunner = require('./testRunner.js');

const dictPath = 'tests/spellChecker/dict.txt';
const wordRegex = /[a-z]+/gi;
const testDict = fs.readFileSync(dictPath, 'utf8').match(wordRegex);

const tests = {
  check: [
    [
      'This sentence should be the same on exit because ' +
        'it does not have any spelling mistakes (hopefully).',
      'Correct string',
      'This sentence should be the same on exit because ' +
        'it does not have any spelling mistakes (hopefully).',
      3,
    ],
    [
      'This sentence has some mistakes, but it should not ' +
        'be a problem. Also, here is another sentence!',
      'A few sentences with some mistakes',
      'This sentense has some mistaces, but it shud not ' +
        'be a problemm. Also, here is anoter sentenc!',
      3,
    ],
  ],
  _parseWords: [
    [
      [
        'These',
        'words',
        'will',
        'turn',
        'into',
        'an',
        'array',
        'just',
        'watch',
      ],
      'One sentence parsing',
      'These words will turn into an array, just watch.',
    ],
  ],
};

testRunner(SpellChecker, tests, testDict);

'use strict';

const assert = require('assert').strict;
const fs = require('fs');
const SpellChecker = require('../src/tools/spellChecker/spellChecker.js');

const dictPath = 'tests/spellCheckerDict.txt';
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
  _calcDiff: [
    [1, 'One letter diff', 'cherleader', 'cheerleader'],
    [0, 'Same word', 'tree', 'tree'],
    [0, 'Scrambled word', 'property', 'roptrype'],
    [0, 'Partly scrambled word', 'trespassing', 'terspassign'],
    [3, 'Three letter diff', 'asemblli', 'assembly'],
    [6, 'Longer word', 'ring', 'ringleader'],
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

testRunner: {
  const spellChecker = new SpellChecker(testDict);
  const methods = Object.getOwnPropertyNames(SpellChecker.prototype);
  let failed = 0;
  let total = 0;

  for (const method of methods) {
    if (method === 'constructor') continue;
    if (typeof spellChecker[method] !== 'function') continue;
    if (tests[method] === undefined) continue;

    for (const test of tests[method]) {
      const [expected, name, ...pars] = test;
      const result = spellChecker[method](...pars);
      try {
        total++;
        assert.strictEqual(
          result,
          expected,
          `Error in method ${method} in test "${name}"`
        );
      } catch (err) {
        failed++;
        console.log(err);
      }
    }
  }

  console.log(`Total: ${total}; Failed: ${failed}`);
}

'use strict';

const assert = require('assert').strict;
const fs = require('fs');
const SpellChecker = require('../src/tools/spellChecker/spellChecker.js');

const dictPath = 'tests/spellCheckerDict.txt';
const wordRegex = /[a-z]+/gi;
const testDict = fs.readFileSync(dictPath, 'utf8').match(wordRegex);

const tests = {};

testRunner: {
  const spellChecker = new SpellChecker(testDict);
  const methods = Object.getOwnPropertyNames(SpellChecker.prototype);

  for (const method of methods) {
    if (method === 'constructor') continue;
    if (typeof spellChecker[method] !== 'function') continue;
    if (tests[method] === undefined) continue;

    for (const test of tests[method]) {
      const [pars, expected, name] = test;
      const result = spellChecker[method](...pars);
      try {
        assert.strictEqual(
          result,
          expected,
          `Error in method ${method} in test "${name}"`
        );
      } catch (err) {
        console.log(err);
      }
    }
  }
}

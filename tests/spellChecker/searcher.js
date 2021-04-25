'use strict';

const Searcher = require('../../src/tools/spellChecker/searcher.js');
const testRunner = require('./testRunner.js');

const tests = {
  _calcDiff: [
    [1, 'One letter diff', 'cherleader', 'cheerleader'],
    [0, 'Same word', 'tree', 'tree'],
    [0, 'Scrambled word', 'property', 'roptrype'],
    [0, 'Partly scrambled word', 'trespassing', 'terspassign'],
    [2, 'Two letter diff', 'asemblli', 'assembly'],
    [6, 'Longer word', 'ring', 'ringleader'],
  ],
};

testRunner(Searcher, tests);

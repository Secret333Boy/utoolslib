'use strict';

const SpellChecker = require('../../src/tools/spellChecker/spellChecker.js');
const testRunner = require('./testRunner.js');

const emptyCheckerTests = {
  check: [
    [
      false,
      'No dictionary check',
      'This sentence should be the same on exit because ' +
        'it does not have any spelling mistakes (hopefully).',
      3,
    ],
    [
      false,
      'No dictionary test',
      'This sentense has some mistaces, but it shud not ' +
        'be a problemm. Also, here is anoter sentenc!',
    ],
  ],
  extendDictionary: [[false, 'No dictionary extension', 'some/path/here']],
};

const creationTests = {
  check: [
    [
      'This sentence should be the same on exit because ' +
        'it does not have any spelling mistakes (hopefully).',
      'Correct string',
      'This sentence should be the same on exit because ' +
        'it does not have any spelling mistakes (hopefully).',
      3,
    ],
    [false, 'Empty string', ''],
    [false, 'Not a string', 23123232n],
    [
      'This sentence has some mistakes, but it should not ' +
        'be a problem. Also, here is another sentence!',
      'A few sentences with some mistakes',
      'This sentense has some mistaces, but it shud not ' +
        'be a problemm. Also, here is anoter sentenc!',
      3,
    ],
    [
      'Sentence, sentence sentence Sentence, sentence, sentence, Sentence',
      'Capital letter preserving and multiple occurrences',
      'Sentense, sentense sentense Sentense, sebtense, septense, Sebtense',
    ],
    [
      'This sentence is for testing dictionary extend',
      'Sentence before dictionary extension',
      'Thps sentence is for testting dictionary extention',
      5,
    ],
  ],
  setMaxDiff: [
    [
      false,
      'Assigning max diff a value that is not a number',
      'this is a legal value, trust me',
    ],
    [false, 'Assigning max diff an illegal number', -0.232],
  ],
  addPattern: [
    [false, 'Not a string patterns', 121, Symbol('what is this')],
    [false, 'One of the expressions is not a string', 'this', { thus: 'thus' }],
  ],
};

const extensionTests = {
  check: [
    [
      'This sentence should be the same on exit because ' +
        'it does not have any spelling mistakes (hopefully).',
      'Correct string',
      'This sentence should be the same on exit because ' +
        'it does not have any spelling mistakes (hopefully).',
      3,
    ],
    [false, 'Empty string', ''],
    [false, 'Not a string', 23123232n],
    [
      'This sentence has some mistakes, but it should not ' +
        'be a problem. Also, here is another sentence!',
      'A few sentences with some mistakes',
      'This sentense has some mistaces, but it shud not ' +
        'be a problemm. Also, here is anoter sentenc!',
      3,
    ],
    [
      'Sentence, sentence sentence Sentence, sentence, sentence, Sentence',
      'Capital letter preserving and multiple occurrences',
      'Sentense, sentense sentense Sentense, sebtense, septense, Sebtense',
      3,
    ],
    [
      'This sentence is for testing dictionary extension',
      'Sentence after dictionary extension',
      'Thps sentence is for testting dictionary extention',
      5,
    ],
  ],
  setMaxDiff: [
    [
      false,
      'Assigning max diff a value that is not a number',
      'this is a legal value, trust me',
    ],
    [false, 'Assigning max diff an illegal number', -0.232],
  ],
  addPattern: [
    [false, 'Not a string patterns', 121, Symbol('what is this')],
    [false, 'One of the expressions is not a string', 'this', { thus: 'thus' }],
  ],
};

const checker = new SpellChecker();

console.log('Empty checker');
testRunner(checker, emptyCheckerTests);

let dictPath = 'tests/spellChecker/dict.txt';
checker.createDictionary(dictPath);
checker.setMaxDiff(3);

console.log('Spell checker creation');
testRunner(checker, creationTests);

dictPath = 'tests/spellChecker/dict1.txt';
checker.extendDictionary(dictPath);

console.log('Dictionary extension');
testRunner(checker, extensionTests);

const patternTests = {
  patternSearch: [
    [
      [true, 'dictionary'],
      'Correctly replaces taon with tion',
      'dictaonary',
      checker.dictionary.words,
      checker.maxDiff,
      checker.patterns,
    ],
    [
      [true, 'listening'],
      'Correctly replaces ind with ing',
      'listenind',
      checker.dictionary.words,
      checker.maxDiff,
      checker.patterns,
    ],
    [
      [false, 'studyinb'],
      'Does not return the word that is not in the dictionary',
      'studyinb',
      checker.dictionary.words,
      checker.maxDiff,
      checker.patterns,
    ],
  ],
};

const diffTests = {
  _calcDiff: [
    [1, 'One letter diff', 'cherleader', 'cheerleader'],
    [0, 'Same word', 'tree', 'tree'],
    [0, 'Scrambled word', 'property', 'roptrype'],
    [0, 'Partly scrambled word', 'trespassing', 'terspassign'],
    [2, 'Two letter diff', 'asemblli', 'assembly'],
    [6, 'Longer word', 'ring', 'ringleader'],
  ],
};

const searchingTests = {
  combinedSearch: [
    [
      [true, 'hopefully'],
      'One mistake',
      'hopefuly',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
    [
      [true, 'underground'],
      'Two mistakes',
      'untergrund',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
    [
      [true, 'stipulation'],
      'Three mistakes',
      'stepeladion',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
    [
      [false, 'unknownwordxdxd'],
      'Unknown word',
      'unknownwordxdxd',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
  ],
  linearSearch: [
    [
      [true, 'hopefully'],
      'One mistake',
      'hopefuly',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
    [
      [true, 'underground'],
      'Two mistakes',
      'untergrund',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
    [
      [true, 'stipulation'],
      'Three mistakes',
      'stepeladion',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
    [
      [false, 'unknownwordxdxd'],
      'Unknown word',
      'unknownwordxdxd',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
  ],
  oneEditSearch: [
    [
      [true, 'hopefully'],
      'One mistake',
      'hopefuly',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
    [
      [false, 'untergrund'],
      'Two mistakes',
      'untergrund',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
    [
      [false, 'stepeladion'],
      'Three mistakes',
      'stepeladion',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
    [
      [false, 'unknownwordxdxd'],
      'Unknown word',
      'unknownwordxdxd',
      checker.dictionary.words,
      3,
      checker.patterns,
    ],
  ],
};

console.log('Searcher tests: diff calculating');
testRunner(checker.searcher, diffTests);

console.log('Searcher tests: searching');
testRunner(checker.searcher, searchingTests);

checker.addPattern('ind', 'ing');
checker.addPattern('inb', 'ing');
checker.addPattern('taon', 'tion');
checker.addPattern('dion', 'sion');

console.log('Pattern adding and searching');
testRunner(checker.searcher, patternTests);

'use strict';

const SpellChecker = require('../../src/tools/spellChecker/spellChecker.js');
const testRunner = require('./testRunner.js');

const tests0 = {
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
    [
      'Sentence, sentence sentence Sentence, sentence, sentence, Sentence',
      'Capital letter preserving and multiple occurrences',
      'Sentense, sentense sentense Sentense, sebtense, septense, Sebtense',
      3,
    ],
    [
      'This sentence is for testing dictionary extend',
      'Sentence before dictionary extension',
      'Thps sentence is for testting dictionary extention',
      5,
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

const tests1 = {
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
};

const checker = new SpellChecker();
let dictPath = 'tests/spellChecker/dict.txt';
checker.createDictionary(dictPath);

console.log('Spell checker creation');
testRunner(checker, tests0);

dictPath = 'tests/spellChecker/dict1.txt';
checker.extendDictionary(dictPath);

console.log('Dictionary extension');
testRunner(checker, tests1);

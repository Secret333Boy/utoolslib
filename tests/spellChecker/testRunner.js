'use strict';

const assert = require('assert').strict;

const testRunner = (obj, tests) => {
  const objPrototype = Object.getPrototypeOf(obj);
  const methods = Object.getOwnPropertyNames(objPrototype);
  let failed = 0;
  let total = 0;

  for (const method of methods) {
    if (method === 'constructor') continue;
    if (typeof obj[method] !== 'function') continue;
    if (tests[method] === undefined) continue;

    for (const test of tests[method]) {
      const [expected, name, ...pars] = test;
      const result = obj[method](...pars);
      try {
        total++;
        assert.deepStrictEqual(
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
};

module.exports = testRunner;

'use strict';
const assert = require('assert');
const PriorityQueue = require('../../src/tools/dataStructures/PriorityQueue.js');

console.log('Pririty queue test...');

const inData = [1, 0, 1000, 12];
const pq = new PriorityQueue(-1000, 0, true);

for (const data of inData) {
  pq.push(data, data);
}

inData.sort((a, b) => a - b);
pq.pop();

const outData = [];
for (const node of pq) {
  outData.push(node.data);
}
for (const actual of outData) {
  const expected = inData.splice(inData.indexOf(Math.min(...inData)), 1);
  console.log(actual, ...expected);
  assert.strictEqual(actual, ...expected, 'All methods should work');
}

pq.toArray();
console.log('Success!\n');

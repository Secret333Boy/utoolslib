'use strict';
const Node = require('./Node.js');
const Queue = require('./Queue.js');

class PriorityQueue extends Queue {
  constructor(data, priority = 0, inverseDirection = false) {
    super(data);
    if (this.head) this.head.priority = priority;
    this.direction = inverseDirection ? -1 : 1;
  }

  push(data, priority) {
    const node = new Node(data, priority);

    let prev = null;
    let pointer = this.head;
    while (pointer?.priority * this.direction >= priority * this.direction) {
      prev = pointer;
      pointer = pointer.nextNode;
    }

    node.nextNode = pointer;
    if (prev === null) {
      this.head = node;
      return this;
    }
    prev.nextNode = node;

    return this;
  }
}

module.exports = PriorityQueue;

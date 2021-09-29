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

    if (this.head.priority * this.direction < priority * this.direction) {
      node.nextNode = this.head;
      this.head = node;
    } else if (
      this.lastNode.priority * this.direction >
      priority * this.direction
    ) {
      this.lastNode.nextNode = node;
      this.lastNode = node;
    } else {
      let pointer = this.head;
      while (
        pointer.nextNode &&
        pointer.nextNode.priority * this.direction >= priority * this.direction
      ) {
        pointer = pointer.nextNode;
      }

      const buf = pointer.nextNode;
      pointer.nextNode = node;
      node.nextNode = buf;
    }
  }
}

module.exports = PriorityQueue;

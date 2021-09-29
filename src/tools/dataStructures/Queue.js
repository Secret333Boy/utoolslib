'use strict';

const Node = require('./Node.js');

class Queue {
  [Symbol.iterator] = () => {
    const queue = this;
    return {
      current: queue.head,
      done: false,
      next() {
        const res = {
          done: this.done,
          value: this.current,
        };
        this.current = this.current?.nextNode;
        this.done = !this.current;
        return res;
      },
    };
  };

  constructor(data = null) {
    this.head = data !== null ? new Node(data) : data;
    this.lastNode = this.head;
  }

  push(data) {
    const node = new Node(data);
    this.lastNode.nextNode = node;
    this.lastNode = node;
  }

  pop() {
    const res = this.head.data;
    this.head = this.head.nextNode;
    return res;
  }

  clear() {
    while (this.head) {
      this.pop();
    }
  }

  toArray() {
    const res = [];

    for (const data of this) {
      res.push(data);
    }
    return res;
  }

  get length() {
    return this.toArray().length;
  }
}

module.exports = Queue;

'use strict';
const Node = require('./Node.js');

class Stack {
  head = null;

  [Symbol.iterator] = () => {
    const stack = this;
    return {
      current: stack.head,
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

  constructor(data) {
    if (!data) return;
    if (Array.isArray(data)) {
      this.pushAll(data);
    } else if (typeof data !== 'object') {
      this.push(data);
    } else {
      throw new TypeError(
        'The stack constructor argument must be either array or primitive.' +
          `\nIts type: ${typeof data}`
      );
    }
  }

  push(data = null) {
    const node = new Node(data);
    if (this.head) {
      node.nextNode = this.head;
    }
    this.head = node;
    return this.head;
  }

  pop() {
    const data = this.head.data;
    const tempNode = this.head.nextNode;
    this.head.nextNode = null;
    this.head = tempNode;
    return data;
  }

  clear() {
    while (this.head) {
      this.pop();
    }
  }

  toArray() {
    const res = [];
    for (const el of this) {
      res.push(el);
    }
    return res;
  }

  pushAll(arr) {
    for (const el of arr) {
      this.push(el);
    }
  }

  static isStack(obj) {
    return obj instanceof Stack;
  }
}

module.exports = Stack;

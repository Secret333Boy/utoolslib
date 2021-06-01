'use strict';
const Node = require('./node.js');

class Stack {
  HEAD = null;
  constructor(data) {
    if (data) {
      if (Array.isArray(data)) {
        this.fromArray(data);
      } else if (typeof data !== 'object') {
        this.push(data);
      } else {
        throw new TypeError(
          'The stack constructor argument must be either array or primitive.' +
          `\nIts type: ${typeof data}`
        );
      }
    }
  }

  push(data = null) {
    const node = new Node(data);
    if (this.HEAD) {
      node.nextNode = this.HEAD;
    }
    this.HEAD = node;
    return this.HEAD;
  }

  pop() {
    const data = this.HEAD.data;
    const tempNode = this.HEAD.nextNode;
    this.HEAD.nextNode = null;
    this.HEAD = tempNode;
    return data;
  }

  forEach(callback) {
    let pointer = this.HEAD;
    while (pointer) {
      callback(pointer.data);
      pointer = this.HEAD.nextNode;
    }
  }

  clear() {
    while (this.HEAD) {
      this.pop();
    }
  }

  toArray() {
    const res = [];
    this.forEach(el => res.push(el));
    return res;
  }

  fromArray(arr) {
    arr.forEach(el => this.push(el));
  }

  static isStack(obj) {
    return obj instanceof Stack;
  }
}

module.exports = Stack;

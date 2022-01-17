'use strict';

class Node {
  constructor(data, priority = null) {
    this.data = data;
    this.prevNode = null;
    this.nextNode = null;
    this.priority = priority;
  }
}

module.exports = Node;

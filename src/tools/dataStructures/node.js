'use strict';

class Node {
  constructor(data) {
    this.data = data;
    this.prevNode = null;
    this.nextNode = null;
  }
}

module.exports = Node;

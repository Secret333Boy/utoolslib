'use strict';

class Vertex {
  constructor(data = null) {
    this.data = data;
    this.links = new Set();
  }

  linkTo(...verteces) {
    for (const item of verteces) {
      this.links.add(item);
    }
  }

  unlinkFrom(...verteces) {
    for (const item of verteces) {
      this.links.delete(item);
    }
  }

  static isVertex(obj) {
    return obj instanceof Vertex;
  }
}

module.exports = Vertex;

'use strict';

class Vertex {
  constructor(x = null, y = null, data = null) {
    this.x = x;
    this.y = y;
    this.data = data;
  }

  static isVertex(obj) {
    return obj instanceof Vertex;
  }
}

module.exports = Vertex;

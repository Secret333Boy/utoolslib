'use strict';

const Vertex = require('./Vertex.js');
const Matrix = require('./Matrix.js');

class Graph {
  constructor(vertices, matrix, weights) {
    if (vertices.some(el => !Vertex.isVertex(el))) {
      throw new TypeError('Must be instance of Vertex');
    }
    if (!Matrix.isMatrix(matrix)) {
      throw new TypeError('Must be instance of Matrix');
    }
    if (!Matrix.isMatrix(weights)) {
      throw new TypeError('Must be instance of Matrix');
    }
    this.vertices = vertices;
    this.matrix = matrix;
    this.weights = weights;
  }

  isConnected(v1, v2) {
    return this.matrix.getElement(v1, v2) !== 0;
  }

  static isGraph(obj) {
    return obj instanceof Graph;
  }

  connect(v1, v2, weight = 0) {
    this.matrix.setElement(v1, v2, 1);
    this.weights.setElement(v1, v2, weight);
  }

  disconnect(v1, v2) {
    this.matrix.setElement(v1, v2, 0);
    this.weights.setElement(v1, v2, 0);
  }
}

module.exports = Graph;

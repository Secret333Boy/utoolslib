'use strict';

class Graph {
  constructor(vertices, matrix, weights) {
    this.vertices = vertices;
    this.matrix = matrix;
    this.weights = weights;
  }

  isConnected(v1, v2) {
    return this.matrix[v1][v2] !== 0;
  }
}

module.exports = Graph;

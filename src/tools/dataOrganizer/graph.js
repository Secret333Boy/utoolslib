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

  static isGraph(obj) {
    return obj instanceof Graph;
  }

  connect(v1, v2, weight = 0) {
    this.matrix[v1][v2] = 1;
    this.weights[v1][v2] = weight;
  }

  disconnect(v1, v2) {
    this.matrix[v1][v2] = 0;
    this.weights[v1][v2] = 0;
  }
}

module.exports = Graph;

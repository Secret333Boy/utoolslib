'use strict';

const Vertex = require('./Vertex.js');
const Matrix = require('./Matrix.js');

class Graph {
  constructor(verteces = [], matrix = new Matrix()) {
    if (verteces.some((el) => !Vertex.isVertex(el))) {
      throw new TypeError('Must be instance of Vertex');
    }
    if (!Matrix.isMatrix(matrix)) {
      throw new TypeError('Must be instance of Matrix');
    }
    this.verteces = verteces;
    this.matrix = matrix;
    this.#linkVerteces(verteces, matrix);
  }

  static isGraph(obj) {
    return obj instanceof Graph;
  }

  #linkVerteces(verteces, matrix) {
    for (const i in verteces) {
      const vertex = verteces[i];
      for (const j in matrix.cols) {
        if (matrix.getElement(i, j) !== 0) {
          vertex.linkTo(verteces[j]);
        } else {
          vertex.unlinkFrom(verteces[j]);
        }
      }
    }
  }

  isConnected(v1, v2) {
    return +this.matrix.getElement(v1, v2) !== 0;
  }

  connect(v1, v2, weight = 1) {
    this.matrix.setElement(v1, v2, weight);
    this.verteces[v1].linkTo(this.verteces[v2]);
  }

  disconnect(v1, v2) {
    this.matrix.setElement(v1, v2, 0);
    this.verteces[v1].unlinkFrom(this.verteces[v2]);
  }

  insert(obj) {
    if (Array.isArray(obj)) {
      for (const el of obj) {
        this.#add(el);
      }
    } else {
      this.#add(obj);
    }
  }

  remove(obj) {
    if (this.verteces.includes(obj)) {
      this.#delete(obj);
    }
  }

  #add(obj) {
    this.verteces.push(Vertex.isVertex(obj) ? obj : new Vertex(obj));
    this.matrix.pushRow().pushCol();
  }

  #delete(obj) {
    const index = this.verteces.indexOf(obj);
    this.verteces.splice(index, 1);
    this.matrix.removeRow(index).removeCol(index);
  }
}

module.exports = Graph;

'use strict';

class Matrix {
  constructor(arr) {
    this.arr = this.#alignRows(arr);
  }

  static isMatrix(obj) {
    return obj instanceof Matrix;
  }

  #alignRows(arr) {
    const res = [];
    const maxRowLength = Math.max(...arr.map(el => el.length));

    for (const row of arr) {
      while (row.length !== maxRowLength) {
        row.push(null);
      }
      res.push(row);
    }
    return res;
  }

  getElement(x, y) {
    return this.arr[(y, x)];
  }

  setElement(x, y, data) {
    this.arr[y][x] = data;
    return this.arr;
  }

  add(matrix) {
    if (!Matrix.isMatrix(matrix)) {
      throw new TypeError('Must be an instance of Matrix');
    }

    if (this.xLength !== matrix.xLength || this.yLength !== matrix.yLength) {
      return new Error('Imposible to add matrixes with different size');
    }

    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        this.arr[i][j] += matrix.arr[i][j];
      }
    }
    return this.arr;
  }

  mult(matrix) {
    if (!Matrix.isMatrix(matrix)) {
      throw new TypeError('Must be an instance of Matrix');
    }

    if (this.xLength !== matrix.yLength || this.yLength !== matrix.xLength) {
      return new Error('Imposible to multiply matrixes with unapropiate size');
    }

    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        this.arr[i][j] = this.arr[i][0] + matrix.arr[0][j];
        for (let k = 1; k < this.xLength; k++) {
          this.arr[i][j] += this.arr[i][k] * matrix.arr[k][j];
        }
      }
    }

    return this.arr;
  }

  transpone() {
    const res = [];
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr[i].length; j++) {
        res[j][i] = this.arr[i][j];
      }
    }
    this.arr = res;
    return this.arr;
  }

  get xLength() {
    return this.arr[0].length;
  }

  get yLength() {
    return this.arr.length;
  }

  get rows() {
    return this.arr;
  }

  get cols() {
    return this.transpone().arr;
  }
}

module.exports = Matrix;

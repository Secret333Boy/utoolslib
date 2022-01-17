'use strict';

const Graph = require('./Graph.js');
const Matrix = require('./Matrix.js');
const Vertex = require('./Vertex.js');

class Tree extends Graph {
  constructor(obj) {
    const vertex = Vertex.isVertex(obj) ? obj : new Vertex(obj);
    super([vertex], new Matrix([[0]]));
  }

  expand(vertex, ...verteces) {
    this.insert(verteces);
    const v1 = this.verteces.indexOf(vertex);
    for (const v of verteces) {
      const v2 = this.verteces.indexOf(v);
      this.connect(v1, v2);
    }
  }

  cut(vertex) {
    const parent = vertex.data.parent;
    if (Vertex.isVertex(parent)) {
      const v1 = this.verteces.indexOf(parent);
      const v2 = this.verteces.indexOf(vertex);
      if (vertex.links.size !== 0) {
        for (const child of vertex.links.values()) {
          this.cut(child);
        }
      }
      this.disconnect(v1, v2);
      this.remove(vertex);
    } else {
      throw new Error('Vertex must have parent in data object');
    }

    return vertex;
  }
}

module.exports = Tree;

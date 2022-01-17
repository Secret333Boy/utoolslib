'use strict';
const { fork } = require('child_process');

class Actor {
  constructor(name, path) {
    this.name = name;
    this.path = path;
  }

  start() {
    const child = fork(this.path);
    this.childProcess = child;
  }

  stop() {
    this.childProcess.kill();
  }

  get started() {
    return this.childProcess || false;
  }
}

class ActorSystem {
  actors = new Map();
  constructor() {}

  register(name, path) {
    if (!name) {
      throw new Error('Actor should have a name');
    }
    this.actors.set(name, path);
  }

  start(name, count = 1) {
    for (let i = 0; i < count; i++) {
      //manage
    }
  }
}

module.exports = { ActorSystem, Actor };

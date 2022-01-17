'use strict';
const { fork } = require('child_process');
const Queue = require('../dataStructures/Queue.js');

class Actor {
  constructor(path) {
    this.path = path;
    this.queue = new Queue();
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

  register(ActorClass) {
    if (!ActorClass.name) {
      throw new Error('Actor should have a name');
    }
    this.actors.set(ActorClass.name, ActorClass);
  }

  start(name, count = 1) {
    const ActorClass = this.actors.get(name);
    for (let i = 0; i < count; i++) {
      const actor = new ActorClass();
      actor.start();
    }
  }

  stop(name) {
    this.actors.get(name).stop();
  }
}

module.exports = { ActorSystem, Actor };

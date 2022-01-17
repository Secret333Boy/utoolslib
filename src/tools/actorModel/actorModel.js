'use strict';
const { fork } = require('child_process');
const Queue = require('../dataStructures/Queue.js');

class Actor {
  constructor(name, path) {
    this.name = name;
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
  instances = [];
  constructor() {}

  register(name, ActorClass) {
    if (!name) {
      throw new Error('Actor should have a name');
    }
    this.actors.set(name, ActorClass);
  }

  start(name, count = 1) {
    const ActorClass = this.actors.get(name);
    for (let i = 0; i < count; i++) {
      const actor = new ActorClass();
      this.instances.push(actor);
      actor.start();
    }
  }

  stop(name) {
    this.instances
      .filter((actor) => actor.name === name)
      .map((actor) => actor.stop());
  }
}

module.exports = { ActorSystem, Actor };

'use strict';
const {
  tools: { actorModel },
} = require('../../src/index.js');
const path = require('path');
const { ActorSystem, Actor } = actorModel;

const actorSystem = new ActorSystem();
class Server extends Actor {
  constructor() {
    super(path.resolve(__dirname, './actors/express.js'));
  }
}
class Monitor extends Actor {
  constructor() {
    super(path.resolve(__dirname, './actors/monitoring.js'));
  }
}
actorSystem.register(Server);
actorSystem.register(Monitor);
actorSystem.start('Server');
actorSystem.start('Monitor');
console.log(actorSystem);

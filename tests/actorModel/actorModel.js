'use strict';
const {
  tools: { actorModel },
} = require('../../src/index.js');
const path = require('path');
const { ActorSystem, Actor } = actorModel;

const actorSystem = new ActorSystem();
class Server extends Actor {
  constructor() {
    super('server', path.resolve(__dirname, './expressServer/index.js'));
  }
}
actorSystem.register('server', Server);
actorSystem.start('server');
console.log(actorSystem);

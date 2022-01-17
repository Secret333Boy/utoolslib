'use strict';
const {
  tools: { actorModel },
} = require('../../src/index.js');
const path = require('path');
const { Actor } = actorModel;

// const as = new ActorSystem();
const server = new Actor(
  'Server',
  path.resolve(__dirname, './expressServer/index.js')
);
server.start();
console.log(server);
server.stop();

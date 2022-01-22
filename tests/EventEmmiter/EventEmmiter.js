'use strict';

const {
  tools: { EventEmmiter },
} = require('../../src/index.js');

const obj = new EventEmmiter();

obj.on('event1', (e) => {
  console.log('event1 happened');
  if (e?.data) {
    console.log(`Got data: ${e.data}`);
  }
});

obj.emit('event1', { data: 'hello' });
obj.emit('event1');

obj.once('event1', () => {
  console.log('Once done');
});
obj.emit('event1');
obj.emit('event1');
console.log(obj.listenersOf('event1'));

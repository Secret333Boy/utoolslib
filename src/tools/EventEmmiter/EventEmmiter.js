'use strict';

class EventEmmiter {
  #events = new Map();
  on(name, callback) {
    const arr = this.#events.get(name) || [];
    arr.push(callback);
    this.#events.set(name, arr);
    return this;
  }
  emit(name, ...eventData) {
    const arr = this.#events.get(name) || [];
    for (const callback of arr) {
      callback(...eventData);
    }
    return this;
  }
  once(name, callback) {
    this.on(name, (e) => {
      callback(e);
      this.remove(name, callback);
    });
    return this;
  }
  remove(name, callback) {
    const arr = this.#events.get(name) || [];
    arr.splice(arr.indexOf(callback), 1);
    this.#events.set(name, arr);
    return this;
  }
  clear(name) {
    this.#events.set(name, []);
    return this;
  }
  listenersOf(name) {
    return this.#events.get(name).slice();
  }
}

module.exports = EventEmmiter;

'use strict';

const proxify = (obj, methodMixins) => {
  const handler = {
    get(target, prop) {
      if (prop in methodMixins) {
        return (...args) => {
          methodMixins[prop](...args);
          return target[prop](...args);
        };
      }

      return target[prop];
    },
  };

  return new Proxy(obj, handler);
};

module.exports = proxify;

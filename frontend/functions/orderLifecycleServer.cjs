const { getService } = require('./shared/bootstrap/functionBootstrap.cjs');

module.exports = new Proxy(
  {},
  {
    get(_target, prop) {
      return getService('orderStateMachine')[prop];
    },
    has(_target, prop) {
      return prop in getService('orderStateMachine');
    },
    ownKeys() {
      return Reflect.ownKeys(getService('orderStateMachine'));
    },
    getOwnPropertyDescriptor(_target, prop) {
      return Object.getOwnPropertyDescriptor(
        getService('orderStateMachine'),
        prop
      );
    },
  }
);

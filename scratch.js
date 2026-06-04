const { readCanonicalOrderStatus } = require('./frontend/src/domain/orderStateMachine.js');

const order = {
  status: 'preparing',
};

const canonicalStatus = readCanonicalOrderStatus(order);
console.log('canonicalStatus for preparing:', canonicalStatus);

const order2 = {
  status: 'ready_for_pickup',
};
console.log('canonicalStatus for ready:', readCanonicalOrderStatus(order2));

const order3 = {
  status: 'out_for_delivery',
};
console.log('canonicalStatus for out:', readCanonicalOrderStatus(order3));

const createOrderStateGuard = require('../orderStateGuard.cjs');
const orderStateMachine = require('../orderStateMachine.core.cjs');

const orderStateGuard = createOrderStateGuard({
  assertValidOrderTransition: orderStateMachine.assertValidOrderTransition,
  assertPaymentConsistency: orderStateMachine.assertPaymentConsistency,
});

describe('orderStateGuard.assertTransitionAuthorized', () => {
  test('kitchen actor can transition preparing -> ready_for_pickup', () => {
    expect(() => {
      orderStateGuard.assertTransitionAuthorized({
        actor: 'kitchen',
        from: 'preparing',
        to: 'ready_for_pickup',
        paymentStatus: 'PAID',
        paymentMethod: 'STRIPE',
      });
    }).not.toThrow();
  });

  test('kitchen actor is forbidden from other transitions', () => {
    // placed -> preparing is forbidden for kitchen
    expect(() => {
      orderStateGuard.assertTransitionAuthorized({
        actor: 'kitchen',
        from: 'placed',
        to: 'preparing',
        paymentStatus: 'PAID',
        paymentMethod: 'STRIPE',
      });
    }).toThrow(/Unauthorized state transition/);

    // ready_for_pickup -> out_for_delivery is forbidden for kitchen
    expect(() => {
      orderStateGuard.assertTransitionAuthorized({
        actor: 'kitchen',
        from: 'ready_for_pickup',
        to: 'out_for_delivery',
        paymentStatus: 'PAID',
        paymentMethod: 'STRIPE',
      });
    }).toThrow(/Unauthorized state transition/);
  });

  test('admin actor can transition placed -> preparing', () => {
    expect(() => {
      orderStateGuard.assertTransitionAuthorized({
        actor: 'admin',
        from: 'placed',
        to: 'preparing',
        paymentStatus: 'PAID',
        paymentMethod: 'STRIPE',
      });
    }).not.toThrow();
  });

  test('admin actor is forbidden from mutating payment fields', () => {
    expect(() => {
      orderStateGuard.assertTransitionAuthorized({
        actor: 'admin',
        from: 'placed',
        to: 'preparing',
        paymentStatus: 'PAID',
        paymentMethod: 'STRIPE',
        patch: { paymentStatus: 'PAID' },
      });
    }).toThrow(/Unauthorized state transition/);
  });

  test('rider actor can transition ready_for_pickup -> out_for_delivery when assigned', () => {
    expect(() => {
      orderStateGuard.assertTransitionAuthorized({
        actor: 'rider',
        from: 'ready_for_pickup',
        to: 'out_for_delivery',
        assignedRiderId: 'rider123',
        actorUid: 'rider123',
        paymentStatus: 'PAID',
        paymentMethod: 'STRIPE',
      });
    }).not.toThrow();
  });

  test('rider actor is blocked from transition if not assigned', () => {
    expect(() => {
      orderStateGuard.assertTransitionAuthorized({
        actor: 'rider',
        from: 'ready_for_pickup',
        to: 'out_for_delivery',
        assignedRiderId: 'riderOther',
        actorUid: 'rider123',
        paymentStatus: 'PAID',
        paymentMethod: 'STRIPE',
      });
    }).toThrow(/Unauthorized state transition/);
  });

  test('unauthorized actor (system, web_customer) is rejected', () => {
    expect(() => {
      orderStateGuard.assertTransitionAuthorized({
        actor: 'system',
        from: 'preparing',
        to: 'ready_for_pickup',
      });
    }).toThrow(/Unauthorized state transition/);

    expect(() => {
      orderStateGuard.assertTransitionAuthorized({
        actor: 'web_customer',
        from: 'placed',
        to: 'cancelled',
      });
    }).toThrow(/Unauthorized state transition/);
  });
});

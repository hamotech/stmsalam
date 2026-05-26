module.exports = {
  orderStateMachine: () => require('../orderStateMachine.core.cjs'),
  createOrderService: (deps) =>
    require('../createOrderService.cjs')({
      validStates: deps.orderStateMachine.VALID_STATES,
      assertPaymentConsistency: deps.orderStateMachine.assertPaymentConsistency,
    }),
  orderRebuildService: (deps) =>
    require('../orderRebuildService.cjs')({
      readCanonicalOrderStatusStrict: deps.orderStateMachine.readCanonicalOrderStatusStrict,
      assertValidOrderTransition: deps.orderStateMachine.assertValidOrderTransition,
    }),
};


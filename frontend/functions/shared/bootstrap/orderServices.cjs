module.exports = {
  orderStateGuard: (deps) =>
    require('../orderStateGuard.cjs')({
      assertValidOrderTransition: deps.orderStateMachine.assertValidOrderTransition,
      assertPaymentConsistency: deps.orderStateMachine.assertPaymentConsistency,
    }),
  orderTransitionService: (deps) =>
    require('../orderTransitionService.cjs')({
      admin: deps.admin,
      readCanonicalOrderStatusStrict: deps.orderStateMachine.readCanonicalOrderStatusStrict,
      normalizeOrderStateForRead: deps.orderStateMachine.normalizeOrderStateForRead,
      assertPaymentConsistency: deps.orderStateMachine.assertPaymentConsistency,
      assertTransitionAuthorized: deps.orderStateGuard.assertTransitionAuthorized,
    }),
};


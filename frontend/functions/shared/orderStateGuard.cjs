module.exports = function createOrderStateGuard({
  assertValidOrderTransition,
  assertPaymentConsistency,
} = {}) {
  if (typeof assertValidOrderTransition !== 'function' || typeof assertPaymentConsistency !== 'function') {
    throw new Error('Service dependency violation: use bootstrap injection only');
  }

  function assertNoPaymentFieldMutationForAdmin(patch) {
    if (!patch) return;
    const forbidden = new Set([
      'paymentStatus',
      'payment_status',
      'paidAt',
      'paymentIntentId',
      'stripeCheckoutSessionId',
    ]);
    for (const k of Object.keys(patch)) {
      if (forbidden.has(k)) {
        throw new Error('Unauthorized state transition');
      }
    }
  }

  function assertTransitionAuthorized(input) {
    const {
      actor,
      from,
      to,
      assignedRiderId,
      actorUid,
      patch,
      paymentStatus,
      paymentMethod,
    } = input || {};

    if (actor === 'web_customer' || actor === 'mobile_customer' || actor === 'system') {
      throw new Error('Unauthorized state transition');
    }
    if (actor === 'admin') {
      assertNoPaymentFieldMutationForAdmin(patch);
    }
    if (actor === 'rider') {
      if (!assignedRiderId || !actorUid || assignedRiderId !== actorUid) {
        throw new Error('Unauthorized state transition');
      }
    }

    assertValidOrderTransition(from, to, actor);
    assertPaymentConsistency(to, paymentStatus || '', {
      from,
      paymentMethod: paymentMethod || '',
    });
  }

  return { assertTransitionAuthorized };
};

module.exports = function createOrderService({
  validStates,
  assertPaymentConsistency,
} = {}) {
  if (!Array.isArray(validStates) || typeof assertPaymentConsistency !== 'function') {
    throw new Error('Service dependency violation: use bootstrap injection only');
  }

  const validStateSet = new Set(validStates);

  function validateInitialOrderSnapshot(snapshot) {
    const status = String(snapshot?.status || '').trim().toLowerCase();
    const paymentStatus = String(snapshot?.paymentStatus || '').trim().toUpperCase();
    if (!validStateSet.has(status)) {
      throw new Error(`Invalid initial order status: ${status || '(empty)'}`);
    }
    assertPaymentConsistency(status, paymentStatus, {
      paymentMethod: String(snapshot?.paymentMethod || ''),
    });
  }

  function createInitialOrderSnapshot(base) {
    const snapshot = { ...(base || {}) };
    validateInitialOrderSnapshot(snapshot);
    return snapshot;
  }

  return {
    validateInitialOrderSnapshot,
    createInitialOrderSnapshot,
  };
};

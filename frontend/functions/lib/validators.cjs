// validators.cjs
const { HttpsError } = require('firebase-functions/v2/https');

/**
 * Validate payload for createGrabOrder callable.
 */
function validateCreateGrabOrder(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new HttpsError('invalid-argument', 'Missing payload');
  }
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    throw new HttpsError('invalid-argument', 'Missing items');
  }
  if (!payload.customerName && !(payload.customer && payload.customer.name)) {
    throw new HttpsError('invalid-argument', 'Missing customer name');
  }
}

/**
 * Validate payload for createStripePendingOrder callable.
 */
function validateStripePendingOrder(payload) {
  if (!payload || typeof payload !== 'object') {
    throw new HttpsError('invalid-argument', 'Missing payload');
  }
  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    throw new HttpsError('invalid-argument', 'Missing items');
  }
  if (!payload.customerName) {
    throw new HttpsError('invalid-argument', 'Missing customerName');
  }
}

/**
 * Validate payload for adminTransition callable.
 */
function validateAdminTransition(request) {
  const payload = request && request.data ? request.data : request;
  if (!payload || typeof payload !== 'object') {
    throw new HttpsError('invalid-argument', 'Missing payload');
  }
  const { orderId, eventName, paymentStatus } = payload;
  if (!orderId || typeof orderId !== 'string' || orderId.trim() === '') {
    throw new HttpsError('invalid-argument', 'Missing or empty orderId');
  }
  if (!eventName || typeof eventName !== 'string' || eventName.trim() === '') {
    throw new HttpsError('invalid-argument', 'Missing or empty eventName');
  }
  if (paymentStatus !== undefined && paymentStatus !== null) {
    const allowed = ['PAID', 'PENDING', 'CANCELLED'];
    if (typeof paymentStatus !== 'string' || !allowed.includes(paymentStatus.toUpperCase())) {
      throw new HttpsError(
        'invalid-argument',
        `Invalid paymentStatus. Allowed values: ${allowed.join(', ')}`,
      );
    }
  }
}

/**
 * Wrapper that runs a validator before invoking the actual function.
 */
function withValidation(fn, validator) {
  return async (request, context) => {
    validator(request.data);
    return fn(request, context);
  };
}

module.exports = {
  validateCreateGrabOrder,
  validateStripePendingOrder,
  validateAdminTransition,
  withValidation,
};

// frontend/functions/lib/tests/validateAdminTransition.test.js
/**
 * Unit tests for validateAdminTransition validator.
 * Uses CommonJS (require) to stay compatible with Firebase Functions runtime.
 */
const { validateAdminTransition } = require('../validators.cjs');
const { HttpsError } = require('firebase-functions/v2/https');

describe('validateAdminTransition', () => {
  test('missing orderId', () => {
    expect(() => validateAdminTransition({ eventName: 'paid' })).toThrow(HttpsError);
  });

  test('empty orderId', () => {
    expect(() => validateAdminTransition({ orderId: '', eventName: 'paid' })).toThrow(HttpsError);
  });

  test('missing eventName', () => {
    expect(() => validateAdminTransition({ orderId: 'abc' })).toThrow(HttpsError);
  });

  test('empty eventName', () => {
    expect(() => validateAdminTransition({ orderId: 'abc', eventName: '' })).toThrow(HttpsError);
  });

  test('invalid paymentStatus', () => {
    expect(() =>
      validateAdminTransition({ orderId: 'abc', eventName: 'paid', paymentStatus: 'WRONG' })
    ).toThrow(HttpsError);
  });

  test('valid payload accepted', () => {
    expect(() =>
      validateAdminTransition({ orderId: 'abc', eventName: 'paid', paymentStatus: 'PAID' })
    ).not.toThrow();
  });
});

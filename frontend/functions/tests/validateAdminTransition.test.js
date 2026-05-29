// validateAdminTransition.test.js
const { validateAdminTransition } = require('../lib/validators.cjs');

describe('validateAdminTransition', () => {
  test('missing orderId', () => {
    expect(() => validateAdminTransition({ eventName: 'paid' })).toThrow(/orderId/);
  });

  test('empty orderId', () => {
    expect(() => validateAdminTransition({ orderId: '', eventName: 'paid' })).toThrow(/orderId/);
  });

  test('missing eventName', () => {
    expect(() => validateAdminTransition({ orderId: 'abc' })).toThrow(/eventName/);
  });

  test('invalid paymentStatus', () => {
    expect(() =>
      validateAdminTransition({ orderId: 'abc', eventName: 'paid', paymentStatus: 'WRONG' })
    ).toThrow(/paymentStatus/);
  });

  test('valid payload without paymentStatus', () => {
    expect(() =>
      validateAdminTransition({ orderId: 'abc', eventName: 'paid' })
    ).not.toThrow();
  });

  test('valid payload with paymentStatus', () => {
    expect(() =>
      validateAdminTransition({ orderId: 'abc', eventName: 'paid', paymentStatus: 'PAID' })
    ).not.toThrow();
  });
});

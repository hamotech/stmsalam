// paymentConstants.test.js
const { normalizePaymentMode, PAYMENT_MODE } = require('../shared/paymentConstants.cjs');

describe('normalizePaymentMode', () => {
  test('maps COD aliases to COD', () => {
    expect(normalizePaymentMode('cash')).toBe(PAYMENT_MODE.COD);
    expect(normalizePaymentMode('CASHONDELIVERY')).toBe(PAYMENT_MODE.COD);
    expect(normalizePaymentMode('cod')).toBe(PAYMENT_MODE.COD);
  });

  test('maps SCANNER aliases to SCANNER', () => {
    expect(normalizePaymentMode('scanpay')).toBe(PAYMENT_MODE.SCANNER);
    expect(normalizePaymentMode('qr')).toBe(PAYMENT_MODE.SCANNER);
    expect(normalizePaymentMode('sgqr')).toBe(PAYMENT_MODE.SCANNER);
  });

  test('maps STRIPE aliases to STRIPE', () => {
    expect(normalizePaymentMode('online')).toBe(PAYMENT_MODE.STRIPE);
    expect(normalizePaymentMode('card')).toBe(PAYMENT_MODE.STRIPE);
    expect(normalizePaymentMode('stripe')).toBe(PAYMENT_MODE.STRIPE);
  });

  test('fallback to COD for unknown mode', () => {
    expect(normalizePaymentMode('unknown')).toBe('COD');
  });
});

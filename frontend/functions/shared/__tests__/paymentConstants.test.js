// frontend/functions/shared/__tests__/paymentConstants.test.js
/**
 * Tests for payment mode normalization.
 * Uses CommonJS (require) to stay compatible with Firebase Functions.
 */
const { normalizePaymentMode, PAYMENT_MODE } = require('../paymentConstants.cjs');

describe('normalizePaymentMode', () => {
  test('ONLINE maps to STRIPE', () => {
    expect(normalizePaymentMode('online')).toBe(PAYMENT_MODE.STRIPE);
  });

  test('CARD maps to STRIPE', () => {
    expect(normalizePaymentMode('card')).toBe(PAYMENT_MODE.STRIPE);
  });

  test('CASH maps to COD', () => {
    expect(normalizePaymentMode('cash')).toBe(PAYMENT_MODE.COD);
  });

  test('CASHONDELIVERY maps to COD', () => {
    expect(normalizePaymentMode('cashondelivery')).toBe(PAYMENT_MODE.COD);
  });

  test('SCANPAY maps to SCANNER', () => {
    expect(normalizePaymentMode('scanpay')).toBe(PAYMENT_MODE.SCANNER);
  });

  test('QR maps to SCANNER', () => {
    expect(normalizePaymentMode('qr')).toBe(PAYMENT_MODE.SCANNER);
  });

  test('BALANCE maps to COD (fallback)', () => {
    expect(normalizePaymentMode('balance')).toBe(PAYMENT_MODE.COD);
  });

  test('invalid mode falls back to COD with warning', () => {
    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    expect(normalizePaymentMode('invalidMode')).toBe('COD');
    expect(consoleWarnSpy).toHaveBeenCalled();
    consoleWarnSpy.mockRestore();
  });
});

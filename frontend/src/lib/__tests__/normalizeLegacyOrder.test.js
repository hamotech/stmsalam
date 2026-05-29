// src/lib/__tests__/normalizeLegacyOrder.test.js
/**
 * Tests for normalizeLegacyOrder utility.
 */
const { normalizeLegacyOrder } = require('../orderUtils.js');

describe("normalizeLegacyOrder", () => {
  test("preserves existing paymentStatus and paymentMethod", () => {
    const order = { id: "1", paymentStatus: "PAID", paymentMethod: "CARD", paymentMode: "CARD" };
    const result = normalizeLegacyOrder(order);
    expect(result.paymentStatus).toBe("PAID");
    expect(result.paymentMethod).toBe("CARD");
  });

  test("fills missing paymentStatus for COD", () => {
    const order = { id: "2", paymentMode: "COD" };
    const result = normalizeLegacyOrder(order);
    expect(result.paymentStatus).toBe("COD_PENDING");
    expect(result.paymentMethod).toBe("COD");
  });

  test("fills missing paymentStatus for non-COD", () => {
    const order = { id: "3", paymentMode: "CARD" };
    const result = normalizeLegacyOrder(order);
    expect(result.paymentStatus).toBe("PENDING");
    expect(result.paymentMethod).toBe("CARD");
  });

  test("fallback defaults when no paymentMode", () => {
    const order = { id: "4" };
    const result = normalizeLegacyOrder(order);
    expect(result.paymentStatus).toBe("PENDING");
    expect(result.paymentMethod).toBe("COD");
  });
});

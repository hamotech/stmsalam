// src/lib/__tests__/orderUtils.test.js
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

  // Additional enterprise‑grade cases
  test("preserves existing paymentMethod when missing paymentStatus", () => {
    const order = { id: "5", paymentMethod: "CARD", paymentMode: "CARD" };
    const result = normalizeLegacyOrder(order);
    expect(result.paymentStatus).toBe("PENDING");
    expect(result.paymentMethod).toBe("CARD");
  });

  test("handles null paymentMethod with fallback to paymentMode", () => {
    const order = { id: "6", paymentStatus: "PAID", paymentMethod: null, paymentMode: "CARD" };
    const result = normalizeLegacyOrder(order);
    expect(result.paymentMethod).toBe("CARD");
  });

  test("handles undefined paymentMethod with fallback to COD when no mode", () => {
    const order = { id: "7", paymentStatus: "PAID", paymentMethod: undefined };
    const result = normalizeLegacyOrder(order);
    expect(result.paymentMethod).toBe("COD");
  });
});

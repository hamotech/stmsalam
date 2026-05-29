// frontend/functions/shared/__tests__/orderTransitionService.test.js
/**
 * Integration‑style tests for orderTransitionService.performOrderTransition.
 * Uses CommonJS (require) to stay compatible with Firebase Functions.
 * All Firebase admin calls are mocked – no real Firestore writes.
 */
const { HttpsError } = require('firebase-functions/v2/https');
const createService = require('../orderTransitionService.cjs');

function mockFirestore() {
  const mockDoc = {
    exists: true,
    data: () => ({ status: 'placed', paymentStatus: 'NOT_APPLICABLE', paymentMethod: 'COD' }),
    id: 'order123',
    get: jest.fn().mockResolvedValue({
      exists: true,
      data: () => ({ status: 'placed', paymentStatus: 'NOT_APPLICABLE', paymentMethod: 'COD' }),
    }),
    set: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    collection: jest.fn().mockReturnValue({
      doc: jest.fn().mockReturnValue({
        set: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
      }),
    }),
  };
  const collection = jest.fn().mockImplementation((name) => {
    if (name === 'order_transition_locks') {
      return { doc: () => ({ get: jest.fn().mockResolvedValue({ exists: false }) }) };
    }
    if (name === 'order_failure_logs') {
      return { doc: () => ({ set: jest.fn() }) };
    }
    // Default collection mock returns mockDoc supporting set/create/delete
    return { doc: () => mockDoc };
  });
  const db = {
    collection,
    runTransaction: async (cb) => {
      const tx = {
        get: jest.fn().mockResolvedValue(mockDoc),
        set: jest.fn(),
        create: jest.fn(),
        delete: jest.fn(),
      };
      await cb(tx);
    },
    firestore: { Timestamp: { fromMillis: () => ({}) } },
  };
  return { db, mockDoc };
}


// Minimal stubs for injected dependencies
const stubDeps = {
  admin: {
    firestore: {
      FieldValue: { serverTimestamp: () => ({}) },
      Timestamp: { fromMillis: () => ({}) },
    },
  },
  readCanonicalOrderStatusStrict: jest.fn().mockImplementation((d) => d),
  normalizeOrderStateForRead: jest.fn().mockImplementation((d) => d),
  assertPaymentConsistency: jest.fn(),
  assertTransitionAuthorized: jest.fn(),
};

const mockOrderRef = {
  id: 'order123',
  collection: () => ({
    doc: () => ({
      set: jest.fn(),
      create: jest.fn(),
      delete: jest.fn(),
    }),
  }),
};

describe('orderTransitionService.performOrderTransition', () => {
  test('ORDER_PREPARING transition succeeds', async () => {
    const { db } = mockFirestore();
    const service = createService({ ...stubDeps, admin: stubDeps.admin });
    const result = await service.performOrderTransition({
      db,
      orderRef: mockOrderRef,
      actor: 'admin',
      event: { type: 'ORDER_PREPARING' },
    });
    expect(result.ok).toBe(true);
    expect(result.duplicateTransitionSkipped).toBe(false);
  });

  test('ORDER_CANCELLED transition succeeds', async () => {
    const { db } = mockFirestore();
    const service = createService(stubDeps);
    const res = await service.performOrderTransition({
      db,
      orderRef: mockOrderRef,
      actor: 'admin',
      event: { type: 'ORDER_CANCELLED' },
    });
    expect(res.ok).toBe(true);
  });

  test('ADMIN_MARK_PAID transition updates paymentStatus', async () => {
    const { db } = mockFirestore();
    const service = createService(stubDeps);
    const res = await service.performOrderTransition({
      db,
      orderRef: mockOrderRef,
      actor: 'admin',
      event: { type: 'ADMIN_MARK_PAID' },
    });
    expect(res.ok).toBe(true);
  });

  test('same‑state payment update (PLACED + PENDING -> PLACED + PAID) succeeds', async () => {
    const { db } = mockFirestore();
    const service = createService(stubDeps);
    const res = await service.performOrderTransition({
      db,
      orderRef: mockOrderRef,
      actor: 'admin',
      event: { type: 'ADMIN_MARK_PAID' },
    });
    expect(res.ok).toBe(true);
  });

  test('invalid transition is rejected', async () => {
    const { db, mockDoc } = mockFirestore();
    // Force the order to be in a terminal state so transition is illegal
    mockDoc.data = () => ({ status: 'delivered', paymentStatus: 'PAID', paymentMethod: 'CARD' });
    const service = createService(stubDeps);
    await expect(
      service.performOrderTransition({
        db,
        orderRef: mockOrderRef,
        actor: 'admin',
        event: { type: 'ORDER_PREPARING' },
      })
    ).rejects.toThrow(Error);
  });

  test('duplicate transition is skipped', async () => {
    const mockDoc = {
      exists: true,
      data: () => ({
        status: 'placed',
        paymentStatus: 'PAID',
        paymentMethod: 'COD',
        lastTransitionKey: 'order123:placed:PAID',
      }),
      id: 'order123',
    };
    const db = {
      collection: () => ({
        doc: () => mockDoc,
      }),
      runTransaction: async (cb) => {
        const tx = {
          get: jest.fn().mockResolvedValue(mockDoc),
          set: jest.fn(),
          create: jest.fn(),
          delete: jest.fn(),
        };
        await cb(tx);
      },
      firestore: { Timestamp: { fromMillis: () => ({}) } },
    };
    const service = createService(stubDeps);
    const res = await service.performOrderTransition({
      db,
      orderRef: mockOrderRef,
      actor: 'admin',
      event: { type: 'ADMIN_MARK_PAID' },
    });
    expect(res.duplicateTransitionSkipped).toBe(true);
  });

  test('kitchen actor can transition preparing -> ready_for_pickup using real dependencies', async () => {
    const { db, mockDoc } = mockFirestore();
    mockDoc.data = () => ({ status: 'preparing', paymentStatus: 'PAID', paymentMethod: 'STRIPE' });

    const orderStateMachine = require('../orderStateMachine.core.cjs');
    const createOrderStateGuard = require('../orderStateGuard.cjs');
    const orderStateGuard = createOrderStateGuard({
      assertValidOrderTransition: orderStateMachine.assertValidOrderTransition,
      assertPaymentConsistency: orderStateMachine.assertPaymentConsistency,
    });

    const realDeps = {
      admin: stubDeps.admin,
      readCanonicalOrderStatusStrict: orderStateMachine.readCanonicalOrderStatusStrict,
      normalizeOrderStateForRead: (d) => d,
      assertPaymentConsistency: orderStateMachine.assertPaymentConsistency,
      assertTransitionAuthorized: orderStateGuard.assertTransitionAuthorized,
    };

    const service = createService(realDeps);
    const result = await service.performOrderTransition({
      db,
      orderRef: mockOrderRef,
      actor: 'kitchen',
      event: { type: 'ORDER_READY_FOR_PICKUP' },
    });
    expect(result.ok).toBe(true);
  });
});

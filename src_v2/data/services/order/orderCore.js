import { collection, doc, getDocs, limit, orderBy, query, updateDoc } from "firebase/firestore";

const ORDERS_COLLECTION = "orders";
const PUBLIC_TRACKING_COLLECTION = "public_tracking";
const USE_MOCK_ORDER_SERVICE = false;
const mockOrders = [];
const DEV_DEBUG_FLAGS = __DEV__
  ? {
      simulateNetworkFailure: false,
      simulateInvalidPayload: false,
      simulateMissingFields: false,
    }
  : {
      simulateNetworkFailure: false,
      simulateInvalidPayload: false,
      simulateMissingFields: false,
    };

const VALID_MODES = ["delivery", "pickup", "dine-in"];

function isIsoString(value) {
  return typeof value === "string" && !Number.isNaN(Date.parse(value));
}

function isFirestoreTimestampLike(value) {
  return Boolean(value && typeof value === "object" && typeof value.toDate === "function");
}

function isValidTimestampLike(value) {
  return isIsoString(value) || isFirestoreTimestampLike(value);
}

function validateOrderSchema(order, source) {
  const issues = [];
  if (typeof order?.id !== "string" || !order.id.trim()) issues.push("id must be a non-empty string");
  if (typeof order?.status !== "string" || order.status !== order.status.toUpperCase()) {
    issues.push("status must be uppercase string");
  }
  if (!VALID_MODES.includes(order?.mode)) issues.push("mode must be delivery | pickup | dine-in");
  if (typeof order?.total !== "number" || Number.isNaN(order.total)) issues.push("total must be a number");
  if (!isValidTimestampLike(order?.createdAt)) {
    issues.push("createdAt must be ISO string or Firestore Timestamp");
  }
  if (!isValidTimestampLike(order?.updatedAt)) {
    issues.push("updatedAt must be ISO string or Firestore Timestamp");
  }
  if (issues.length > 0) {
    console.warn(`[V2 SERVICE] schema warning from ${source}:`, issues, order);
  }
}

const normalizeOrder = (id, raw) => ({
  id,
  status: (raw?.status ?? "PENDING").toUpperCase(),
  items: Array.isArray(raw?.items) ? raw.items : [],
  total: Number(raw?.total ?? 0),
  mode: raw?.mode ?? "delivery",
  paymentProofSubmitted: Boolean(raw?.paymentProofSubmitted ?? false),
  createdAt: raw?.createdAt ?? "",
  updatedAt: raw?.updatedAt ?? raw?.createdAt ?? "",
  paymentStatus: raw?.paymentStatus ?? "",
  payment_status: raw?.payment_status ?? "",
});

export function createOrderCore(deps) {
  const {
    db,
    withRetry,
    buildOrderHash,
    hasRecentOrderHash,
    rememberOrderHash,
    findServerDuplicate,
    buildIdempotencyKey,
    rememberIdempotencyKey,
    checkIdempotencyDuplicate,
    getDeterministicIdForKey,
    transactionalCreateOrder,
    appendToQueue,
    loadQueue,
    persistQueue,
    ensureSyncListener,
    isOffline,
    syncProcessOfflineQueue,
    incrementDuplicateSkips,
    incrementSyncedOrders,
    incrementFailedSyncs,
    logSyncMetricsSnapshot,
  } = deps;

  async function handleQueuedPlaceOrder(payload) {
    const orderHash = buildOrderHash(payload);
    if (hasRecentOrderHash(orderHash)) {
      console.warn("[V2 SYNC] duplicate queued order skipped");
      incrementDuplicateSkips();
      return true;
    }

    const now = new Date().toISOString();
    const body = {
      ...payload,
      status: "PENDING",
      paymentProofSubmitted: Boolean(payload?.paymentProofSubmitted ?? false),
      createdAt: DEV_DEBUG_FLAGS.simulateMissingFields ? "" : now,
      updatedAt: now,
    };
    const idempotencyKey = buildIdempotencyKey(body);

    const reconcile = await findServerDuplicate(
      { db, withRetry, ordersCollection: ORDERS_COLLECTION },
      body
    );
    if (reconcile.hasDuplicate) {
      console.log("[V2 RECONCILE] server truth override applied");
      console.log("[V2 RECONCILE] queued order already exists on server");
      incrementDuplicateSkips();
      rememberOrderHash(orderHash);
      return true;
    }

    const idempotencyCheck = await checkIdempotencyDuplicate(
      { db, withRetry, ordersCollection: ORDERS_COLLECTION },
      body,
      idempotencyKey
    );
    if (idempotencyCheck.duplicate) {
      console.log("[V2 IDEMPOTENCY] duplicate write blocked");
      if (idempotencyCheck.onServer) {
        incrementDuplicateSkips();
        rememberOrderHash(orderHash);
        rememberIdempotencyKey(idempotencyKey);
        return true;
      }
      throw new Error("IDEMPOTENT_DUPLICATE_BLOCKED");
    }

    const createdId = await transactionalCreateOrder(
      { db, withRetry, ordersCollection: ORDERS_COLLECTION, trackingCollection: PUBLIC_TRACKING_COLLECTION },
      body,
      idempotencyKey,
      getDeterministicIdForKey(body, idempotencyKey),
      rememberIdempotencyKey
    );
    const createdOrder = { ...body, id: createdId, idempotencyKey };
    validateOrderSchema(createdOrder, "sync:placeOrder");
    rememberOrderHash(orderHash);
    return true;
  }

  async function handleQueuedUpdateStatus(payload) {
    const id = String(payload?.orderId ?? "").trim();
    const status = String(payload?.status ?? "PENDING").toUpperCase();
    if (!id) {
      console.warn("[V2 SYNC] invalid queued updateOrderStatus payload skipped");
      return true;
    }

    const patch = { status, updatedAt: new Date().toISOString() };
    const results = await Promise.all([
      withRetry(() => updateDoc(doc(db, ORDERS_COLLECTION, id), patch)).then(
        () => true,
        () => false
      ),
      withRetry(() => updateDoc(doc(db, PUBLIC_TRACKING_COLLECTION, id), patch)).then(
        () => true,
        () => false
      ),
    ]);
    if (!results[0] && !results[1]) {
      throw new Error("Queued updateOrderStatus failed for both collections.");
    }
    return true;
  }

  async function processOfflineQueue() {
    return syncProcessOfflineQueue({
      loadQueue,
      persistQueue,
      handleQueuedPlaceOrder,
      handleQueuedUpdateStatus,
      incrementSyncedOrders,
      incrementFailedSyncs,
      logSyncMetricsSnapshot,
      isOfflineFn: isOffline,
    });
  }

  function ensureListener() {
    ensureSyncListener({ processOfflineQueueFn: processOfflineQueue });
  }

  async function placeOrder(data) {
    try {
      ensureListener();
      console.log("[V2 SERVICE] orderService executed: placeOrder");
      if (DEV_DEBUG_FLAGS.simulateNetworkFailure) {
        throw new Error("Simulated network failure in V2 service.");
      }
      if (DEV_DEBUG_FLAGS.simulateInvalidPayload) {
        return { success: false, error: "Simulated invalid payload failure." };
      }

      const orderHash = buildOrderHash(data);
      if (hasRecentOrderHash(orderHash)) {
        return { success: false, error: "DUPLICATE_ORDER_BLOCKED" };
      }

      if (await isOffline()) {
        await appendToQueue(
          { type: "placeOrder", payload: data, queuedAt: new Date().toISOString() },
          deps.incrementQueuedOrders
        );
        return { success: false, error: "OFFLINE_QUEUED" };
      }

      if (USE_MOCK_ORDER_SERVICE) {
        const now = new Date().toISOString();
        const mock = {
          id: `mock_${Date.now()}`,
          ...data,
          status: "PENDING",
          createdAt: DEV_DEBUG_FLAGS.simulateMissingFields ? "" : now,
          updatedAt: now,
        };
        validateOrderSchema(mock, "placeOrder:mock");
        mockOrders.unshift(mock);
        rememberOrderHash(orderHash);
        return { success: true, data: mock };
      }

      const now = new Date().toISOString();
      const payload = {
        ...data,
        status: "PENDING",
        paymentProofSubmitted: Boolean(data?.paymentProofSubmitted ?? false),
        createdAt: DEV_DEBUG_FLAGS.simulateMissingFields ? "" : now,
        updatedAt: now,
      };
      const idempotencyKey = buildIdempotencyKey(payload);

      const reconcile = await findServerDuplicate(
        { db, withRetry, ordersCollection: ORDERS_COLLECTION },
        payload
      );
      if (reconcile.hasDuplicate) {
        console.log("[V2 RECONCILE] server truth override applied");
        rememberOrderHash(orderHash);
        rememberIdempotencyKey(idempotencyKey);
        return { success: false, error: "SERVER_DUPLICATE_DETECTED" };
      }

      const idempotencyCheck = await checkIdempotencyDuplicate(
        { db, withRetry, ordersCollection: ORDERS_COLLECTION },
        payload,
        idempotencyKey
      );
      if (idempotencyCheck.duplicate) {
        console.log("[V2 IDEMPOTENCY] duplicate write blocked");
        rememberOrderHash(orderHash);
        if (idempotencyCheck.onServer) rememberIdempotencyKey(idempotencyKey);
        return { success: false, error: "IDEMPOTENT_DUPLICATE_BLOCKED" };
      }

      const createdId = await transactionalCreateOrder(
        { db, withRetry, ordersCollection: ORDERS_COLLECTION, trackingCollection: PUBLIC_TRACKING_COLLECTION },
        payload,
        idempotencyKey,
        getDeterministicIdForKey(payload, idempotencyKey),
        rememberIdempotencyKey
      );

      const createdOrder = { ...payload, id: createdId, idempotencyKey };
      validateOrderSchema(createdOrder, "placeOrder:firestore");
      rememberOrderHash(orderHash);
      return { success: true, data: createdOrder };
    } catch (error) {
      console.error("[src_v2][orderService.placeOrder] error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to place order.",
      };
    }
  }

  async function updateOrderStatus(orderId, status) {
    try {
      ensureListener();
      console.log("[V2 SERVICE] orderService executed: updateOrderStatus");
      if (DEV_DEBUG_FLAGS.simulateNetworkFailure) {
        throw new Error("Simulated network failure in V2 updateOrderStatus.");
      }
      if (await isOffline()) {
        await appendToQueue(
          {
            type: "updateOrderStatus",
            payload: { orderId, status },
            queuedAt: new Date().toISOString(),
          },
          deps.incrementQueuedOrders
        );
        return { success: false, error: "OFFLINE_QUEUED" };
      }
      if (USE_MOCK_ORDER_SERVICE) {
        const id = String(orderId ?? "").trim();
        const index = mockOrders.findIndex((o) => o.id === id);
        if (index === -1) return { success: false, error: "Mock order not found." };
        mockOrders[index] = {
          ...mockOrders[index],
          status: String(status ?? "PENDING").toUpperCase(),
          updatedAt: new Date().toISOString(),
        };
        validateOrderSchema(mockOrders[index], "updateOrderStatus:mock");
        return { success: true, data: mockOrders[index] };
      }

      const id = String(orderId ?? "").trim();
      if (!id) return { success: false, error: "orderId is required." };

      const patch = {
        status: String(status ?? "PENDING").toUpperCase(),
        updatedAt: new Date().toISOString(),
      };
      const results = await Promise.all([
        withRetry(() => updateDoc(doc(db, ORDERS_COLLECTION, id), patch)).then(
          () => true,
          () => false
        ),
        withRetry(() => updateDoc(doc(db, PUBLIC_TRACKING_COLLECTION, id), patch)).then(
          () => true,
          () => false
        ),
      ]);
      if (!results[0] && !results[1]) {
        return { success: false, error: "Could not update order status in Firestore." };
      }
      return { success: true, data: { id, ...patch } };
    } catch (error) {
      console.error("[src_v2][orderService.updateOrderStatus] error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to update order status.",
      };
    }
  }

  async function getOrders(maxCount = 20) {
    try {
      ensureListener();
      console.log("[V2 SERVICE] orderService executed: getOrders");
      if (DEV_DEBUG_FLAGS.simulateNetworkFailure) {
        throw new Error("Simulated network failure in V2 getOrders.");
      }
      if (USE_MOCK_ORDER_SERVICE) {
        const data = mockOrders.slice(0, maxCount);
        data.forEach((order) => validateOrderSchema(order, "getOrders:mock"));
        return { success: true, data };
      }

      const q = query(
        collection(db, PUBLIC_TRACKING_COLLECTION),
        orderBy("createdAt", "desc"),
        limit(maxCount)
      );
      const snap = await withRetry(() => getDocs(q));
      const orders = snap.docs.map((d) => normalizeOrder(d.id, d.data()));
      orders.forEach((order) => validateOrderSchema(order, "getOrders:firestore"));
      return { success: true, data: orders };
    } catch (error) {
      console.error("[src_v2][orderService.getOrders] error:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch orders.",
      };
    }
  }

  return {
    placeOrder,
    updateOrderStatus,
    getOrders,
    processOfflineQueue,
  };
}

import { db } from "../../../../stm-mobile/src/services/firebase";
import { createOrderCore } from "./orderCore";
import { withRetry } from "./retryEngine";
import { appendToQueue, loadQueue, persistQueue } from "./offlineQueue";
import { buildOrderHash, hasRecentOrderHash, rememberOrderHash } from "./dedupeEngine";
import { findServerDuplicate } from "./reconciliationEngine";
import {
  buildIdempotencyKey,
  checkIdempotencyDuplicate,
  getDeterministicIdForKey,
  rememberIdempotencyKey,
} from "./idempotencyEngine";
import { transactionalCreateOrder } from "./transactionEngine";
import { ensureSyncListener, isOffline, processOfflineQueue as syncProcessOfflineQueue } from "./syncEngine";
import {
  incrementDuplicateSkips,
  incrementFailedSyncs,
  incrementQueuedOrders,
  incrementSyncedOrders,
  logSyncMetricsSnapshot,
} from "./metricsEngine";

const core = createOrderCore({
  db,
  withRetry,
  appendToQueue,
  loadQueue,
  persistQueue,
  buildOrderHash,
  hasRecentOrderHash,
  rememberOrderHash,
  findServerDuplicate,
  buildIdempotencyKey,
  checkIdempotencyDuplicate,
  getDeterministicIdForKey,
  rememberIdempotencyKey,
  transactionalCreateOrder,
  ensureSyncListener,
  isOffline,
  syncProcessOfflineQueue,
  incrementDuplicateSkips,
  incrementFailedSyncs,
  incrementQueuedOrders,
  incrementSyncedOrders,
  logSyncMetricsSnapshot,
});

const ENABLE_ORDER_SIMULATOR = false;
const ORDER_SIMULATION_MODES = {
  networkFlap: false,
  offlineBurst: false,
  duplicateSpam: false,
  transactionFailure: false,
  reconciliationTimeout: false,
  queueCorruption: false,
};

let simulator = null;
if (__DEV__) {
  try {
    // DEV-only harness: intentionally loaded only from this service entrypoint.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createOrderFailureSimulator } = require("../../../dev/orderFailureSimulator");
    simulator = createOrderFailureSimulator({
      enabled: ENABLE_ORDER_SIMULATOR,
      modes: ORDER_SIMULATION_MODES,
      operations: {
        placeOrder: core.placeOrder,
        processOfflineQueue: core.processOfflineQueue,
      },
    });
  } catch {
    simulator = null;
  }
}

export const placeOrder = async (payload) =>
  simulator?.wrapPlaceOrder ? simulator.wrapPlaceOrder(core.placeOrder, payload) : core.placeOrder(payload);
export const updateOrderStatus = core.updateOrderStatus;
export const getOrders = core.getOrders;
export const processOfflineQueue = async () =>
  simulator?.wrapProcessOfflineQueue
    ? simulator.wrapProcessOfflineQueue(core.processOfflineQueue)
    : core.processOfflineQueue();
export const runOrderStressSuite = async (samplePayloadFactory) =>
  simulator?.runOrderStressSuite
    ? simulator.runOrderStressSuite(samplePayloadFactory)
    : { success: true, data: "SIMULATOR_DISABLED" };

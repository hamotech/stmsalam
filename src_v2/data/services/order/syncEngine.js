let netInfoModuleRef = null;
let listenerInitialized = false;
let netInfoUnsubscribe = null;
let lastOfflineState = null;
let isSyncProcessing = false;
let isSyncing = false;
const STALE_QUEUE_MS = 24 * 60 * 60 * 1000;
const SYNC_RECONNECT_DEBOUNCE_MS = 4000;
let lastSyncTriggerAt = 0;

function getNetInfoModule() {
  if (netInfoModuleRef !== null) return netInfoModuleRef;
  try {
    netInfoModuleRef = require("@react-native-community/netinfo");
  } catch {
    netInfoModuleRef = undefined;
  }
  return netInfoModuleRef;
}

export async function isOffline() {
  const netInfoModule = getNetInfoModule();
  if (!netInfoModule?.fetch) return false;
  try {
    const state = await netInfoModule.fetch();
    if (state?.isConnected === false) return true;
    if (state?.isInternetReachable === false) return true;
    return false;
  } catch {
    return false;
  }
}

export async function processOfflineQueue({
  loadQueue,
  persistQueue,
  handleQueuedPlaceOrder,
  handleQueuedUpdateStatus,
  incrementSyncedOrders,
  incrementFailedSyncs,
  logSyncMetricsSnapshot,
  isOfflineFn,
}) {
  if (isSyncProcessing || isSyncing) return;
  isSyncProcessing = true;
  isSyncing = true;
  try {
    logSyncMetricsSnapshot();
    if (await isOfflineFn()) return;
    const queue = await loadQueue();
    if (queue.length === 0) return;

    const retained = [];
    for (const item of queue) {
      try {
        const queuedAtMs = item?.queuedAt ? Date.parse(item.queuedAt) : NaN;
        const isStale = Number.isFinite(queuedAtMs) && Date.now() - queuedAtMs > STALE_QUEUE_MS;
        if (isStale) {
          console.warn("[V2 SYNC] stale order skipped");
          retained.push(item);
          continue;
        }

        console.log("[V2 SYNC] processing item", item?.type ?? "unknown");
        if (item?.type === "placeOrder") {
          await handleQueuedPlaceOrder(item?.payload ?? {});
        } else if (item?.type === "updateOrderStatus") {
          await handleQueuedUpdateStatus(item?.payload ?? {});
        } else {
          console.warn("[V2 SYNC] unknown queued item skipped");
        }
        console.log("[V2 SYNC] success");
        incrementSyncedOrders();
      } catch (error) {
        console.warn("[V2 SYNC] failed retry, retained in queue", error);
        incrementFailedSyncs();
        retained.push(item);
      }
    }

    await persistQueue(retained);
    logSyncMetricsSnapshot();
  } finally {
    isSyncProcessing = false;
    isSyncing = false;
  }
}

export function ensureSyncListener({ processOfflineQueueFn }) {
  if (listenerInitialized || netInfoUnsubscribe) return;
  listenerInitialized = true;

  const netInfoModule = getNetInfoModule();
  if (!netInfoModule?.addEventListener) return;

  netInfoUnsubscribe = netInfoModule.addEventListener((state) => {
    const offlineNow = state?.isConnected === false || state?.isInternetReachable === false;
    if (lastOfflineState === true && offlineNow === false) {
      const now = Date.now();
      if (now - lastSyncTriggerAt < SYNC_RECONNECT_DEBOUNCE_MS) {
        console.warn("[V2 SYNC] reconnect storm blocked");
        lastOfflineState = offlineNow;
        return;
      }
      lastSyncTriggerAt = now;
      processOfflineQueueFn().catch(() => {});
    }
    lastOfflineState = offlineNow;
  });

  lastSyncTriggerAt = Date.now();
  processOfflineQueueFn().catch(() => {});
}

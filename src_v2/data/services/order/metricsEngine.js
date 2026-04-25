const syncMetrics = {
  totalQueuedOrders: 0,
  totalSyncedOrders: 0,
  totalFailedSyncs: 0,
  totalDuplicateSkips: 0,
};

export function incrementQueuedOrders() {
  try {
    syncMetrics.totalQueuedOrders += 1;
  } catch {
    // Metrics must never break order flow.
  }
}

export function incrementSyncedOrders() {
  try {
    syncMetrics.totalSyncedOrders += 1;
  } catch {
    // Metrics must never break order flow.
  }
}

export function incrementFailedSyncs() {
  try {
    syncMetrics.totalFailedSyncs += 1;
  } catch {
    // Metrics must never break order flow.
  }
}

export function incrementDuplicateSkips() {
  try {
    syncMetrics.totalDuplicateSkips += 1;
  } catch {
    // Metrics must never break order flow.
  }
}

export function logSyncMetricsSnapshot() {
  try {
    console.log(
      "[V2 SYNC METRICS]\n" +
        `queued: ${syncMetrics.totalQueuedOrders}\n` +
        `synced: ${syncMetrics.totalSyncedOrders}\n` +
        `failed: ${syncMetrics.totalFailedSyncs}\n` +
        `duplicates: ${syncMetrics.totalDuplicateSkips}`
    );
  } catch {
    // Metrics logging must never break order flow.
  }
}

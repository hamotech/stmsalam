const OFFLINE_QUEUE_KEY = "V2_OFFLINE_ORDER_QUEUE";
let inMemoryQueueFallback = [];
let asyncStorageModuleRef = null;

function getAsyncStorageModule() {
  if (asyncStorageModuleRef !== null) return asyncStorageModuleRef;
  try {
    asyncStorageModuleRef = require("@react-native-async-storage/async-storage").default;
  } catch {
    asyncStorageModuleRef = undefined;
  }
  return asyncStorageModuleRef;
}

export async function persistQueue(queue) {
  const safeQueue = Array.isArray(queue) ? queue : [];
  const AsyncStorage = getAsyncStorageModule();
  if (!AsyncStorage?.setItem) {
    inMemoryQueueFallback = safeQueue;
    return;
  }
  try {
    await AsyncStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(safeQueue));
    inMemoryQueueFallback = safeQueue;
  } catch {
    inMemoryQueueFallback = safeQueue;
  }
}

export async function loadQueue() {
  const AsyncStorage = getAsyncStorageModule();
  if (!AsyncStorage?.getItem) {
    console.log("[V2 SYNC] queue loaded (memory fallback)");
    return Array.isArray(inMemoryQueueFallback) ? inMemoryQueueFallback : [];
  }
  try {
    const raw = await AsyncStorage.getItem(OFFLINE_QUEUE_KEY);
    let parsed = [];
    if (raw) {
      try {
        parsed = JSON.parse(raw);
      } catch {
        console.warn("[V2 QUEUE] corrupted state recovered safely");
        parsed = [];
      }
    }
    const queue = Array.isArray(parsed) ? parsed : [];
    if (!Array.isArray(parsed)) {
      console.warn("[V2 QUEUE] corrupted state recovered safely");
    }
    inMemoryQueueFallback = queue;
    console.log("[V2 SYNC] queue loaded");
    return queue;
  } catch {
    console.warn("[V2 SYNC] queue load failed, using memory fallback");
    return Array.isArray(inMemoryQueueFallback) ? inMemoryQueueFallback : [];
  }
}

export async function appendToQueue(item, incrementQueuedOrders) {
  const queue = await loadQueue();
  queue.push(item);
  await persistQueue(queue);
  incrementQueuedOrders();
}

import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";

const IDEMPOTENCY_WINDOW_MS = 2 * 60 * 1000;
const recentIdempotencyKeys = new Set();

function isFirestoreTimestampLike(value) {
  return Boolean(value && typeof value === "object" && typeof value.toDate === "function");
}

function toEpochMs(value) {
  if (isFirestoreTimestampLike(value)) return value.toDate().getTime();
  const parsed = Date.parse(String(value ?? ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function normalizeItemsSignature(items) {
  const safeItems = Array.isArray(items) ? items : [];
  return JSON.stringify(
    safeItems
      .map((item) => ({
        name: String(item?.name ?? "").trim().toLowerCase(),
        qty: Number(item?.qty ?? 0),
        price: Number(item?.price ?? 0),
      }))
      .sort((a, b) => `${a.name}|${a.qty}|${a.price}`.localeCompare(`${b.name}|${b.qty}|${b.price}`))
  );
}

function hashString(input) {
  const str = String(input ?? "");
  let hash = 0;
  for (let i = 0; i < str.length; i += 1) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export function buildIdempotencyKey(payload) {
  const userId = String(payload?.userId ?? "anonymous");
  const itemsSignature = normalizeItemsSignature(payload?.items);
  const mode = String(payload?.mode ?? "delivery");
  const clientOrderId = String(payload?.clientOrderId ?? payload?.id ?? "no-client-id");
  const createdAtMs = toEpochMs(payload?.createdAt || new Date().toISOString());
  const timeBucket = Math.floor(createdAtMs / IDEMPOTENCY_WINDOW_MS);
  return `${userId}|${itemsSignature}|${mode}|${timeBucket}|${clientOrderId}`;
}

export function rememberIdempotencyKey(key) {
  recentIdempotencyKeys.add(key);
  setTimeout(() => {
    recentIdempotencyKeys.delete(key);
  }, 6 * 60 * 1000);
}

export async function checkIdempotencyDuplicate(
  { db, withRetry, ordersCollection },
  payload,
  idempotencyKey
) {
  try {
    const candidateId = String(payload?.id ?? payload?.clientOrderId ?? "").trim();
    if (candidateId) {
      const byId = await withRetry(() => getDoc(doc(db, ordersCollection, candidateId)));
      if (byId.exists()) {
        console.log("[V2 IDEMPOTENCY] duplicate write blocked");
        return { duplicate: true, onServer: true };
      }
    }

    if (recentIdempotencyKeys.has(idempotencyKey)) {
      console.log("[V2 IDEMPOTENCY] duplicate prevented via key match");
      return { duplicate: true, onServer: false };
    }

    const keyQuery = query(
      collection(db, ordersCollection),
      where("idempotencyKey", "==", idempotencyKey),
      limit(1)
    );
    const keySnap = await withRetry(() => getDocs(keyQuery));
    if (!keySnap.empty) {
      const existing = keySnap.docs[0];
      const data = existing?.data?.() ?? {};
      if (!existing?.id || typeof data !== "object") {
        console.log("[V2 IDEMPOTENCY] partial match treated as safe duplicate");
        return { duplicate: true, onServer: true, partialMatch: true };
      }
      console.log("[V2 IDEMPOTENCY] duplicate prevented via key match");
      return { duplicate: true, onServer: true };
    }

    return { duplicate: false, onServer: false };
  } catch (error) {
    console.warn("[V2 IDEMPOTENCY] fallback to retry system due to failure", error);
    return { duplicate: false, onServer: false, checkFailed: true };
  }
}

export function getDeterministicIdForKey(payload, idempotencyKey) {
  const preferred = String(payload?.clientOrderId ?? payload?.id ?? "").trim();
  if (preferred) return preferred;
  return `idem_${hashString(idempotencyKey)}`;
}

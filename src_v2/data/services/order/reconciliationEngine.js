import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";

const RECONCILE_WINDOW_MS = 2 * 60 * 1000;
const RECONCILE_TIMEOUT_MS = 3000;

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

export async function findServerDuplicate({ db, withRetry, ordersCollection }, candidate) {
  try {
    const candidateId = String(candidate?.id ?? "").trim();
    const candidateUserId = String(candidate?.userId ?? "").trim();
    const candidateItemsSig = normalizeItemsSignature(candidate?.items);
    const createdAtMs = toEpochMs(candidate?.createdAt || new Date().toISOString());

    if (candidateId) {
      const byIdSnap = await withRetry(() => getDoc(doc(db, ordersCollection, candidateId)));
      if (byIdSnap.exists()) {
        return { hasDuplicate: true, duplicate: { id: byIdSnap.id, ...byIdSnap.data() } };
      }
    }

    if (!candidateUserId) return { hasDuplicate: false };

    const fromIso = new Date(createdAtMs - RECONCILE_WINDOW_MS).toISOString();
    const toIso = new Date(createdAtMs + RECONCILE_WINDOW_MS).toISOString();
    const q = query(
      collection(db, ordersCollection),
      where("userId", "==", candidateUserId),
      where("createdAt", ">=", fromIso),
      where("createdAt", "<=", toIso),
      limit(25)
    );
    const snap = await Promise.race([
      withRetry(() => getDocs(q)),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("RECONCILE_TIMEOUT")), RECONCILE_TIMEOUT_MS)
      ),
    ]);
    const duplicateDoc = snap.docs.find((d) => {
      const data = d.data();
      return normalizeItemsSignature(data?.items) === candidateItemsSig;
    });

    if (duplicateDoc) {
      return { hasDuplicate: true, duplicate: { id: duplicateDoc.id, ...duplicateDoc.data() } };
    }
    return { hasDuplicate: false };
  } catch (error) {
    if (String(error?.message ?? "").includes("RECONCILE_TIMEOUT")) {
      console.warn("[V2 RECONCILE] timeout fallback activated");
      return { hasDuplicate: false, timeoutFallback: true };
    }
    console.warn("[V2 RECONCILE] fallback to local validation due to query failure", error);
    return { hasDuplicate: false, queryFailed: true };
  }
}

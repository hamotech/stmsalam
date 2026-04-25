import { doc, runTransaction } from "firebase/firestore";

const MAX_TXN_RETRY_ATTEMPTS_PER_ORDER = 3;
const txnAttemptTracker = new Map();

export async function transactionalCreateOrder(
  { db, withRetry, ordersCollection, trackingCollection },
  payload,
  idempotencyKey,
  deterministicId,
  rememberIdempotencyKey
) {
  const ordersRef = doc(db, ordersCollection, deterministicId);
  const trackingRef = doc(db, trackingCollection, deterministicId);
  const transactionBody = {
    ...payload,
    idempotencyKey,
  };

  const attemptKey = deterministicId;
  const existingAttempts = txnAttemptTracker.get(attemptKey) ?? 0;
  if (existingAttempts >= MAX_TXN_RETRY_ATTEMPTS_PER_ORDER) {
    console.warn("[V2 TXN] max retry threshold reached, aborting safely");
    throw new Error("TXN_MAX_RETRY_REACHED");
  }

  txnAttemptTracker.set(attemptKey, existingAttempts + 1);
  try {
    await withRetry(() =>
      runTransaction(db, async (tx) => {
        const orderSnap = await tx.get(ordersRef);
        if (orderSnap.exists()) {
          throw new Error("IDEMPOTENT_DUPLICATE_BLOCKED");
        }
        tx.set(ordersRef, transactionBody);
        tx.set(trackingRef, transactionBody, { merge: true });
      })
    ).catch((error) => {
      if (String(error?.message ?? "").includes("IDEMPOTENT_DUPLICATE_BLOCKED")) {
        throw error;
      }
      console.warn("[V2 IDEMPOTENCY] fallback to retry system due to failure", error);
      throw error;
    });
  } catch (error) {
    const currentAttempts = txnAttemptTracker.get(attemptKey) ?? 0;
    if (currentAttempts >= MAX_TXN_RETRY_ATTEMPTS_PER_ORDER) {
      console.warn("[V2 TXN] max retry threshold reached, aborting safely");
    }
    throw error;
  }

  rememberIdempotencyKey(idempotencyKey);
  txnAttemptTracker.delete(attemptKey);
  return deterministicId;
}

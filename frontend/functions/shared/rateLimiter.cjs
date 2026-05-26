module.exports = function createRateLimiter({ admin } = {}) {
  if (!admin?.firestore?.FieldValue?.serverTimestamp) {
    throw new Error('Service dependency violation: use bootstrap injection only');
  }

  function bucketStart(windowMs, nowMs = Date.now()) {
    return Math.floor(nowMs / windowMs) * windowMs;
  }

  function limiterRef(db, key, windowMs, nowMs = Date.now()) {
    const start = bucketStart(windowMs, nowMs);
    return db.collection('rate_limits').doc(`${key}_${windowMs}_${start}`);
  }

  async function checkRateLimit({ db, key, limit, windowMs }) {
    const ref = limiterRef(db, key, windowMs);
    const snap = await ref.get();
    const count = snap.exists ? Number(snap.data()?.count || 0) : 0;
    return {
      allowed: count < limit,
      count,
      limit,
      windowMs,
    };
  }

  async function increment({ db, key, limit, windowMs, metadata = {} }) {
    const ref = limiterRef(db, key, windowMs);
    const result = await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      const prev = snap.exists ? Number(snap.data()?.count || 0) : 0;
      const next = prev + 1;
      tx.set(
        ref,
        {
          key,
          count: next,
          limit,
          windowMs,
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          expireAt: admin.firestore.Timestamp.fromMillis(Date.now() + windowMs * 2),
        },
        { merge: true }
      );
      return { allowed: next <= limit, count: next, limit };
    });

    if (!result.allowed) {
      await db.collection('rate_limit_abuse_logs').add({
        key,
        count: result.count,
        limit,
        windowMs,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
        metadata,
      });
    }

    return result;
  }

  return {
    checkRateLimit,
    increment,
  };
};

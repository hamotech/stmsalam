module.exports = function createIdempotencyService({ admin } = {}) {
  if (!admin?.firestore?.FieldValue?.serverTimestamp) {
    throw new Error('Service dependency violation: use bootstrap injection only');
  }

  function keyRef(db, key) {
    return db.collection('idempotency_keys').doc(String(key));
  }

  async function getProcessedResult({ db, key }) {
    const snap = await keyRef(db, key).get();
    if (!snap.exists) return null;
    const data = snap.data() || {};
    if (data.status !== 'completed') return null;
    return data.result || { ok: true };
  }

  async function reserveKey({ db, key, metadata = {} }) {
    const ref = keyRef(db, key);
    return db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      if (snap.exists) {
        const d = snap.data() || {};
        return { reserved: false, status: d.status || 'unknown', result: d.result || null };
      }
      tx.set(ref, {
        key,
        status: 'reserved',
        metadata,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      return { reserved: true };
    });
  }

  async function completeKey({ db, key, result = {} }) {
    await keyRef(db, key).set(
      {
        status: 'completed',
        result,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  }

  return {
    getProcessedResult,
    reserveKey,
    completeKey,
  };
};

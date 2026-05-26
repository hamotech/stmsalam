module.exports = function createOrderRebuildService({
  readCanonicalOrderStatusStrict,
  assertValidOrderTransition,
} = {}) {
  if (
    typeof readCanonicalOrderStatusStrict !== 'function' ||
    typeof assertValidOrderTransition !== 'function'
  ) {
    throw new Error('Service dependency violation: use bootstrap injection only');
  }

  async function rebuildOrderStateFromEvents(db, orderId) {
    const orderRef = db.collection('orders').doc(orderId);
    const orderSnap = await orderRef.get();
    if (!orderSnap.exists) {
      return {
        status: null,
        paymentStatus: null,
        lastValidState: null,
        historyLength: 0,
      };
    }

    const base = orderSnap.data() || {};
    let lastValidState = readCanonicalOrderStatusStrict(base, {
      strict: false,
      logger: (m, p) => console.warn('[rebuildOrderStateFromEvents]', m, p || {}),
    });

    const eventsSnap = await db
      .collection('order_events')
      .doc(orderId)
      .collection('events')
      .orderBy('timestamp', 'asc')
      .get();

    for (const d of eventsSnap.docs) {
      const ev = d.data() || {};
      if (ev.type !== 'ORDER_STATUS_CHANGED') continue;
      const from = String(ev.from || '').trim().toLowerCase();
      const to = String(ev.to || '').trim().toLowerCase();
      const actor = String(ev.actor || '').trim().toLowerCase();
      try {
        assertValidOrderTransition(lastValidState || from, to, actor);
        lastValidState = to;
      } catch (e) {
        console.warn('[rebuildOrderStateFromEvents] invalid event skipped', {
          orderId,
          eventId: d.id,
          from,
          to,
          actor,
          reason: e instanceof Error ? e.message : String(e),
        });
      }
    }

    return {
      status: lastValidState,
      paymentStatus: String(base.paymentStatus || ''),
      lastValidState,
      historyLength: eventsSnap.size,
    };
  }

  return {
    rebuildOrderStateFromEvents,
  };
};

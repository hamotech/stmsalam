import React, { useEffect, useState } from 'react';
import {
  subscribeOrders,
  normalizeOrderLineItems,
} from '../services/dataService';
import { db } from '../../lib/firebase';
import { doc, updateDoc, serverTimestamp, collection, query, where, onSnapshot } from 'firebase/firestore';
import { Bike, CheckCircle, Package, XCircle } from 'lucide-react';
import { safeLog } from '../../utils/runtimeSafety';

const RidersDispatch = () => {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [riderUid, setRiderUid] = useState({});
  const [riders, setRiders] = useState([]);
  const [busyId, setBusyId] = useState(null);

  const normalizeStatus = (order) => {
    const s = String(order?.status || order?.orderStatus || order?.stage || '')
      .trim()
      .toLowerCase()
      .replace(/[\s-]+/g, '_');
    if (s === 'placed') return 'pending';
    if (s === 'out_for_delivery' || s === 'delivering') return 'assigned';
    return s || 'pending';
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  useEffect(() => {
    const unsub = subscribeOrders((ords) => {
      setOrders(ords);
      if (import.meta.env.DEV) {
        ords.forEach((o) => console.debug('[DispatchListener]', { orderId: o.id, status: normalizeStatus(o) }));
      }
    });
    return () => { if (unsub) unsub(); };
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('role', '==', 'rider'));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ uid: d.id, ...d.data() }));
      setRiders(list);
    });
    return () => unsub();
  }, []);

  const riderOrders = orders.filter((o) => {
    const st = normalizeStatus(o);
    return st === 'ready' || st === 'assigned' || st === 'picked_up';
  });

  /** Same account, multiple READY rows = multiple `orders` docs (e.g. double checkout), not “two riders for one job”. */
  const sameCustomerMultiReady = (() => {
    const readyOnly = riderOrders.filter((o) => normalizeStatus(o) === 'ready');
    const byUid = new Map();
    for (const o of readyOnly) {
      const u = String(o.userId || o.user_id || '').trim();
      if (!u) continue;
      if (!byUid.has(u)) byUid.set(u, []);
      byUid.get(u).push(o);
    }
    return [...byUid.values()].filter((list) => list.length >= 2);
  })();

  const run = async (id, fn) => {
    if (busyId) return;
    setBusyId(id);
    try {
      await fn();
      showToast('Updated');
    } catch (e) {
      showToast(e.message || 'Failed', 'error');
    } finally {
      setBusyId(null);
    }
  };

  const updateDispatchOrder = async (orderId, patch) => {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      ...patch,
      updatedAt: serverTimestamp(),
    });
    if (typeof patch?.status === 'string') {
      safeLog('Status Updated →', patch.status);
    }
  };

  return (
    <div style={{ padding: '20px', minHeight: '80vh' }}>
      {toast.show && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: toast.type === 'error' ? '#ef4444' : '#013220', color: 'white', padding: '14px 28px', borderRadius: '14px', fontWeight: '900', zIndex: 9999 }}>
          {toast.type === 'error' ? <XCircle size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} /> : <CheckCircle size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />}
          {toast.message}
        </div>
      )}

      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '950', color: '#0f172a' }}>Riders · Dispatch</h2>
        <p style={{ color: '#64748b', fontWeight: 600 }}>
          One card = one order in the database. The same person can have several cards if checkout was run more than once (each needs its own assign / delivery or you cancel the duplicate in Orders).
        </p>
      </div>

      {sameCustomerMultiReady.length > 0 ? (
        <div
          style={{
            marginBottom: '16px',
            padding: '14px 18px',
            borderRadius: '14px',
            background: '#fffbeb',
            border: '1px solid #fcd34d',
            color: '#92400e',
            fontWeight: 700,
            fontSize: '13px',
            lineHeight: 1.5,
          }}
        >
          <strong>Same customer, multiple READY tickets below</strong> (
          {sameCustomerMultiReady.reduce((n, list) => n + list.length, 0)} orders). This is not the app duplicating riders — it is separate order documents. You can assign the same rider UID to each or void the spare order.
        </div>
      ) : null}

      <div style={{ display: 'grid', gap: '16px' }}>
        {riderOrders.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontWeight: '800', background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            No orders ready for dispatch.
          </div>
        ) : riderOrders.map((order) => {
          const st = normalizeStatus(order);
          const id = order.id;
          const busy = busyId === id;
          const short = id?.slice(-8).toUpperCase();
          const currentRiderId = order.riderId || null;
          const lineItems = normalizeOrderLineItems(order);
          const accountUid = String(order.userId || order.user_id || '').trim();

          return (
            <div key={id} style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '22px' }}>
              <div style={{ fontWeight: '950', fontSize: '18px', color: '#0f172a' }}>#{short}</div>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700', marginTop: '6px' }}>
                {st.replace(/_/g, ' ')}
                {currentRiderId ? ` · Rider: ${currentRiderId}` : ''}
              </div>
              {accountUid ? (
                <div style={{ marginTop: '6px', fontSize: '12px', color: '#94a3b8', fontWeight: 700 }} title={accountUid}>
                  Customer · …{accountUid.slice(-8)}
                </div>
              ) : null}
              <div style={{ marginTop: '10px', fontSize: '13px', color: '#334155', fontWeight: '600' }}>
                {(order.customer?.address || '—')}
              </div>
              {lineItems.length > 0 ? (
                <ul style={{ marginTop: '14px', marginBottom: 0, paddingLeft: '20px', color: '#334155', fontWeight: '600', fontSize: '14px', lineHeight: 1.6 }}>
                  {lineItems.map((i, idx) => (
                    <li key={`${id}-${idx}`}>{i.qty}× {i.name}</li>
                  ))}
                </ul>
              ) : (
                <div style={{ marginTop: '12px', fontSize: '13px', color: '#94a3b8', fontWeight: '700' }}>No line items on document</div>
              )}

              {st === 'ready' ? (
                <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '420px' }}>
                  <input
                    placeholder="Rider UID"
                    value={riderUid[id] || ''}
                    onChange={(e) => setRiderUid((p) => ({ ...p, [id]: e.target.value }))}
                    style={{ padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontWeight: '600' }}
                  />
                  {riders.length > 0 && (
                    <select
                      value={riderUid[id] || ''}
                      onChange={(e) => setRiderUid((p) => ({ ...p, [id]: e.target.value }))}
                      style={{ padding: '10px 14px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontWeight: '600' }}
                    >
                      <option value="">Select rider (UID)</option>
                      {riders.map((r) => (
                        <option key={r.uid} value={r.uid}>
                          {(r.name || r.email || 'Rider')} · {r.uid}
                        </option>
                      ))}
                    </select>
                  )}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => run(id, async () => {
                        const assignedRiderId = String(riderUid[id] || '').trim();
                        if (!assignedRiderId) throw new Error('Rider ID required.');
                        if (riders.length > 0 && !riders.some((r) => r.uid === assignedRiderId)) {
                          throw new Error('Rider UID mismatch. Pick from list.');
                        }
                        safeLog('Assign Rider →', assignedRiderId);
                        await updateDispatchOrder(id, {
                          riderId: assignedRiderId,
                          status: 'assigned',
                          'timestamps.assignedAt': serverTimestamp(),
                        });
                      })}
                      style={{ padding: '10px 18px', borderRadius: '12px', border: 'none', fontWeight: '900', background: '#0A8754', color: 'white', cursor: busy ? 'wait' : 'pointer' }}
                    >
                      <Bike size={16} /> Assign Rider
                    </button>
                  </div>
                </div>
              ) : null}

              {st === 'assigned' ? (
                <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => run(id, async () => {
                      await updateDispatchOrder(id, {
                        status: 'picked_up',
                        riderId: currentRiderId || null,
                        'timestamps.pickedUpAt': serverTimestamp(),
                      });
                    })}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px', border: 'none', fontWeight: '900', background: '#0369a1', color: 'white', cursor: busy ? 'wait' : 'pointer' }}
                  >
                    <Package size={18} /> Mark Picked Up
                  </button>
                </div>
              ) : null}

              {st === 'picked_up' ? (
                <div style={{ marginTop: '14px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => run(id, async () => {
                      await updateDispatchOrder(id, {
                        status: 'delivered',
                        riderId: currentRiderId || null,
                        'timestamps.deliveredAt': serverTimestamp(),
                      });
                    })}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px', border: 'none', fontWeight: '900', background: '#013220', color: 'white', cursor: busy ? 'wait' : 'pointer' }}
                  >
                    <CheckCircle size={18} /> Mark Delivered
                  </button>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RidersDispatch;

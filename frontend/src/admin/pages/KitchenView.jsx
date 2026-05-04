import React, { useEffect, useState } from 'react';
import { subscribeOrders, updateOrderStatus, normalizeOrderLineItems } from '../services/dataService';
import { ChefHat, Package, CheckCircle, XCircle } from 'lucide-react';

const KitchenView = () => {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  const normalizeStatus = (order) => {
    const s = String(order?.status || order?.orderStatus || order?.stage || '')
      .trim()
      .toLowerCase()
      .replace(/[\s-]+/g, '_');
    if (s === 'placed') return 'pending';
    if (s === 'out_for_delivery' || s === 'delivering') return 'assigned';
    return s || 'pending';
  };

  useEffect(() => {
    const unsub = subscribeOrders((ords) => {
      setOrders(ords);
      if (import.meta.env.DEV) {
        ords.forEach((o) => console.debug('[KitchenListener]', { orderId: o.id, status: normalizeStatus(o) }));
      }
    });
    return () => { if (unsub) unsub(); };
  }, []);

  const kitchenOrders = orders.filter((o) => {
    const st = normalizeStatus(o);
    return st === 'pending' || st === 'confirmed' || st === 'preparing' || st === 'ready';
  });

  const onAdvance = async (order, next) => {
    try {
      await updateOrderStatus(order.id, next);
      showToast(`#${order.id?.slice(-8)} -> ${next.replace(/_/g, ' ')}`);
    } catch (e) {
      showToast(e.message || 'Failed', 'error');
    }
  };

  return (
    <div style={{ padding: '20px', position: 'relative', minHeight: '80vh' }}>
      {toast.show && (
        <div style={{ position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', background: toast.type === 'error' ? '#ef4444' : '#013220', color: 'white', padding: '14px 28px', borderRadius: '14px', fontWeight: '900', zIndex: 9999 }}>
          {toast.type === 'error' ? <XCircle size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} /> : <CheckCircle size={18} style={{ verticalAlign: 'middle', marginRight: 8 }} />}
          {toast.message}
        </div>
      )}

      <div style={{ marginBottom: '28px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '950', color: '#0f172a' }}>Kitchen view</h2>
        <p style={{ color: '#64748b', fontWeight: 600 }}>Queue after acceptance — no payments or riders here.</p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {kitchenOrders.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontWeight: '800', background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            No orders in kitchen queue (confirmed / preparing / ready).
          </div>
        ) : kitchenOrders.map((order) => {
          const st = normalizeStatus(order);
          const items = normalizeOrderLineItems(order);

          return (
            <div key={order.id} style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '22px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                <div>
                  <div style={{ fontWeight: '950', fontSize: '18px', color: '#0f172a' }}>#{order.id?.slice(-8).toUpperCase()}</div>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700', marginTop: '6px' }}>{st.replace(/_/g, ' ')}</div>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {st === 'pending' ? (
                    <button
                      type="button"
                      onClick={() => onAdvance(order, 'confirmed')}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px', border: 'none', fontWeight: '900', cursor: 'pointer',
                        background: '#0A8754', color: 'white',
                      }}
                    >
                      <ChefHat size={18} /> Confirm Order
                    </button>
                  ) : null}
                  {st === 'confirmed' ? (
                    <button
                      type="button"
                      onClick={() => onAdvance(order, 'preparing')}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px', border: 'none', fontWeight: '900', cursor: 'pointer',
                        background: '#0A8754', color: 'white',
                      }}
                    >
                      <ChefHat size={18} /> Start Preparing
                    </button>
                  ) : null}
                  {st === 'preparing' ? (
                    <button
                      type="button"
                      onClick={() => onAdvance(order, 'ready')}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 18px', borderRadius: '12px', border: 'none', fontWeight: '900', cursor: 'pointer',
                        background: '#0369a1', color: 'white',
                      }}
                    >
                      <Package size={18} /> Mark Ready
                    </button>
                  ) : null}
                  {st === 'ready' ? (
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#075985', alignSelf: 'center' }}>Hand off in Riders tab →</span>
                  ) : null}
                </div>
              </div>
              <ul style={{ marginTop: '16px', paddingLeft: '20px', color: '#334155', fontWeight: '600', fontSize: '14px', lineHeight: 1.6 }}>
                {items.map((i, idx) => (
                  <li key={idx}>{i.qty}× {i.name}</li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KitchenView;

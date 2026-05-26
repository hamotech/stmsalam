import React, { useEffect, useState } from 'react';
import { subscribeOrders, advanceOrderPipeline, normalizeOrderLineItems } from '../services/dataService';
import { readCanonicalOrderStatus } from '../../domain/orderStateMachine.js';
import { ChefHat, Package, CheckCircle, XCircle } from 'lucide-react';

const KitchenView = () => {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3500);
  };

  useEffect(() => {
    const unsub = subscribeOrders((ords) => {
      setOrders(ords);
    });
    return () => {
      if (unsub) unsub();
    };
  }, []);

  const kitchenOrders = orders.filter((o) => {
    const st = readCanonicalOrderStatus(o);
    return st === 'preparing' || st === 'ready_for_pickup';
  });

  const onAdvance = async (order, nextCanonical) => {
    try {
      await advanceOrderPipeline(order.id, order, nextCanonical);
      showToast(`#${order.id?.slice(-8)} → ${nextCanonical.replace(/_/g, ' ')}`);
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
        <p style={{ color: '#64748b', fontWeight: 600 }}>Queue after ops acceptance — preparing → ready_for_pickup only.</p>
      </div>

      <div style={{ display: 'grid', gap: '16px' }}>
        {kitchenOrders.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center', color: '#94a3b8', fontWeight: '800', background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            No orders in kitchen queue (preparing / ready_for_pickup).
          </div>
        ) : (
          kitchenOrders.map((order) => {
            const st = readCanonicalOrderStatus(order);
            const items = normalizeOrderLineItems(order);

            return (
              <div key={order.id} style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', padding: '22px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <div style={{ fontWeight: '950', fontSize: '18px', color: '#0f172a' }}>#{order.id?.slice(-8).toUpperCase()}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700', marginTop: '6px' }}>{st.replace(/_/g, ' ')}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    {st === 'preparing' ? (
                      <button
                        type="button"
                        onClick={() => onAdvance(order, 'ready_for_pickup')}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '10px 18px',
                          borderRadius: '12px',
                          border: 'none',
                          fontWeight: '900',
                          cursor: 'pointer',
                          background: '#0369a1',
                          color: 'white',
                        }}
                      >
                        <Package size={18} /> Mark Ready
                      </button>
                    ) : null}
                    {st === 'ready_for_pickup' ? (
                      <span style={{ fontSize: '13px', fontWeight: '800', color: '#075985', alignSelf: 'center' }}>Hand off in Riders tab →</span>
                    ) : null}
                    {st === 'preparing' ? (
                      <span style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', alignSelf: 'center' }}>
                        <ChefHat size={14} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                        In kitchen
                      </span>
                    ) : null}
                  </div>
                </div>
                <ul style={{ marginTop: '16px', paddingLeft: '20px', color: '#334155', fontWeight: '600', fontSize: '14px', lineHeight: 1.6 }}>
                  {items.map((i, idx) => (
                    <li key={idx}>
                      {i.qty}× {i.name}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default KitchenView;

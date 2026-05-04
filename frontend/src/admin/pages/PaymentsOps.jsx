import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeOrders } from '../services/dataService';
import { normalizeGrabOrderStatus, normalizePaymentMethod, normalizeCanonicalPaymentStatus } from '../orderPipeline.js';
import { CreditCard } from 'lucide-react';

const PaymentsOps = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const unsub = subscribeOrders((ords) => setOrders(ords));
    return () => { if (unsub) unsub(); };
  }, []);

  const recent = [...orders].slice(0, 80);

  return (
    <div style={{ padding: '20px', minHeight: '80vh' }}>
      <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '28px', fontWeight: '950', color: '#0f172a' }}>Payments</h2>
          <p style={{ color: '#64748b', fontWeight: 600 }}>Stripe must be PAID before confirm · QR pending highlighted.</p>
        </div>
        <Link to="/admin/orders" style={{ fontWeight: '900', color: '#0A8754', textDecoration: 'none' }}>Open full orders →</Link>
      </div>

      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, fontSize: '13px' }}>
          <thead>
            <tr style={{ background: '#f8fafc', color: '#64748b', textAlign: 'left', fontWeight: '900', textTransform: 'uppercase', fontSize: '11px' }}>
              <th style={{ padding: '16px' }}>Order</th>
              <th style={{ padding: '16px' }}>Method</th>
              <th style={{ padding: '16px' }}>Pay status</th>
              <th style={{ padding: '16px' }}>Pipeline</th>
              <th style={{ padding: '16px' }}>Flags</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((o, idx) => {
              const method = normalizePaymentMethod(o);
              const ps = normalizeCanonicalPaymentStatus(o);
              const st = normalizeGrabOrderStatus(o);
              const qrPending = method === 'qr' && ps !== 'PAID';
              const stripePending = (method === 'stripe' || method === 'paypal') && ps !== 'PAID';
              return (
                <tr key={o.id} style={{ background: idx % 2 ? '#fcfdfe' : 'white', borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px', fontWeight: '900' }}>#{o.id?.slice(-8).toUpperCase()}</td>
                  <td style={{ padding: '14px 16px', fontWeight: '700' }}>{method || '—'}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontWeight: '950',
                      color: ps === 'PAID' ? '#15803d' : ps === 'PENDING_VERIFICATION' ? '#b45309' : '#64748b',
                    }}>{ps}</span>
                  </td>
                  <td style={{ padding: '14px 16px', fontWeight: '700' }}>{st}</td>
                  <td style={{ padding: '14px 16px' }}>
                    {qrPending ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fff7ed', color: '#c2410c', padding: '4px 10px', borderRadius: '8px', fontWeight: '900', fontSize: '11px' }}>
                        <CreditCard size={12} /> QR verify
                      </span>
                    ) : null}
                    {stripePending ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#fef2f2', color: '#b91c1c', padding: '4px 10px', borderRadius: '8px', fontWeight: '900', fontSize: '11px', marginLeft: qrPending ? 8 : 0 }}>
                        Await verify
                      </span>
                    ) : null}
                    {!qrPending && !stripePending ? <span style={{ color: '#94a3b8' }}>—</span> : null}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentsOps;

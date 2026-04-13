import React, { useState, useEffect } from 'react';
import {
  subscribeOrders,
  updateOrderStatus,
  deleteOrder,
} from '../services/dataService';
import { Trash2, CheckCircle, XCircle } from 'lucide-react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000);
  };

  // ── Real-time Firestore subscription ──────────────────────────────────────
  useEffect(() => {
    const unsub = subscribeOrders((ords) => setOrders(ords));
    return () => unsub();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const confirmDelete = async () => {
    const id = deleteModal.id;
    setDeleteModal({ show: false, id: null });
    if (!id) return;
    try {
      await deleteOrder(id);
      showToast('Order deleted successfully.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const handleDeleteOrder = (id) => setDeleteModal({ show: true, id });

  return (
    <div style={{ position: 'relative' }}>
      {toast.show && (
        <div style={{ position: 'fixed', top: '20px', right: '20px', background: toast.type === 'error' ? '#ef4444' : '#10b981', color: 'white', padding: '16px 24px', borderRadius: '12px', fontWeight: 'bold', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px' }}>
          {toast.type === 'error' ? <XCircle size={20} /> : <CheckCircle size={20} />}
          {toast.message}
        </div>
      )}

      {deleteModal.show && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '24px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
              <Trash2 size={32} color="#ef4444" />
            </div>
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>Delete Order?</h3>
            <p style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.5', marginBottom: '32px' }}>Are you sure you want to permanently delete this order? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setDeleteModal({ show: false, id: null })} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 'bold', color: '#475569', cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmDelete} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.2)' }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1e293b', marginBottom: '24px' }}>Orders Management</h2>
      <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#f8fafc' }}>
            <tr style={{ textAlign: 'left', color: '#64748b' }}>
              <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>Order ID</th>
              <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>Customer</th>
              <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>Date</th>
              <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>Total</th>
              <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
              <th style={{ padding: '16px', borderBottom: '1px solid #e2e8f0' }}>Update</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '16px', fontWeight: 'bold' }}>{order.id}</td>
                <td style={{ padding: '16px' }}>{order.customer?.name || order.customer}</td>
                <td style={{ padding: '16px', color: '#64748b' }}>{new Date(order.date).toLocaleString()}</td>
                <td style={{ padding: '16px', fontWeight: 'bold' }}>${(parseFloat(order.total) || 0).toFixed(2)}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    backgroundColor: order.status === 'Pending' ? '#fef3c7' : order.status === 'Delivered' ? '#dcfce7' : '#e0f2fe',
                    color: order.status === 'Pending' ? '#d97706' : order.status === 'Delivered' ? '#16a34a' : '#0284c7'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none' }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Ready">Ready</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: '8px', borderRadius: '6px', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: '0.2s' }}
                      title="Delete Order"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '60px', textAlign: 'center', color: '#94a3b8', fontWeight: 'bold' }}>
                  ⏳ Loading orders from database...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

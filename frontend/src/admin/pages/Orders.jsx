import React, { useState, useEffect } from 'react';
import {
  subscribeOrders,
  advanceOrderPipeline,
  deleteOrder,
  markOrderAsSeen,
  normalizeOrderLineItems,
} from '../services/dataService';
import {
  normalizeGrabOrderStatus,
  nextPipelineStep,
  orderMatchesPaymentFilter,
  paymentAllowsConfirm,
} from '../orderPipeline.js';
import { db } from '../../lib/firebase';
import { updateDoc, doc } from 'firebase/firestore';
import { 
  Trash2, CheckCircle, XCircle, Clock, Truck, 
  Package, MessageSquare, ExternalLink, CreditCard,
  ChefHat, Bike, CheckCircle2, MoreVertical, RefreshCcw, MessageCircle, Phone, Bell, X, Send, Printer
} from 'lucide-react';
import { printCustomerBill } from '../../utils/customerBillPrint';
import { useAuth } from '../../context/AuthContext';
import ChatWindow from '../../components/ChatWindow';

const Orders = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [lifecycleFilter, setLifecycleFilter] = useState('active');
  const [payFilter, setPayFilter] = useState('all');
  const [activeChatOrderId, setActiveChatOrderId] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  useEffect(() => {
    const unsub = subscribeOrders((ords) => setOrders(ords));
    return () => { if (unsub) unsub(); }
  }, []);

  const handleAdvance = async (order, nextStatus) => {
    try {
      await advanceOrderPipeline(order.id, order, nextStatus);
      if (order.isNewForAdmin) markOrderAsSeen(order.id);
      showToast(`Order → ${String(nextStatus).replace(/_/g, ' ')}`);
    } catch (err) {
      showToast(err.message || 'Update failed', 'error');
    }
  };

  const openChat = (id) => {
    setActiveChatOrderId(id);
    markOrderAsSeen(id);
  };

  const handlePaymentToggle = async (order) => {
    try {
      const newPaymentStatus = order.payment_status === 'paid' ? 'pending' : 'paid';
      const orderRef = doc(db, 'orders', order.id);
      await updateDoc(orderRef, {
        payment_status: newPaymentStatus,
        paymentStatus: newPaymentStatus === 'paid' ? 'PAID' : 'PENDING',
      });
      if (order.isNewForAdmin) markOrderAsSeen(order.id);
      showToast(`Payment marked as ${newPaymentStatus}`);
    } catch (err) {
      showToast('Failed to update payment status.', 'error');
    }
  }

  const confirmDelete = async () => {
    const id = deleteModal.id;
    setDeleteModal({ show: false, id: null });
    if (!id) return;
    try {
      await deleteOrder(id);
      showToast('Order permanently removed.');
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const filteredOrders = orders.filter((o) => {
    if (!orderMatchesPaymentFilter(o, payFilter)) return false;
    if (lifecycleFilter === 'all') return true;
    const st = normalizeGrabOrderStatus(o);
    const done = st === 'DELIVERED' || st === 'CANCELLED';
    if (lifecycleFilter === 'delivered') return st === 'DELIVERED';
    if (lifecycleFilter === 'active') return !done;
    return true;
  });

  const getStatusStyle = (order) => {
    const st = normalizeGrabOrderStatus(order);
    switch (st) {
      case 'CONFIRMED': return { bg: '#f0fdf4', text: '#166534', icon: <CheckCircle2 size={14} /> };
      case 'PREPARING': return { bg: '#f0fdf4', text: '#166534', icon: <ChefHat size={14} /> };
      case 'READY': return { bg: '#f0f9ff', text: '#075985', icon: <Package size={14} /> };
      case 'OUT_FOR_DELIVERY': return { bg: '#fef2f2', text: '#991b1b', icon: <Truck size={14} /> };
      case 'DELIVERED': return { bg: '#f0fdf4', text: '#15803d', icon: <CheckCircle2 size={14} /> };
      case 'CANCELLED': return { bg: '#fee2e2', text: '#991b1b', icon: <XCircle size={14} /> };
      default: return { bg: '#fff7ed', text: '#9a3412', icon: <Clock size={14} /> };
    }
  };

  return (
    <div style={{ padding: '20px', position: 'relative', minHeight: '80vh' }}>
      {/* Toast */}
      {toast.show && (
        <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', background: toast.type === 'error' ? '#ef4444' : '#013220', color: 'white', padding: '16px 32px', borderRadius: '16px', fontWeight: '900', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '12px' }}>
          {toast.type === 'error' ? <XCircle size={20} /> : <CheckCircle size={20} />}
          {toast.message}
        </div>
      )}

      {/* Chat Sidebar/Modal */}
      {activeChatOrderId && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10001, display: 'flex', justifyContent: 'flex-end', background: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(4px)' }}>
          <div style={{ width: '100%', maxWidth: '450px', height: '100%', animation: 'slideIn 0.3s ease-out' }}>
             <ChatWindow 
               orderId={activeChatOrderId} 
               role="admin" 
               senderId={user?.uid || 'admin'} 
               onClose={() => setActiveChatOrderId(null)} 
             />
          </div>
          <style>{`@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }`}</style>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteModal.show && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '32px', maxWidth: '400px', width: '100%', boxShadow: '0 30px 60px rgba(0,0,0,0.3)', textAlign: 'center' }}>
            <div style={{ width: '80px', height: '80px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><Trash2 size={40} color="#ef4444" /></div>
            <h3 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', marginBottom: '12px' }}>Delete Order permanently?</h3>
            <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>This action is irreversible.</p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => setDeleteModal({ show: false, id: null })} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: '1.5px solid #e2e8f0', background: 'white', fontWeight: '800', cursor: 'pointer' }}>Cancel</button>
              <button onClick={confirmDelete} style={{ flex: 1, padding: '16px', borderRadius: '16px', border: 'none', background: '#ef4444', color: 'white', fontWeight: '800', cursor: 'pointer' }}>Delete Order</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div>
            <h2 style={{ fontSize: '32px', fontWeight: '950', color: '#0f172a', letterSpacing: '-1px' }}>Operations · Orders</h2>
            <p style={{ color: '#64748b', fontWeight: 600 }}>Strict pipeline — one stage at a time (Grab-style).</p>
          </div>
          {orders.filter(o => o.isNewForAdmin).length > 0 && (
            <div style={{ background: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px', animation: 'bounce 1s infinite' }}>
              <Bell size={14} /> {orders.filter(o => o.isNewForAdmin).length} NEW ORDERS
            </div>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
          <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            {[
              ['all', 'All'],
              ['active', 'Active'],
              ['delivered', 'Delivered'],
            ].map(([t, label]) => (
              <button key={t} type="button" onClick={() => setLifecycleFilter(t)} style={{ padding: '8px 16px', borderRadius: '10px', border: 'none', background: lifecycleFilter === t ? 'white' : 'transparent', color: lifecycleFilter === t ? '#0f172a' : '#64748b', fontWeight: '800', cursor: 'pointer', fontSize: '13px' }}>{label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', background: '#ecfeff', padding: '4px', borderRadius: '12px', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '2px' }}>
            {[
              ['all', 'All pay'],
              ['cod', 'COD'],
              ['stripe_paid', 'Stripe / paid'],
              ['qr_pending', 'QR pending'],
            ].map(([t, label]) => (
              <button key={t} type="button" onClick={() => setPayFilter(t)} style={{ padding: '8px 12px', borderRadius: '10px', border: 'none', background: payFilter === t ? 'white' : 'transparent', color: payFilter === t ? '#0e7490' : '#64748b', fontWeight: '800', cursor: 'pointer', fontSize: '12px' }}>{label}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', overflowX: 'auto', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0 }}>
          <thead>
            <tr style={{ background: '#f8fafc', color: '#64748b', textAlign: 'left', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' }}>
              <th style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>Order Details</th>
              <th style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>Customer</th>
              <th style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>Items & Total</th>
              <th style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>Payment</th>
              <th style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>Stage</th>
              <th style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, idx) => {
              const pipelineSt = normalizeGrabOrderStatus(order);
              const nextSt = nextPipelineStep(pipelineSt);
              const confirmGate = pipelineSt === 'PLACED' ? paymentAllowsConfirm(order) : { ok: true };
              const statusStyle = getStatusStyle(order);
              const items = normalizeOrderLineItems(order);
              const isNew = order.isNewForAdmin;
              
              return (
                <tr 
                  key={order.id} 
                  onClick={() => isNew && markOrderAsSeen(order.id)}
                  style={{ 
                    borderBottom: '1px solid #f1f5f9', 
                    background: isNew ? 'rgba(254, 243, 199, 0.3)' : (idx % 2 === 0 ? 'white' : '#fcfdfe'),
                    transition: '0.3s background',
                    cursor: isNew ? 'pointer' : 'default'
                  }}
                >
                  <td style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ fontWeight: '900', color: '#0f172a', fontSize: '15px' }}>#{order.id?.slice(-8).toUpperCase() || 'NEW'}</div>
                      {isNew && <div style={{ background: '#ef4444', width: '8px', height: '8px', borderRadius: '50%' }} />}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px', fontWeight: 600 }}>{new Date(order.createdAt || order.date || Date.now()).toLocaleString()}</div>
                    <div style={{ marginTop: '8px', fontSize: '10px', background: order.mode === 'delivery' ? '#fdf2f8' : '#f0f9ff', color: order.mode === 'delivery' ? '#9d174d' : '#075985', display: 'inline-block', padding: '3px 10px', borderRadius: '6px', fontWeight: '900' }}>{order.mode || 'Delivery'}</div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ fontWeight: '800', color: '#1e293b' }}>{order.customer?.name || 'Walk-in'}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#64748b', fontSize: '13px', marginTop: '4px', fontWeight: 600 }}>
                      <Phone size={12} /> {order.customer?.phone || '8888 8888'}
                    </div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ color: '#475569', fontSize: '13px', fontWeight: 700, maxWidth: '180px' }}>
                      {items.slice(0, 2).map(i => `${i.qty}x ${i.name}`).join(', ')}
                      {items.length > 2 && ` +${items.length - 2} more`}
                    </div>
                    <div style={{ fontWeight: '950', color: '#013220', marginTop: '10px', fontSize: '16px' }}>${parseFloat(order.total || 0).toFixed(2)}</div>
                  </td>
                  <td style={{ padding: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                         <div style={{ background: order.payment_status === 'paid' ? '#f0fdf4' : '#fff7ed', color: order.payment_status === 'paid' ? '#16a34a' : '#d97706', padding: '6px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: '950', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <CreditCard size={12} /> {order.payment_status === 'paid' ? 'PAID' : 'PENDING'}
                         </div>
                         <button onClick={(e) => { e.stopPropagation(); handlePaymentToggle(order); }} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '6px' }}>
                            <RefreshCcw size={14} />
                         </button>
                       </div>
                       {order.payment_screenshot && (
                         <a 
                           href={order.payment_screenshot} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           onClick={(e) => e.stopPropagation()}
                           style={{ 
                             fontSize: '10px', fontWeight: '900', color: '#0369a1', textDecoration: 'none', 
                             display: 'flex', alignItems: 'center', gap: '4px', background: '#e0f2fe', 
                             padding: '4px 8px', borderRadius: '6px', width: 'fit-content' 
                           }}
                         >
                           <ExternalLink size={10} /> VIEW PROOF
                         </a>
                       )}
                    </div>
                  </td>
                  <td style={{ padding: '20px', minWidth: '200px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '950', fontSize: '13px', color: statusStyle.text }}>
                        {statusStyle.icon}
                        {pipelineSt.replace(/_/g, ' ')}
                      </div>
                      {pipelineSt === 'PLACED' ? (
                        <>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleAdvance(order, 'CONFIRMED'); }}
                              disabled={!confirmGate.ok}
                              style={{
                                padding: '8px 14px', borderRadius: '10px', border: 'none', fontWeight: '900', fontSize: '12px', cursor: confirmGate.ok ? 'pointer' : 'not-allowed',
                                background: confirmGate.ok ? '#0A8754' : '#cbd5e1', color: 'white',
                              }}
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleAdvance(order, 'CANCELLED'); }}
                              style={{
                                padding: '8px 14px', borderRadius: '10px', border: '1.5px solid #fecaca', fontWeight: '900', fontSize: '12px', cursor: 'pointer',
                                background: '#fef2f2', color: '#b91c1c',
                              }}
                            >
                              Reject
                            </button>
                          </div>
                          {!confirmGate.ok ? (
                            <span style={{ fontSize: '11px', color: '#b45309', fontWeight: '700', maxWidth: '220px' }}>{confirmGate.reason}</span>
                          ) : null}
                        </>
                      ) : null}
                      {pipelineSt !== 'PLACED' && pipelineSt !== 'DELIVERED' && pipelineSt !== 'CANCELLED' && nextSt ? (
                        <button
                          type="button"
                          onClick={(e) => { e.stopPropagation(); handleAdvance(order, nextSt); }}
                          style={{
                            padding: '8px 14px', borderRadius: '10px', border: 'none', fontWeight: '900', fontSize: '12px', cursor: 'pointer',
                            background: 'var(--green-dark, #013220)', color: 'white',
                          }}
                        >
                          Next: {nextSt.replace(/_/g, ' ')}
                        </button>
                      ) : null}
                      {(pipelineSt === 'DELIVERED' || pipelineSt === 'CANCELLED') ? (
                        <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '700' }}>Terminal</span>
                      ) : null}
                    </div>
                  </td>
                  <td style={{ padding: '20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                       <button 
                         onClick={(e) => { e.stopPropagation(); openChat(order.id); }}
                         style={{ 
                           background: 'var(--green-dark)', border: 'none', padding: '10px', borderRadius: '10px', color: 'white', cursor: 'pointer',
                           position: 'relative'
                         }}
                       >
                          <MessageCircle size={18} />
                          {order.unreadAdmin > 0 && (
                            <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', color: 'white', fontSize: '10px', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '2px solid white' }}>
                              {order.unreadAdmin}
                            </div>
                          )}
                       </button>
                       <button 
                         onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${(order.customer?.phone || '').replace(/\D/g,'')}?text=Hi, your STM Salam order #${order.id?.slice(-8)} is ${pipelineSt}!`, '_blank'); }}
                         style={{ background: '#25D366', border: 'none', padding: '10px', borderRadius: '10px', color: 'white', cursor: 'pointer' }}
                       >
                          <MessageSquare size={18} />
                       </button>
                       <button
                         type="button"
                         title="Print customer bill"
                         onClick={(e) => { e.stopPropagation(); printCustomerBill(order); }}
                         style={{ background: '#f1f5f9', border: '1.5px solid #e2e8f0', padding: '10px', borderRadius: '10px', color: '#0f172a', cursor: 'pointer' }}
                       >
                          <Printer size={18} />
                       </button>
                       {(isAuthenticated && user?.role === 'admin') && (
                         <button
                           onClick={(e) => { e.stopPropagation(); setDeleteModal({ show: true, id: order.id }); }}
                           style={{ background: '#fef2f2', border: 'none', padding: '10px', borderRadius: '10px', color: '#ef4444', cursor: 'pointer' }}
                         >
                            <Trash2 size={18} />
                         </button>
                       )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredOrders.length === 0 && (
          <div style={{ padding: '80px', textAlign: 'center', color: '#94a3b8' }}>
             <Clock size={48} style={{ opacity: 0.1, marginBottom: '16px' }} />
             <div style={{ fontWeight: '900', fontSize: '18px' }}>No orders found.</div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes bounce { 
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
};

export default Orders;

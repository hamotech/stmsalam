import React, { useState, useEffect } from 'react';

// Helper utilities for safe rendering
function extractValidDate(order) {
  if (!order) return null;
  const ts = order.createdAt || order.placedAt || order.timestamp || order.created_date || order.createdDate || order.date || order;
  if (!ts) return null;
  if (ts instanceof Date) return ts;
  if (typeof ts === 'object') {
    if (typeof ts.toDate === 'function') return ts.toDate();
    const secs = ts.seconds ?? ts._seconds;
    if (secs != null) return new Date(secs * 1000);
  }
  const d = new Date(ts);
  return isNaN(d) ? null : d;
}

function formatOrderDateObj(order) {
  const d = extractValidDate(order);
  if (!d) return null;
  return {
    dateStr: d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' '),
    dayStr: d.toLocaleDateString('en-US', { weekday: 'long' }),
    timeStr: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    zoneStr: 'Singapore Time'
  };
}

function formatTimestamp(ts) {
  if (!ts) return '-';
  const d = extractValidDate(ts);
  if (!d) return '-';
  return `${d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ')} ${d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;
}

function formatOrderTotal(order) {
  const val = order.totalAmount ?? order.total ?? 0;
  const num = Number(val);
  if (isNaN(num)) return '$0.00';
  return num.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

function formatPhone(order) {
  return order.customer?.phone || order.customerPhone || order.phone || order.deliveryPhone || 'No phone';
}

const UI_TO_FSM_EVENT = {
  preparing: 'PREPARING',
  cancelled: 'CANCELLED',
  // add more mappings as needed
};
import {
  subscribeOrders,
  deleteOrder,
  markOrderAsSeen,
  markOrderAsPrinted,
  normalizeOrderLineItems,
} from '../services/dataService';
import { adminTransition } from '../services/adminApi';
import {
  getOrderContext,
  nextPipelineStep,
  orderMatchesPaymentFilter,
  paymentAllowsConfirm,
  isNewOrderQueueEligible,
} from '../orderPipeline.js';
import { isStripeHostedOrder } from '../../domain/orderLifecycleStandard.js';
import { 
  Trash2, CheckCircle, XCircle, Clock, Truck, 
  Package, MessageSquare, ExternalLink, CreditCard,
  ChefHat, Bike, CheckCircle2, MoreVertical, RefreshCcw, MessageCircle, Phone, Bell, X, Send, Printer, History,
  TrendingUp, DollarSign, Users, ShoppingBag, ClipboardList, Search
} from 'lucide-react';
import { printCustomerBill } from '../../utils/customerBillPrint';
import { useAuth } from '../../context/AuthContext';
import ChatWindow from '../../components/ChatWindow';

const Orders = () => {
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [cancelModal, setCancelModal] = useState({ show: false, order: null, reason: '' });
  const [timelineModal, setTimelineModal] = useState({ show: false, order: null });
  const [lifecycleFilter, setLifecycleFilter] = useState('active');
  const [payFilter, setPayFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChatOrderId, setActiveChatOrderId] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 4000);
  };

  useEffect(() => {
    // Request notification permission if not already granted or denied
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
    const unsub = subscribeOrders((ords) => setOrders(ords));
    return () => { if (unsub) unsub(); }
  }, []);

  // Process new orders for notifications and auto-print
  useEffect(() => {
    const processNewOrders = async () => {
      const newOrdersToPrint = orders.filter(o => o.isNewForAdmin && !o.printed);
      if (newOrdersToPrint.length === 0) return;

      // Play sound once per batch
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0, ctx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.5);
      } catch (e) {
        console.warn('Audio play failed', e);
      }

      for (const order of newOrdersToPrint) {
        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("New Order Received!", {
            body: `Order #${(order.id || '').slice(-8).toUpperCase()} has just arrived.`,
            icon: "/stmsalamlogo.png"
          });
        }
        
        printCustomerBill(order);
        try {
          await markOrderAsPrinted(order.id);
        } catch (e) {
          console.error("Failed to mark order as printed", e);
        }
      }
    };
    
    processNewOrders();
  }, [orders]);

  const [transitioningOrderIds, setTransitioningOrderIds] = useState(new Set());

  const handleAdminTransition = async (order, uiEvent, paymentStatus = null, reason = null) => {
    const orderId = order.id;
    const fsmEvent = UI_TO_FSM_EVENT[uiEvent] ?? uiEvent.toUpperCase();
    setTransitioningOrderIds((prev) => new Set(prev).add(orderId));

    // Resolve target/current payment status safely
    const currentPaymentStatus = order.paymentStatus ?? order.payment_status ?? 'PENDING';
    let targetPaymentStatus = paymentStatus || currentPaymentStatus;

    const orderPaymentMode = order.paymentMode ?? order.payment_mode ?? order.paymentMethod ?? 'COD';
    const isCod = orderPaymentMode === 'COD' || orderPaymentMode === 'CASH';

    if (isCod && targetPaymentStatus === 'PENDING') {
      // Backend validates allowed payment statuses. Don't send COD_PENDING.
      // Leave it as PENDING, the FSM will handle COD rules.
    }

    try {
      await adminTransition(orderId, fsmEvent, {
        paymentStatus: targetPaymentStatus,
        cancellationReason: reason,
      });
      if (order.isNewForAdmin) markOrderAsSeen(orderId);
      showToast(`Order → ${fsmEvent.replace(/_/g, ' ')}`);
    } catch (err) {
      showToast(err.message || 'Update failed', 'error');
    } finally {
      setTransitioningOrderIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  const openChat = (id) => {
    setActiveChatOrderId(id);
    markOrderAsSeen(id);
  };

  const handlePaymentToggle = async (order) => {
    if (isStripeHostedOrder(order)) {
      showToast('Stripe/card payment is webhook-controlled and cannot be toggled manually.', 'error');
      return;
    }
    // For COD or SCANNER, allow admin to mark as PAID via FSM
    try {
      await adminTransition(order.id, 'paid', { paymentStatus: 'PAID' });
      showToast('Payment marked as PAID');
    } catch (err) {
      showToast(err.message || 'Failed to update payment', 'error');
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
    
    // Lifecycle Filter
    if (lifecycleFilter !== 'all') {
      const st = getOrderContext(o).canonicalStatus;
      const done = st === 'delivered' || st === 'cancelled';
      if (lifecycleFilter === 'delivered' && st !== 'delivered') return false;
      if (lifecycleFilter === 'active' && done) return false;
    }
    
    // Search Query Filter
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      const orderId = (o.id || '').toLowerCase();
      const cName = (o.customer?.name || o.customerName || '').toLowerCase();
      const cPhone = (o.customer?.phone || o.customerPhone || o.phone || '').toLowerCase();
      if (!orderId.includes(query) && !cName.includes(query) && !cPhone.includes(query)) {
        return false;
      }
    }
    
    return true;
  });

  const getStatusStyle = (order) => {
    const st = getOrderContext(order).canonicalStatus;
    switch (st) {
      case 'preparing': return { bg: '#f0fdf4', text: '#166534', icon: <ChefHat size={14} /> };
      case 'ready_for_pickup': return { bg: '#f0f9ff', text: '#075985', icon: <Package size={14} /> };
      case 'out_for_delivery': return { bg: '#fef2f2', text: '#991b1b', icon: <Truck size={14} /> };
      case 'delivered': return { bg: '#f0fdf4', text: '#15803d', icon: <CheckCircle2 size={14} /> };
      case 'cancelled': return { bg: '#fee2e2', text: '#991b1b', icon: <XCircle size={14} /> };
      case 'pending_payment': return { bg: '#fff7ed', text: '#9a3412', icon: <Clock size={14} /> };
      case 'placed': return { bg: '#ecfdf5', text: '#047857', icon: <Clock size={14} /> };
      case 'failed': return { bg: '#fee2e2', text: '#991b1b', icon: <XCircle size={14} /> };
      default: return { bg: '#fff7ed', text: '#9a3412', icon: <Clock size={14} /> };
    }
  };

  // Dashboard Metrics
  const todayStart = new Date();
  todayStart.setHours(0,0,0,0);
  
  const todayOrders = orders.filter(o => {
    const d = extractValidDate(o);
    return d && d >= todayStart;
  });

  const totalOrdersToday = todayOrders.length;
  const pendingOrdersCount = orders.filter(o => {
    const st = getOrderContext(o).canonicalStatus;
    return st !== 'delivered' && st !== 'cancelled';
  }).length;
  const paidOrdersCount = orders.filter(o => getOrderContext(o).paymentStatusNorm === 'PAID').length;
  
  const revenueToday = todayOrders.reduce((sum, o) => {
    if (getOrderContext(o).paymentStatusNorm === 'PAID') {
       return sum + (Number(o.totalAmount || o.total || o.cartTotal || 0));
    }
    return sum;
  }, 0);
  
  const assignedDriversCount = orders.filter(o => {
    const st = getOrderContext(o).canonicalStatus;
    return (o.assignedDriverId || o.assignedRiderName) && (st !== 'delivered' && st !== 'cancelled');
  }).length;
  return (
    <div style={{ padding: '32px', position: 'relative', minHeight: '100vh', background: '#F8FAFC' }}>
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

      {/* Timeline Modal */}
      {timelineModal.show && timelineModal.order && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)' }} onClick={() => setTimelineModal({ show: false, order: null })}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '24px', maxWidth: '400px', width: '100%', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>Order Timeline</h3>
              <button onClick={() => setTimelineModal({ show: false, order: null })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}><X size={24} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Placed', ts: timelineModal.order.placedAt || timelineModal.order.createdAt },
                { label: 'Accepted', ts: timelineModal.order.acceptedAt },
                { label: 'Preparing', ts: timelineModal.order.preparingAt },
                { label: 'Ready', ts: timelineModal.order.readyAt },
                { label: 'Driver Assigned', ts: timelineModal.order.assignedAt },
                { label: 'Out for Delivery', ts: timelineModal.order.outForDeliveryAt },
                { label: 'Delivered', ts: timelineModal.order.deliveredAt },
                { label: 'Cancelled', ts: timelineModal.order.cancelledAt, reason: timelineModal.order.cancellationReason },
              ].filter(s => s.ts).map((step, i, arr) => (
                <div key={step.label} style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: i === arr.length - 1 ? 'var(--green-dark)' : '#cbd5e1', border: '2px solid white', boxShadow: '0 0 0 2px ' + (i === arr.length - 1 ? 'var(--green-dark)' : '#cbd5e1'), zIndex: 2 }} />
                    {i < arr.length - 1 && <div style={{ width: '2px', height: '100%', background: '#e2e8f0', position: 'absolute', top: '12px', zIndex: 1 }} />}
                  </div>
                  <div style={{ paddingBottom: i === arr.length - 1 ? 0 : '16px', flex: 1 }}>
                    <div style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>{step.label}</div>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginTop: '2px' }}>{formatTimestamp(step.ts)}</div>
                    {step.reason && <div style={{ marginTop: '4px', fontSize: '12px', background: '#fef2f2', color: '#ef4444', padding: '6px 10px', borderRadius: '6px', fontWeight: '700' }}>Reason: {step.reason}</div>}
                  </div>
                </div>
              ))}
              {['placedAt', 'acceptedAt', 'preparingAt', 'readyAt', 'assignedAt', 'outForDeliveryAt', 'deliveredAt', 'cancelledAt'].every(k => !timelineModal.order[k] && !timelineModal.order.createdAt) && (
                <div style={{ color: '#64748b', fontSize: '14px', textAlign: 'center', padding: '20px' }}>No timeline data available.</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {cancelModal.show && cancelModal.order && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '32px', borderRadius: '24px', maxWidth: '400px', width: '100%', boxShadow: '0 30px 60px rgba(0,0,0,0.3)' }}>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>Cancel Order #{cancelModal.order.id?.slice(-8).toUpperCase()}</h3>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>Please provide a reason for cancellation.</p>
            <textarea
              value={cancelModal.reason}
              onChange={(e) => setCancelModal({ ...cancelModal, reason: e.target.value })}
              placeholder="e.g. Payment Timeout, Out of Stock"
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid #e2e8f0', fontSize: '14px', minHeight: '80px', marginBottom: '24px', fontFamily: 'inherit', boxSizing: 'border-box', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setCancelModal({ show: false, order: null, reason: '' })} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1.5px solid #e2e8f0', background: 'white', fontWeight: '800', cursor: 'pointer', color: '#475569' }}>Back</button>
              <button onClick={() => { handleAdminTransition(cancelModal.order, 'cancelled', null, cancelModal.reason || 'Cancelled by Admin'); setCancelModal({ show: false, order: null, reason: '' }); }} style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#ef4444', color: 'white', fontWeight: '800', cursor: 'pointer' }}>Confirm Cancel</button>
            </div>
          </div>
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

      {/* ─── PAGE HEADER ─────────────────────────────────────────────── */}
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">Orders Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">Manage orders, payments, deliveries and customer operations.</p>
        </div>
        {orders.filter(o => o.isNewForAdmin).length > 0 && (
          <div style={{ background: '#ef4444', color: 'white', padding: '8px 16px', borderRadius: '12px', fontSize: '12px', fontWeight: '900', display: 'flex', alignItems: 'center', gap: '8px', animation: 'bounce 1s infinite' }}>
            <Bell size={14} /> {orders.filter(o => o.isNewForAdmin).length} NEW ORDERS
          </div>
        )}
      </div>

      {/* ─── STATS CARDS ─────────────────────────────────────────────── */}
      <div className="grid gap-5 mb-8" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col gap-4" style={{ minHeight: '120px' }}>
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <ClipboardList size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Today</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 leading-none">{totalOrdersToday}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1.5 uppercase tracking-wide">Total Orders</div>
          </div>
        </div>
        {/* Pending */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col gap-4" style={{ minHeight: '120px' }}>
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
              <Clock size={20} />
            </div>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">Active</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 leading-none">{pendingOrdersCount}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1.5 uppercase tracking-wide">Pending Orders</div>
          </div>
        </div>
        {/* Paid */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col gap-4" style={{ minHeight: '120px' }}>
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
              <CheckCircle size={20} />
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">Paid</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 leading-none">{paidOrdersCount}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1.5 uppercase tracking-wide">Paid Orders</div>
          </div>
        </div>
        {/* Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col gap-4" style={{ minHeight: '120px' }}>
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0">
              <DollarSign size={20} />
            </div>
            <span className="text-xs font-bold text-teal-600 bg-teal-50 px-2 py-1 rounded-lg">Today</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 leading-none">${revenueToday.toFixed(2)}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1.5 uppercase tracking-wide">Revenue Today</div>
          </div>
        </div>
        {/* Drivers */}
        <div className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col gap-4" style={{ minHeight: '120px' }}>
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
              <Bike size={20} />
            </div>
            <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">Live</span>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 leading-none">{assignedDriversCount}</div>
            <div className="text-xs font-semibold text-slate-500 mt-1.5 uppercase tracking-wide">Assigned Drivers</div>
          </div>
        </div>
      </div>

      {/* ─── SEARCH & FILTERS ────────────────────────────────────────── */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 mb-6">
        {/* Search */}
        <div className="relative w-full xl:w-[400px] shrink-0">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search size={18} className="text-slate-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, customers, phones..."
            style={{ height: '48px', borderRadius: '14px' }}
            className="w-full pl-11 pr-4 bg-white border border-[#E2E8F0] text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 shadow-sm transition-all"
          />
        </div>
        {/* Filters */}
        <div className="flex flex-wrap gap-3 w-full xl:w-auto xl:justify-end">
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-2xl border border-[#E2E8F0] gap-0.5">
            {[['all','All'], ['active','Active'], ['delivered','Delivered']].map(([t, label]) => (
              <button
                key={t}
                type="button"
                onClick={() => setLifecycleFilter(t)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-150 ${lifecycleFilter === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >{label}</button>
            ))}
          </div>
          <div className="flex items-center bg-[#F1F5F9] p-1 rounded-2xl border border-[#E2E8F0] gap-0.5">
            {[['all','All Pay'], ['cod','COD'], ['stripe_paid','Card / Paid'], ['qr_pending','QR']].map(([t, label]) => (
              <button
                key={t}
                type="button"
                onClick={() => setPayFilter(t)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-150 ${payFilter === t ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >{label}</button>
            ))}
          </div>
        </div>
      </div>

      {/* ─── DESKTOP / TABLET TABLE ──────────────────────────────────── */}
      <div className="hidden md:block bg-white rounded-3xl border border-[#E2E8F0] shadow-sm mb-8" style={{ overflowX: 'auto' }}>
        <table className="w-full text-left border-collapse" style={{ minWidth: '960px' }}>
          <thead>
            <tr style={{ height: '56px', background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
              <th className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Order</th>
              <th className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Customer</th>
              <th className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Contact</th>
              <th className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Amount</th>
              <th className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Payment</th>
              <th className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
              <th className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Driver</th>
              <th className="px-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => {
              if (index === 0) {
  console.log("ORDER DATA", order);
  console.log("order.createdAt", order.createdAt);
  console.log("order.placedAt", order.placedAt);
  console.log("order.timestamp", order.timestamp);
  console.log("order.created_date", order.created_date);
  console.log("order.createdDate", order.createdDate);
  console.log("order.date", order.date);
  console.log("order.created", order.created);
  console.log("order.orderDate", order.orderDate);
}
              const orderCtx = getOrderContext(order);
              const pipelineSt = orderCtx.canonicalStatus;
              const payNorm = orderCtx.paymentStatusNorm;
              const nextSt = nextPipelineStep(pipelineSt);
              const confirmGate = isNewOrderQueueEligible(pipelineSt) ? paymentAllowsConfirm(order) : { ok: true };
              const isNew = order.isNewForAdmin;
              const dObj = formatOrderDateObj(order);

              let payBg = 'bg-amber-50'; let payText = 'text-amber-700'; let payBorder = 'border-amber-200';
              if (payNorm === 'PAID') { payBg = 'bg-emerald-50'; payText = 'text-emerald-700'; payBorder = 'border-emerald-200'; }
              else if (payNorm === 'FAILED') { payBg = 'bg-red-50'; payText = 'text-red-700'; payBorder = 'border-red-200'; }

              let statusBg = 'bg-slate-100'; let statusText = 'text-slate-600'; let statusBorder = 'border-slate-200';
              if (pipelineSt === 'placed' || pipelineSt === 'pending_payment') { statusBg = 'bg-emerald-50'; statusText = 'text-emerald-700'; statusBorder = 'border-emerald-200'; }
              else if (pipelineSt === 'preparing' || pipelineSt === 'ready_for_pickup') { statusBg = 'bg-amber-50'; statusText = 'text-amber-700'; statusBorder = 'border-amber-200'; }
              else if (pipelineSt === 'out_for_delivery') { statusBg = 'bg-blue-50'; statusText = 'text-blue-700'; statusBorder = 'border-blue-200'; }
              else if (pipelineSt === 'delivered') { statusBg = 'bg-emerald-50'; statusText = 'text-emerald-700'; statusBorder = 'border-emerald-200'; }
              else if (pipelineSt === 'cancelled' || pipelineSt === 'failed') { statusBg = 'bg-red-50'; statusText = 'text-red-700'; statusBorder = 'border-red-200'; }

              return (
                <tr key={order.id} className="group transition-colors duration-200 hover:bg-[#F8FAFC]" style={{ height: '72px', borderBottom: '1px solid #F1F5F9' }}>

                  {/* ORDER ID + DATE */}
                  <td className="px-6 align-middle">
                    <div className="flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">#{order.id?.slice(-8).toUpperCase()}</span>
                        {isNew && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />}
                      </div>
                      {dObj ? (
                        <>
                          <span className="text-xs font-semibold text-slate-600">{dObj.dateStr}</span>
                          <span className="text-xs text-slate-400">{dObj.timeStr}</span>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400 italic">No Date Available</span>
                      )}
                    </div>
                  </td>

                  {/* CUSTOMER */}
                  <td className="px-6 align-middle">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 text-xs font-bold shrink-0">
                        {((order.customer?.name || order.customerName || 'W')[0] || 'W').toUpperCase()}
                      </div>
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="text-sm font-semibold text-slate-900 truncate max-w-[140px]">{order.customer?.name || order.customerName || 'Walk-in'}</span>
                        <span className="text-xs text-slate-400 truncate max-w-[140px]">#{order.id?.slice(-8).toUpperCase()}</span>
                      </div>
                    </div>
                  </td>

                  {/* CONTACT */}
                  <td className="px-6 align-middle">
                    <div className="flex items-center gap-1.5 text-sm text-slate-600 font-medium">
                      <Phone size={13} className="text-slate-400 shrink-0" />
                      <span className="truncate max-w-[130px]">{formatPhone(order)}</span>
                    </div>
                  </td>

                  {/* AMOUNT */}
                  <td className="px-6 align-middle">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-slate-900">{formatOrderTotal(order)}</span>
                      <span className="text-xs text-slate-400 uppercase tracking-wide">Order Total</span>
                    </div>
                  </td>

                  {/* PAYMENT */}
                  <td className="px-6 align-middle">
                    <div className="flex flex-col gap-2 items-start">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${payBg} ${payText} ${payBorder}`}>
                        {payNorm === 'PAID' ? 'PAID' : payNorm === 'FAILED' ? 'FAILED' : 'PENDING'}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <button onClick={(e) => { e.stopPropagation(); handlePaymentToggle(order); }} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-lg hover:bg-slate-100" title="Toggle Payment">
                          <RefreshCcw size={13} />
                        </button>
                        {order.payment_screenshot && (
                          <a href={order.payment_screenshot} target="_blank" rel="noopener noreferrer" className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md hover:bg-blue-100 transition-colors flex items-center gap-1">
                            <ExternalLink size={10} /> Proof
                          </a>
                        )}
                      </div>
                    </div>
                  </td>

                  {/* STATUS */}
                  <td className="px-6 align-middle" style={{ minWidth: '180px' }}>
                    <div className="flex flex-col gap-2 items-start">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wide ${statusBg} ${statusText} ${statusBorder}`}>
                        {pipelineSt.replace(/_/g, ' ')}
                      </span>
                      {isNewOrderQueueEligible(pipelineSt) && (
                        <div className="flex gap-1.5 w-full">
                          <button onClick={(e) => { e.stopPropagation(); handleAdminTransition(order, 'preparing'); }} disabled={!confirmGate.ok} className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${confirmGate.ok ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}>Accept</button>
                          <button onClick={(e) => { e.stopPropagation(); setCancelModal({ show: true, order, reason: '' }); }} className="flex-1 py-1.5 rounded-xl text-xs font-bold bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all">Reject</button>
                        </div>
                      )}
                      {!isNewOrderQueueEligible(pipelineSt) && pipelineSt !== 'delivered' && pipelineSt !== 'cancelled' && nextSt && (
                        <button onClick={(e) => { e.stopPropagation(); handleAdminTransition(order, nextSt); }} className="w-full py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-700 transition-all uppercase tracking-wide">
                          → {nextSt.replace(/_/g, ' ')}
                        </button>
                      )}
                    </div>
                  </td>

                  {/* DRIVER */}
                  <td className="px-6 align-middle">
                    {order.assignedRiderName || order.assignedDriverId ? (
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-semibold text-slate-900">{order.assignedRiderName || 'Assigned'}</span>
                        <span className="text-xs text-slate-400">{order.assignedRiderPhone || 'Active'}</span>
                      </div>
                    ) : (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">Waiting</span>
                    )}
                  </td>

                  {/* ACTIONS */}
                  <td className="px-6 align-middle text-right">
                    <div className="flex items-center justify-end gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                      <button onClick={(e) => { e.stopPropagation(); setTimelineModal({ show: true, order }); }} className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all" title="Timeline"><History size={15} /></button>
                      <button onClick={(e) => { e.stopPropagation(); openChat(order.id); }} className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center relative hover:bg-blue-100 transition-all" title="Chat">
                        <MessageCircle size={15} />
                        {order.unreadAdmin > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{order.unreadAdmin}</span>}
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${(order.customer?.phone || order.customerPhone || order.phone || '').replace(/\D/g,'')}?text=Hi, your order #${order.id?.slice(-8)} is ${pipelineSt}!`, '_blank'); }} className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center hover:bg-emerald-100 transition-all" title="WhatsApp"><MessageSquare size={15} /></button>
                      <button onClick={(e) => { e.stopPropagation(); printCustomerBill(order); }} className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-all" title="Print"><Printer size={15} /></button>
                      {(isAuthenticated && user?.role === 'admin') && (
                        <button onClick={(e) => { e.stopPropagation(); setDeleteModal({ show: true, id: order.id }); }} className="w-10 h-10 rounded-xl bg-red-50 text-red-600 border border-red-200 flex items-center justify-center hover:bg-red-100 transition-all" title="Delete"><Trash2 size={15} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>


      {/* Mobile Compact Cards View */}
      <div className="md:hidden flex flex-col gap-4 mb-8">
        {filteredOrders.map((order) => {
          const orderCtx = getOrderContext(order);
          const pipelineSt = orderCtx.canonicalStatus;
          const payNorm = orderCtx.paymentStatusNorm;
          const nextSt = nextPipelineStep(pipelineSt);
          const confirmGate = isNewOrderQueueEligible(pipelineSt) ? paymentAllowsConfirm(order) : { ok: true };
          const isNew = order.isNewForAdmin;
          const dObj = formatOrderDateObj(order);
          
          let payBg = 'bg-[#FFFBEB]'; let payText = 'text-[#D97706]'; let payBorder = 'border-[#FDE68A]';
          if (payNorm === 'PAID') { payBg = 'bg-[#ECFDF5]'; payText = 'text-[#059669]'; payBorder = 'border-[#A7F3D0]'; }
          else if (payNorm === 'FAILED') { payBg = 'bg-[#FEF2F2]'; payText = 'text-[#DC2626]'; payBorder = 'border-[#FECACA]'; }

          let statusColor = 'bg-slate-100 text-slate-700 border-slate-200';
          if (pipelineSt === 'placed' || pipelineSt === 'pending_payment') { statusColor = 'bg-[#ECFDF5] text-[#059669] border-[#D1FAE5]'; }
          else if (pipelineSt === 'preparing' || pipelineSt === 'ready_for_pickup') { statusColor = 'bg-[#FFFBEB] text-[#D97706] border-[#FEF3C7]'; }
          else if (pipelineSt === 'out_for_delivery') { statusColor = 'bg-[#EFF6FF] text-[#2563EB] border-[#DBEAFE]'; }
          else if (pipelineSt === 'delivered') { statusColor = 'bg-[#ECFDF5] text-[#059669] border-[#D1FAE5]'; }
          else if (pipelineSt === 'cancelled' || pipelineSt === 'failed') { statusColor = 'bg-[#FEF2F2] text-[#DC2626] border-[#FEE2E2]'; }

          return (
            <div key={order.id} className="bg-white rounded-[20px] shadow-sm border border-slate-100 p-4 flex flex-col gap-4" onClick={() => isNew && markOrderAsSeen(order.id)}>
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-[16px]">#{order.id?.slice(-8).toUpperCase()}</span>
                    {isNew && <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />}
                  </div>
                  <span className="text-[12px] font-semibold text-slate-500">{dObj?.timeStr || 'N/A'}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 text-[18px]">{formatOrderTotal(order)}</span>
                  <div className={`mt-1 px-2 py-0.5 rounded-md text-[10px] font-bold border uppercase tracking-wider inline-block ${payBg} ${payText} ${payBorder}`}>
                    {payNorm === 'PAID' ? 'PAID' : 'PENDING'}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-[#F8FAFC] p-3 rounded-xl border border-slate-100">
                <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-[13px] shrink-0 border border-slate-300">
                  {((order.customer?.name || order.customerName || 'W')[0] || 'W').toUpperCase()}
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-slate-900 text-[14px] truncate">{order.customer?.name || order.customerName || 'Walk-in'}</span>
                  <span className="text-[12px] font-medium text-slate-500">{formatPhone(order)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className={`px-3 py-1.5 rounded-lg text-[12px] font-bold border capitalize text-center w-full ${statusColor}`}>
                  {pipelineSt.replace(/_/g, ' ')}
                </div>
                {isNewOrderQueueEligible(pipelineSt) && (
                  <div className="flex gap-2">
                    <button onClick={(e) => { e.stopPropagation(); handleAdminTransition(order, 'preparing'); }} disabled={!confirmGate.ok} className={`flex-1 py-2 rounded-lg font-bold text-[12px] transition-all ${confirmGate.ok ? 'bg-[#059669] text-white' : 'bg-slate-200 text-slate-400'}`}>Accept</button>
                    <button onClick={(e) => { e.stopPropagation(); setCancelModal({ show: true, order, reason: '' }); }} className="flex-1 py-2 rounded-lg font-bold text-[12px] bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA]">Reject</button>
                  </div>
                )}
                {!isNewOrderQueueEligible(pipelineSt) && pipelineSt !== 'delivered' && pipelineSt !== 'cancelled' && nextSt && (
                  <button onClick={(e) => { e.stopPropagation(); handleAdminTransition(order, nextSt); }} className="w-full py-2 rounded-lg font-bold text-[12px] bg-[#0F766E] text-white">
                    Next: {nextSt.replace(/_/g, ' ')}
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-1">
                <button onClick={(e) => { e.stopPropagation(); setTimelineModal({ show: true, order }); }} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600"><History size={16} /></button>
                <button onClick={(e) => { e.stopPropagation(); openChat(order.id); }} className="w-10 h-10 rounded-xl bg-[#0F766E] text-white flex items-center justify-center relative">
                  <MessageCircle size={16} />
                  {order.unreadAdmin > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#DC2626] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{order.unreadAdmin}</span>}
                </button>
                <button onClick={(e) => { e.stopPropagation(); window.open(`https://wa.me/${(order.customer?.phone || order.customerPhone || order.phone || '').replace(/\D/g,'')}?text=Hi!`, '_blank'); }} className="w-10 h-10 rounded-xl bg-[#059669] text-white flex items-center justify-center"><MessageSquare size={16} /></button>
                <button onClick={(e) => { e.stopPropagation(); printCustomerBill(order); }} className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600"><Printer size={16} /></button>
                {(isAuthenticated && user?.role === 'admin') && <button onClick={(e) => { e.stopPropagation(); setDeleteModal({ show: true, id: order.id }); }} className="w-10 h-10 rounded-xl bg-[#FEF2F2] text-[#DC2626] border border-[#FECACA] flex items-center justify-center"><Trash2 size={16} /></button>}
              </div>
            </div>
          );
        })}
      </div>

      {filteredOrders.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center mt-8">
          <div className="w-28 h-28 rounded-[32px] bg-white shadow-sm border border-slate-100 flex items-center justify-center mb-6">
            <Search size={48} className="text-slate-300" />
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-3">No orders found</h3>
          <p className="text-slate-500 font-medium max-w-md text-[15px]">Try adjusting your search query or modifying your filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default Orders;

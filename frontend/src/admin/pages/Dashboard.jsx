import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchDashboardStats, subscribeOrders } from '../services/dataService';
import { ShoppingBag, DollarSign, TrendingUp, Clock, ArrowUpRight, Activity, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

// --- ANIMATION VARIANTS --- //
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

// --- SUB-COMPONENTS --- //
const StatCard = ({ title, value, icon, gradient, trend }) => (
  <motion.div variants={itemVariants} style={{ 
    background: 'white', 
    padding: '24px', 
    borderRadius: '24px', 
    flex: '1', 
    minWidth: '220px', 
    boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
    border: '1px solid rgba(0,0,0,0.02)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{ position: 'absolute', top: 0, right: 0, padding: '20px', opacity: 0.05, transform: 'scale(2.5) translate(10%, -10%)', pointerEvents: 'none' }}>
      {icon}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <div style={{ 
          width: '56px', height: '56px', borderRadius: '16px', 
          background: gradient, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white',
          marginBottom: '20px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)'
        }}>
          {icon}
        </div>
        <h3 style={{ fontSize: '15px', color: '#64748b', fontWeight: '700', marginBottom: '8px' }}>{title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <p style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', letterSpacing: '-1px' }}>{value}</p>
          {trend && (
            <span style={{ display: 'flex', alignItems: 'center', fontSize: '13px', fontWeight: '800', color: '#10b981', background: '#ecfdf5', padding: '4px 8px', borderRadius: '8px' }}>
              <ArrowUpRight size={14} style={{ marginRight: '2px' }}/> {trend}
            </span>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Load stats from Firestore, then subscribe for live order updates
    fetchDashboardStats().then(setStats);
    const unsub = subscribeOrders((orders) => {
      setStats(prev => prev ? {
        ...prev,
        totalOrders: orders.length,
        totalRevenue: orders.reduce((sum, o) => sum + parseFloat(o.total || 0), 0).toFixed(2),
        recentOrders: orders.slice(0, 5),
      } : prev);
    });
    return () => unsub();
  }, []);

  if (!stats) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--green-dark)' }}>
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
        <Activity size={40} />
      </motion.div>
    </div>
  );

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible"
      style={{ paddingBottom: '40px' }}
    >
      <motion.div variants={itemVariants} style={{ marginBottom: '32px' }}>
        <h2 style={{ fontSize: '28px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.5px' }}>Dashboard Overview</h2>
        <p style={{ color: '#64748b', fontWeight: '600', marginTop: '4px' }}>Welcome back to your STM operations hub.</p>
      </motion.div>

      <motion.div variants={itemVariants} style={{ marginBottom: '28px' }}>
        <Link
          to="/admin/support"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '18px 24px',
            borderRadius: 20,
            background: 'linear-gradient(135deg, #013220 0%, #0d5c3f 100%)',
            color: 'white',
            textDecoration: 'none',
            boxShadow: '0 12px 32px rgba(1,50,32,0.2)',
            border: '1px solid rgba(212,175,55,0.35)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MessageCircle size={24} />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 17 }}>Chat with Customer</div>
              <div style={{ fontSize: 13, opacity: 0.9, fontWeight: 600, marginTop: 4 }}>
                Open the support inbox — messages from the site “STM Help” Live team tab.
              </div>
            </div>
          </div>
          <span style={{ fontWeight: 900, fontSize: 14, whiteSpace: 'nowrap' }}>Open inbox →</span>
        </Link>
      </motion.div>
      
      {/* STATS ROW */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <StatCard title="Total Orders" value={stats.totalOrders} icon={<ShoppingBag size={28} />} gradient="linear-gradient(135deg, #023c28 0%, #056a48 100%)" trend="12%" />
        <StatCard title="Total Revenue" value={`$${stats.totalRevenue}`} icon={<DollarSign size={28} />} gradient="linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)" trend="8.4%" />
        <StatCard title="Daily Growth" value="+15%" icon={<TrendingUp size={28} />} gradient="linear-gradient(135deg, #d4af37 0%, #b8962c 100%)" />
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        {/* RECENT ORDERS TABLE */}
        <motion.div variants={itemVariants} style={{ flex: '2', background: 'white', padding: '32px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.04)', minWidth: '340px', border: '1px solid rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a' }}>Recent Orders</h3>
            <button style={{ background: '#f8fafc', border: 'none', padding: '8px 16px', borderRadius: '12px', color: '#475569', fontWeight: '700', cursor: 'pointer', fontSize: '13px' }}>View All</button>
          </div>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ textAlign: 'left' }}>
                  <th style={{ padding: '16px 12px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #f1f5f9' }}>Order ID</th>
                  <th style={{ padding: '16px 12px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #f1f5f9' }}>Customer</th>
                  <th style={{ padding: '16px 12px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #f1f5f9' }}>Status</th>
                  <th style={{ padding: '16px 12px', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', borderBottom: '2px solid #f1f5f9' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentOrders.map((order, idx) => (
                  <motion.tr 
                    key={order.id} 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + (idx * 0.1) }}
                    style={{ borderBottom: idx !== stats.recentOrders.length -1 ? '1px solid #f8fafc' : 'none', transition: 'background 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '20px 12px', fontWeight: '900', color: '#0f172a', fontSize: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--gold)' }} />
                        {order.id}
                      </div>
                    </td>
                    <td style={{ padding: '20px 12px', fontWeight: '600', color: '#475569', fontSize: '14px' }}>{order.customer?.name || order.customer}</td>
                    <td style={{ padding: '20px 12px' }}>
                      <span style={{ 
                        padding: '6px 14px', 
                        borderRadius: '12px', 
                        fontSize: '12px', 
                        fontWeight: '800',
                        backgroundColor: order.status === 'Pending' ? '#fffbeb' : order.status === 'Delivered' ? '#f0fdf4' : '#eff6ff',
                        color: order.status === 'Pending' ? '#d97706' : order.status === 'Delivered' ? '#16a34a' : '#2563eb',
                        border: `1px solid ${order.status === 'Pending' ? '#fde68a' : order.status === 'Delivered' ? '#bbf7d0' : '#bfdbfe'}`
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '20px 12px', fontWeight: '900', color: 'var(--green-dark)', fontSize: '15px' }}>${(parseFloat(order.total) || 0).toFixed(2)}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* POPULAR ITEMS RANKING */}
        <motion.div variants={itemVariants} style={{ flex: '1', background: 'white', padding: '32px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.04)', minWidth: '300px', border: '1px solid rgba(0,0,0,0.02)' }}>
          <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>Trending Items</h3>
          <p style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', marginBottom: '24px' }}>Top products sold this week</p>
          
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {stats.popularItems.map((item, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + (idx * 0.1) }}
                style={{ 
                  padding: '16px', 
                  marginBottom: '12px',
                  borderRadius: '16px', 
                  background: '#f8fafc',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px',
                  border: '1px solid #f1f5f9'
                }}
              >
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '12px', 
                  background: idx === 0 ? 'var(--gold)' : idx === 1 ? '#cbd5e1' : '#f1f5f9', 
                  display: 'flex', justifyContent: 'center', alignItems: 'center', 
                  fontWeight: '900', fontSize: '16px',
                  color: idx === 0 ? 'var(--green-dark)' : '#475569',
                  boxShadow: idx === 0 ? '0 4px 12px rgba(212,175,55,0.4)' : 'none'
                }}>
                  {idx + 1}
                </div>
                <div>
                  <div style={{ fontWeight: '800', color: '#0f172a', fontSize: '15px' }}>{item}</div>
                  <div style={{ fontSize: '12px', color: '#64748b', fontWeight: '600', marginTop: '2px' }}>High Demand</div>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;

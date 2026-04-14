import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Settings, MapPin, CreditCard, ShoppingBag, ChevronRight, LogOut, 
  Package, Clock, Star, User, Mail, Phone, Edit3, CheckCircle, 
  Trash2, Plus, Wallet, Award, ShieldCheck, Heart, Zap, FileText, 
  Bell, Globe, Coffee, Info, MessageCircle, AlertCircle, Activity
} from 'lucide-react'
import { shopInfo } from '../data/menuData'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import AddressManager from '../components/AddressManager'
import { motion, AnimatePresence } from 'framer-motion'
import { dataService } from '../admin/services/dataService'

export default function Profile() {
  const auth = useAuth() || {}
  const { user, isGuest, logout } = auth
  
  const cart = useCart() || {}
  const { cartItems = [], subtotal = 0 } = cart
  
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')
  const [pastOrders, setPastOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  
  // Local state for profile features
  const [isPro] = useState(false)
  const [dietaryPrefs, setDietaryPrefs] = useState({
    halal: true,
    glutenFree: false,
    dairyFree: false,
    nuts: false
  })

  // Fetch real orders from Firestore
  useEffect(() => {
    if (!user) {
      setLoadingOrders(false)
      return
    }
    try {
      const unsub = dataService.subscribeOrders(allOrders => {
        const myOrders = allOrders.filter(o => 
          o.userId === user.id || 
          o.customer?.email === user.email || 
          o.customer?.phone === user.phone
        );
        setPastOrders(myOrders.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)));
        setLoadingOrders(false);
      });
      return () => { if (typeof unsub === 'function') unsub(); }
    } catch (err) {
      console.error('Order Fetch Error:', err);
      setLoadingOrders(false);
    }
  }, [user]);

  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to remove this order from your history?')) {
      try {
        await dataService.deleteOrder(id);
      } catch (err) { alert('Failed to delete order.'); }
    }
  }

  const handleLogout = () => {
    if (logout) logout();
    navigate('/login')
  }

  const generateWhatsAppMessage = () => {
    if (!cartItems || cartItems.length === 0) return "Hi STM Salam, I'd like to place an order!";
    let text = "Hi STM Salam, I'd like to order:\n\n";
    cartItems.forEach(item => {
      text += `${item.qty}x ${item.name} - $${(item.price * item.qty).toFixed(2)}\n`;
    });
    text += `\nTotal: $${Number(subtotal).toFixed(2)}`;
    return encodeURIComponent(text);
  };

  if (!user && !isGuest) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '20px' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--gold-tint)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><User size={36} color="var(--gold)" /></div>
          <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '12px' }}>Profile Locked</h2>
          <p style={{ color: '#64748b', marginBottom: '32px', fontSize: '16px', lineHeight: 1.7, fontWeight: 500 }}>Please sign in to view your order history and manage your preferences.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <Link to="/login" style={{ width: '100%', padding: '18px', background: 'var(--gold)', color: 'var(--green-dark)', fontWeight: 950, borderRadius: '16px', textDecoration: 'none', textAlign: 'center', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>Sign In / Register</Link>
            <div style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 800 }}>OR</div>
            <a href={`https://wa.me/${shopInfo.whatsapp.replace(/\D/g, '')}?text=${generateWhatsAppMessage()}`} target="_blank" rel="noreferrer" style={{ width: '100%', padding: '18px', background: '#25D366', color: 'white', borderRadius: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', fontWeight: 900 }}>
              <MessageCircle size={20} /> Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'orders', icon: <ShoppingBag size={20} />, label: 'Order History' },
    { id: 'addresses', icon: <MapPin size={20} />, label: 'Saved Addresses' },
    { id: 'dietary', icon: <Heart size={20} />, label: 'Dietary Prefs' },
    { id: 'wallet', icon: <Wallet size={20} />, label: 'STM Wallet' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Account' },
  ]

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '120px' }}>
      <ActiveOrderTracker />
      
      {/* Premium Header */}
      <div style={{ background: 'var(--green-dark)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.1) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                 <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--gold)', border: '4px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 950, color: 'var(--green-dark)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                    {user?.name?.charAt(0) || 'U'}
                 </div>
                 <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                       <h1 style={{ color: 'white', fontSize: '36px', fontWeight: 950, letterSpacing: '-1.5px' }}>{user?.name || 'Guest User'}</h1>
                       {isPro && <span style={{ background: 'var(--gold)', color: 'var(--green-dark)', fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '100px' }}>PRO</span>}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontWeight: 700 }}>Active Member · {pastOrders.length} Orders</p>
                 </div>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                 <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px 32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <div style={{ color: 'var(--gold)', fontSize: '24px', fontWeight: 950 }}>$0.00</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 800, marginTop: '4px', textTransform: 'uppercase' }}>Credits</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-30px', display: 'grid', gridTemplateColumns: 'minmax(250px, 300px) 1fr', gap: '40px', position: 'relative', zIndex: 10 }}>
         {/* SIDEBAR */}
         <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tabs.map(tab => (
               <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 24px', borderRadius: '20px',
                  border: 'none', background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? 'var(--green-dark)' : '#64748b', fontWeight: 800,
                  boxShadow: activeTab === tab.id ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                  cursor: 'pointer', transition: '0.2s', fontSize: '15px', textAlign: 'left'
               }}>
                  <span style={{ color: activeTab === tab.id ? 'var(--green-mid)' : 'inherit' }}>{tab.icon}</span>
                  {tab.label}
               </button>
            ))}
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 24px', color: '#ef4444', border: 'none', background: 'none', fontWeight: 900, cursor: 'pointer', marginTop: '32px' }}>
               <LogOut size={20} /> Sign Out
            </button>
         </div>

         {/* CONTENT */}
         <div style={{ background: 'white', borderRadius: '40px', padding: '40px', border: '1px solid #eef2f6', boxShadow: '0 20px 50px rgba(0,0,0,0.02)', minHeight: '500px' }}>
            <AnimatePresence mode="wait">
               {activeTab === 'orders' && (
                 <motion.div key="orders" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '32px' }}>Order History</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                       {loadingOrders ? (
                         <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>Loading orders...</div>
                       ) : pastOrders.length === 0 ? (
                         <div style={{ padding: '60px', textAlign: 'center', background: '#f8fafc', borderRadius: '32px', border: '2px dashed #f1f5f9' }}>
                            <ShoppingBag size={48} style={{ marginBottom: '16px', opacity: 0.1 }} />
                            <p style={{ color: '#94a3b8', fontWeight: 700 }}>No orders found in your history yet.</p>
                            <Link to="/menu" style={{ color: 'var(--green-mid)', fontWeight: 900, textDecoration: 'none', marginTop: '12px', display: 'inline-block' }}>Start your first order →</Link>
                         </div>
                       ) : pastOrders.map(order => (
                         <div key={order.id} style={{ padding: '24px', borderRadius: '24px', border: '1.5px solid #f1f5f9' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                               <div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                                     <span style={{ fontWeight: 950, fontSize: '16px' }}>#{order.id?.slice(-8)}</span>
                                     <span style={{ background: 'var(--green-tint)', color: 'var(--green-dark)', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>{order.stage || 'preparing'}</span>
                                  </div>
                                  <div style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {new Date(order.createdAt).toLocaleDateString()}</div>
                               </div>
                               <div style={{ textAlign: 'right' }}>
                                  <div style={{ fontWeight: 950, fontSize: '20px', color: 'var(--green-dark)' }}>${order.total}</div>
                                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                     <Link to={`/tracking/${order.id}`} style={{ color: 'var(--gold)', fontWeight: 800, fontSize: '13px', textDecoration: 'none' }}>Track</Link>
                                     <button onClick={() => handleDeleteOrder(order.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                  </div>
                               </div>
                            </div>
                         </div>
                       ))}
                    </div>
                 </motion.div>
               )}

               {activeTab === 'addresses' && (
                 <motion.div key="address" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '32px' }}>Saved Delivery Addresses</h2>
                    <AddressManager />
                 </motion.div>
               )}

               {activeTab === 'dietary' && (
                 <motion.div key="diet" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '12px' }}>Dietary Profile</h2>
                    <p style={{ color: '#94a3b8', fontWeight: 700, marginBottom: '32px' }}>Customize your SMT Salam experience.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                       {[
                         { id: 'halal', label: 'Only Halal Items', icon: <ShieldCheck /> },
                         { id: 'nuts', label: 'Nut-Free Warning', icon: <Bell /> },
                       ].map(pref => (
                         <div key={pref.id} onClick={() => setDietaryPrefs(p => ({...p, [pref.id]: !p[pref.id]}))} style={{ padding: '24px', borderRadius: '24px', background: dietaryPrefs[pref.id] ? 'var(--green-tint)' : '#f8fafc', border: `2px solid ${dietaryPrefs[pref.id] ? 'var(--green-mid)' : '#f1f5f9'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                               <div style={{ color: dietaryPrefs[pref.id] ? 'var(--green-mid)' : '#94a3b8' }}>{pref.icon}</div>
                               <span style={{ fontWeight: 900, color: 'var(--green-dark)' }}>{pref.label}</span>
                            </div>
                            <div style={{ width: '40px', height: '22px', background: dietaryPrefs[pref.id] ? 'var(--green-mid)' : '#e2e8f0', borderRadius: '100px', position: 'relative' }}>
                               <div style={{ width: '16px', height: '16px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: dietaryPrefs[pref.id] ? '21px' : '3px', transition: '0.2s' }} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </motion.div>
               )}

               {activeTab === 'wallet' && (
                 <motion.div key="wallet" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '32px' }}>STM Wallet Credits</h2>
                    <div style={{ background: 'var(--green-dark)', borderRadius: '32px', padding: '32px', color: 'white', position: 'relative' }}>
                       <Zap size={40} color="var(--gold)" style={{ position: 'absolute', right: '30px', top: '30px', opacity: 0.2 }} />
                       <div style={{ fontSize: '13px', fontWeight: 800, opacity: 0.6, marginBottom: '16px' }}>CURRENT BALANCE</div>
                       <div style={{ fontSize: '48px', fontWeight: 950, marginBottom: '32px' }}>$0.00</div>
                       <button style={{ width: '100%', padding: '16px', background: 'var(--gold)', color: 'var(--green-dark)', border: 'none', borderRadius: '16px', fontWeight: 950, cursor: 'pointer' }}>Top Up Balance</button>
                    </div>
                 </motion.div>
               )}

               {activeTab === 'settings' && (
                 <motion.div key="settings" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '32px' }}>Account Settings</h2>
                    <div style={{ display: 'grid', gap: '24px' }}>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8' }}>EMAIL ADDRESS</label>
                          <input readOnly value={user?.email || ''} style={{ padding: '16px', borderRadius: '16px', border: '1.5px solid #f1f5f9', background: '#f8fafc', fontWeight: 700, color: '#64748b' }} />
                       </div>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '11px', fontWeight: 950, color: '#94a3b8' }}>PHONE NUMBER</label>
                          <input readOnly value={user?.phone || ''} style={{ padding: '16px', borderRadius: '16px', border: '1.5px solid #f1f5f9', background: '#f8fafc', fontWeight: 700, color: '#64748b' }} />
                       </div>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
           .container.profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function ActiveOrderTracker() {
  const [activeOrder, setActiveOrder] = useState(null)
  const orderId = localStorage.getItem('stm_last_order_id')
  
  useEffect(() => {
    if (!orderId) return
    const checkOrder = async () => {
      try {
        const data = await dataService.fetchOrderById(orderId);
        if (data && data.stage !== 'delivered') setActiveOrder(data)
        else setActiveOrder(null)
      } catch (e) { }
    }
    checkOrder(); 
    const interval = setInterval(checkOrder, 15000);
    return () => clearInterval(interval);
  }, [orderId])
  
  if (!activeOrder) return null
  
  return (
     <div style={{ position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)', zIndex: 900, width: 'calc(100% - 40px)', maxWidth: '560px' }}>
        <Link to={`/tracking/${orderId}`} style={{ textDecoration: 'none', background: 'white', borderRadius: '24px', padding: '16px 24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', border: '2px solid var(--gold)', display: 'flex', alignItems: 'center', gap: '16px' }}>
           <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Activity size={24} color="var(--gold)" /></div>
           <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                 <p style={{ margin: 0, fontWeight: 950, fontSize: '14px', color: 'var(--green-dark)' }}>Live Order Progress</p>
                 <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--gold)', letterSpacing: '1px' }}>TRACK LIVE</span>
              </div>
              <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px' }}>
                 <div style={{ width: '60%', height: '100%', background: 'var(--gold)', borderRadius: '2px' }} />
              </div>
           </div>
        </Link>
     </div>
  )
}

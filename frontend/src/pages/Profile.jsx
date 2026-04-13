import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  Settings, MapPin, CreditCard, ShoppingBag, ChevronRight, LogOut, 
  Package, Clock, Star, User, Mail, Phone, Edit3, CheckCircle, 
  Trash2, Plus, Wallet, Award, ShieldCheck, Heart, Zap, FileText, 
  Bell, Globe, Coffee, Info, MessageCircle, Leaf, Activity
} from 'lucide-react'
import { shopInfo } from '../data/menuData'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import AddressManager from '../components/AddressManager'
import { motion, AnimatePresence } from 'framer-motion'

export default function Profile() {
  const { user, isGuest, logout } = useAuth()
  const { cartItems, subtotal } = useCart()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')
  const [pastOrders, setPastOrders] = useState([
    { id: 'STM-8821', date: '28 Mar 2026', items: ['Teh Tarik (2)', 'Nasi Lemak Special (1)', 'Kopi O (1)'], total: 24.50, status: 'Delivered' },
    { id: 'STM-7942', date: '15 Mar 2026', items: ['Maggi Goreng (2)', 'Teh Tarik (2)'], total: 18.20, status: 'Delivered' },
    { id: 'STM-7103', date: '02 Mar 2026', items: ['Roti Prata (4)', 'Teh C (2)'], total: 12.80, status: 'Delivered' }
  ])

  // 2026 AI States
  const [dietaryPrefs, setDietaryPrefs] = useState({ halal: true, glutenFree: false, dairyFree: false, nuts: false })
  const [isPro, setIsPro] = useState(true)

  const handleDeleteOrder = (id) => {
    if (window.confirm('Are you sure you want to remove this order from your history?')) {
      setPastOrders(prev => prev.filter(o => o.id !== id))
    }
  }

  const handleLogout = () => {
    logout(); navigate('/login')
  }

  const generateWhatsAppMessage = () => {
    if (!cartItems || cartItems.length === 0) return "Hi STM Salam, I'd like to place an order!";
    let text = "Hi STM Salam, I'd like to order:\n\n";
    cartItems.forEach(item => {
      text += `${item.qty}x ${item.name} - $${(item.price * item.qty).toFixed(2)}\n`;
    });
    text += `\nTotal: $${subtotal.toFixed(2)}`;
    return encodeURIComponent(text);
  };

  if (!user && !isGuest) {
    return (
      <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px', padding: '20px' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--gold-tint)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}><User size={36} color="var(--gold)" /></div>
          <h2 style={{ fontSize: '28px', fontWeight: 900, color: 'var(--green-dark)', marginBottom: '12px' }}>Authentication Required</h2>
          <p style={{ color: 'var(--text-light)', marginBottom: '32px', fontSize: '16px', lineHeight: 1.7 }}>Unlock your personalized 2026 dining dashboard by signing in.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            <Link to="/login" className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '16px 40px', fontSize: '16px', borderRadius: '16px', textDecoration: 'none' }}>Sign In or Register</Link>
            <div style={{ color: 'var(--text-light)', fontSize: '14px', fontWeight: 800 }}>— OR —</div>
            <a href={`https://wa.me/${shopInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${generateWhatsAppMessage()}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', padding: '16px 40px', fontSize: '16px', borderRadius: '16px', textDecoration: 'none', background: '#25D366', color: 'white', border: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MessageCircle size={20} /> Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'orders', icon: <ShoppingBag size={20} />, label: 'My Orders' },
    { id: 'wallet', icon: <Wallet size={20} />, label: 'Wallet & Pro' },
    { id: 'addresses', icon: <MapPin size={20} />, label: 'Address Book' },
    { id: 'dietary', icon: <Heart size={20} />, label: 'Dietary Profile' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ]

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '120px' }}>
      {/* 2026 PREMIUM PROFILE HEADER */}
      <div style={{ background: 'var(--green-dark)', padding: '80px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 80% 20%, rgba(212,175,55,0.15) 0%, transparent 60%)' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
           <div className="profile-header-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className="profile-user-info" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                 <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--gold)', border: '4px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', fontWeight: 950, color: 'var(--green-dark)', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
                    {user?.name?.charAt(0) || 'S'}
                 </div>
                 <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                       <h1 style={{ color: 'white', fontSize: '36px', fontWeight: 950, letterSpacing: '-1.5px' }}>{user?.name || 'Guest User'}</h1>
                       {isPro && <span style={{ background: 'var(--gold)', color: 'var(--green-dark)', fontSize: '10px', fontWeight: 900, padding: '4px 10px', borderRadius: '100px', textTransform: 'uppercase' }}>PRO MEMBER</span>}
                    </div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', fontWeight: 700 }}>Joined March 2026 · {pastOrders.length} Orders Delivered</p>
                 </div>
              </div>
              <div className="stat-boxes" style={{ display: 'flex', gap: '16px' }}>
                 <div className="stat-box" style={{ background: 'rgba(255,255,255,0.05)', padding: '20px 32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <div style={{ color: 'var(--gold)', fontSize: '24px', fontWeight: 950 }}>$142.50</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 800, marginTop: '4px', textTransform: 'uppercase' }}>Wallet Credit</div>
                 </div>
                 <div className="stat-box" style={{ background: 'rgba(255,255,255,0.05)', padding: '20px 32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center' }}>
                    <div style={{ color: 'white', fontSize: '24px', fontWeight: 950 }}>1,240</div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 800, marginTop: '4px', textTransform: 'uppercase' }}>Reward Pts</div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="container profile-grid" style={{ marginTop: '-30px', display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px', position: 'relative', zIndex: 10 }}>
         {/* SIDEBAR NAVIGATION */}
         <div className="profile-sidebar custom-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tabs.map(tab => (
               <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 24px', borderRadius: '20px',
                  border: 'none', background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? 'var(--green-dark)' : '#64748b', fontWeight: 800,
                  boxShadow: activeTab === tab.id ? '0 10px 30px rgba(0,0,0,0.05)' : 'none',
                  cursor: 'pointer', transition: '0.2s', fontSize: '15px'
               }}>
                  <span style={{ color: activeTab === tab.id ? 'var(--green-mid)' : 'inherit' }}>{tab.icon}</span>
                  {tab.label}
               </button>
            ))}
            <button className="sidebar-logout" onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 24px', color: '#ef4444', border: 'none', background: 'none', fontWeight: 800, cursor: 'pointer', marginTop: '32px' }}>
               <LogOut size={20} /> Sign Out
            </button>
         </div>

         {/* CONTENT VIEW */}
         <div className="profile-content" style={{ background: 'white', borderRadius: '40px', padding: '48px', border: '1px solid #eef2f6', boxShadow: '0 20px 50px rgba(0,0,0,0.02)' }}>
            <AnimatePresence mode="wait">
               {activeTab === 'orders' && (
                 <motion.div key="orders" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                       <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)' }}>Order History</h2>
                       <button className="btn btn-outline" style={{ fontSize: '14px', borderRadius: '12px' }}>Download All Receipts</button>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                       {pastOrders.map(order => (
                         <div key={order.id} style={{ padding: '24px', borderRadius: '24px', border: '1.5px solid #f1f5f9', position: 'relative' }}>
                            <div className="order-item-wrap" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                               <div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                                     <span style={{ fontWeight: 950, fontSize: '16px' }}>#{order.id}</span>
                                     <span style={{ background: '#dcfce7', color: '#166534', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 900 }}>DELIVERED</span>
                                  </div>
                                  <div style={{ color: '#94a3b8', fontSize: '13px', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> {order.date}</div>
                               </div>
                               <div className="order-item-right" style={{ textAlign: 'right' }}>
                                  <div style={{ fontWeight: 950, fontSize: '20px', color: 'var(--green-dark)' }}>${order.total.toFixed(2)}</div>
                                  <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                                     <button style={{ background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 800, fontSize: '13px', cursor: 'pointer' }}>Reorder All</button>
                                     <button onClick={() => handleDeleteOrder(order.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                                  </div>
                               </div>
                            </div>
                            <div style={{ paddingTop: '16px', borderTop: '1px dashed #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                               <p style={{ margin: 0, fontSize: '14px', color: '#64748b', fontWeight: 600 }}>{order.items.join(', ')}</p>
                               <button style={{ background: '#f8fafc', border: 'none', padding: '10px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 800, color: 'var(--green-dark)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                  <FileText size={16} /> Digital Receipt
                               </button>
                            </div>
                         </div>
                       ))}
                    </div>
                 </motion.div>
               )}

               {activeTab === 'wallet' && (
                 <motion.div key="wallet" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '32px' }}>Payments & Wallet</h2>
                    <div className="wallet-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '40px' }}>
                       <div style={{ background: 'var(--green-dark)', borderRadius: '32px', padding: '32px', color: 'white', position: 'relative' }}>
                          <div style={{ position: 'absolute', right: '20px', top: '20px' }}><Zap size={40} color="var(--gold)" opacity={0.3} /></div>
                          <div style={{ fontSize: '12px', fontWeight: 800, opacity: 0.6, marginBottom: '24px', textTransform: 'uppercase' }}>STM Wallet Balance</div>
                          <div style={{ fontSize: '48px', fontWeight: 950, marginBottom: '4px' }}>$142.50</div>
                          <p style={{ fontSize: '13px', opacity: 0.6, marginBottom: '32px' }}>Available for instant checkout & refunds.</p>
                          <button className="btn btn-gold" style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '15px' }}>Top Up Wallet</button>
                       </div>
                       <div style={{ background: 'var(--cream)', borderRadius: '32px', padding: '32px', border: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                             <div style={{ width: '40px', height: '40px', background: 'var(--gold-tint)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Award size={22} color="var(--gold)" /></div>
                             <h4 style={{ fontSize: '18px', fontWeight: 900 }}>STM Pro Membership</h4>
                          </div>
                          <div style={{ fontSize: '32px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '4px' }}>$12.40 SAVED</div>
                          <p style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: 600, marginBottom: '32px' }}>You have saved $12.40 on delivery fees this month.</p>
                          <button className="btn btn-outline" style={{ width: '100%', padding: '14px', borderRadius: '14px', fontSize: '14px' }}>Manage Subscription</button>
                       </div>
                    </div>
                 </motion.div>
               )}

               {activeTab === 'dietary' && (
                 <motion.div key="diet" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '12px' }}>Dietary Profile</h2>
                    <p style={{ color: '#94a3b8', fontWeight: 700, marginBottom: '32px' }}>AI-optimized filtering: We'll automatically hide or flag items based on these choices.</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                       {[
                         { id: 'halal', label: 'Strictly Halal', desc: 'Only show certified halal options', icon: <CheckCircle /> },
                         { id: 'glutenFree', label: 'Gluten-Free Only', desc: 'Hide items containing wheat or gluten', icon: <Leaf /> },
                         { id: 'dairyFree', label: 'Dairy-Free', desc: 'Prioritize lactose-free and vegan alternatives', icon: <Coffee /> },
                         { id: 'nuts', label: 'Nut Allergy Alert', desc: 'Active warning for items containing peanuts or tree nuts', icon: <AlertCircle /> }
                       ].map(pref => (
                         <div key={pref.id} onClick={() => setDietaryPrefs({...dietaryPrefs, [pref.id]: !dietaryPrefs[pref.id]})} style={{ 
                           padding: '24px', borderRadius: '24px', background: dietaryPrefs[pref.id] ? 'var(--green-tint)' : '#f8fafc',
                           border: `2px solid ${dietaryPrefs[pref.id] ? 'var(--green-mid)' : '#eef2f6'}`,
                           display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: '0.2s'
                         }}>
                            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                               <div style={{ color: dietaryPrefs[pref.id] ? 'var(--green-mid)' : '#94a3b8' }}>{pref.icon}</div>
                               <div>
                                  <div style={{ fontWeight: 900, fontSize: '17px', color: 'var(--green-dark)' }}>{pref.label}</div>
                                  <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>{pref.desc}</div>
                               </div>
                            </div>
                            <div style={{ width: '48px', height: '24px', background: dietaryPrefs[pref.id] ? 'var(--green-mid)' : '#e2e8f0', borderRadius: '100px', position: 'relative' }}>
                               <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: dietaryPrefs[pref.id] ? '26px' : '4px', transition: '0.3s' }} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </motion.div>
               )}

               {activeTab === 'addresses' && (
                 <motion.div key="address" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                       <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)' }}>Address Book</h2>
                       <button className="btn btn-gold" style={{ padding: '12px 24px', borderRadius: '14px', fontSize: '14px' }}><Plus size={18} /> Add New Label</button>
                    </div>
                    <AddressManager />
                 </motion.div>
               )}

               {activeTab === 'settings' && (
                 <motion.div key="settings" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '32px' }}>Account Settings</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                       <div className="settings-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                             <label style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Full Name</label>
                             <input defaultValue={user?.name || 'Ahmad Faiz'} style={{ padding: '16px', borderRadius: '16px', border: '1.5px solid #eef2f6', outline: 'none', fontWeight: 700 }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                             <label style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Phone Number</label>
                             <input defaultValue={user?.phone || '9123 4567'} style={{ padding: '16px', borderRadius: '16px', border: '1.5px solid #eef2f6', outline: 'none', fontWeight: 700 }} />
                          </div>
                       </div>
                       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <label style={{ fontSize: '12px', fontWeight: 800, color: '#94a3b8', textTransform: 'uppercase' }}>Notification Preferences</label>
                          <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '24px', border: '1px solid #eef2f6' }}>
                             <NotificationToggle label="Order Updates (SMS)" active={true} />
                             <div style={{ height: '1px', background: '#eef2f6', margin: '16px 0' }} />
                             <NotificationToggle label="Marketing Promos" active={false} />
                          </div>
                       </div>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
          .profile-sidebar { flex-direction: row !important; overflow-x: auto !important; padding-bottom: 8px !important; margin-top: -10px !important; }
          .profile-sidebar > button { white-space: nowrap !important; padding: 12px 20px !important; }
          .sidebar-logout { margin-top: 0 !important; }
          .profile-content { padding: 24px !important; border-radius: 24px !important; }
          .profile-header-inner { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; }
          .stat-boxes { width: 100% !important; justify-content: space-between !important; }
          .stat-box { flex: 1 !important; padding: 16px !important; }
          
          /* Inner tabs fixes */
          .order-item-wrap { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
          .order-item-right { text-align: left !important; width: 100% !important; display: flex !important; justify-content: space-between !important; align-items: center !important; }
          .wallet-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
          .settings-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
        }
      `}</style>
    </div>
  )
}

function NotificationToggle({ label, active }) {
  const [isOn, setIsOn] = useState(active)
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
       <span style={{ fontWeight: 800, color: 'var(--green-dark)', fontSize: '15px' }}>{label}</span>
       <div onClick={() => setIsOn(!isOn)} style={{ width: '48px', height: '24px', background: isOn ? 'var(--green-mid)' : '#cbd5e1', borderRadius: '100px', cursor: 'pointer', position: 'relative' }}>
          <div style={{ width: '18px', height: '18px', background: 'white', borderRadius: '50%', position: 'absolute', top: '3px', left: isOn ? '26px' : '4px', transition: '0.3s' }} />
       </div>
    </div>
  )
}

function AlertCircle() { return <Info size={24} /> }

import { API_URL } from '../config/api'

function ActiveOrderTracker() {
  const [activeOrder, setActiveOrder] = useState(null)
  const orderId = localStorage.getItem('stm_last_order_id')
  useEffect(() => {
    if (!orderId) return
    const checkOrder = async () => {
      try {
        const res = await fetch(`${API_URL}/orders/${orderId}`)
        const data = await res.json()
        if (data.id && data.status !== 'delivered') setActiveOrder(data)
        else setActiveOrder(null)
      } catch (e) { }
    }
    checkOrder(); const interval = setInterval(checkOrder, 10000)
    return () => clearInterval(interval)
  }, [orderId])
  if (!activeOrder) return null
  return (
     <div style={{ position: 'fixed', top: '100px', left: '50%', transform: 'translateX(-50%)', zIndex: 900, width: '100%', maxWidth: '600px', padding: '0 20px' }}>
        <Link to={`/tracking/${orderId}`} style={{ textDecoration: 'none', background: 'white', borderRadius: '20px', padding: '16px 24px', boxShadow: '0 25px 50px rgba(0,0,0,0.15)', border: '1px solid var(--gold)', display: 'flex', alignItems: 'center', gap: '16px' }}>
           <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Activity size={20} color="var(--gold)" /></div>
           <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <p style={{ margin: 0, fontWeight: 900, fontSize: '14px', color: 'var(--green-dark)' }}>Live Order Progress</p>
                 <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--gold)' }}>VIEW LIVE MAP</span>
              </div>
              <div style={{ height: '4px', background: 'var(--cream)', borderRadius: '2px', marginTop: '8px' }}>
                 <div style={{ width: '65%', height: '100%', background: 'var(--gold)', borderRadius: '2px' }} />
              </div>
           </div>
        </Link>
     </div>
  )
}

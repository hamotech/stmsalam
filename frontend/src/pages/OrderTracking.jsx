import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapPin, Phone, Clock, CheckCircle, Truck, Package, MessageSquare, ChevronRight, ArrowLeft, Star, ShoppingBag, ReceiptText, RefreshCcw, Plus, Loader } from 'lucide-react'
import { shopInfo } from '../data/menuData'
import { API_URL } from '../config/api'
import { dataService } from '../admin/services/dataService'

export default function OrderTracking() {
  const { orderId: id } = useParams()
  const navigate = useNavigate()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  const steps = [
    { id: 'pending', label: 'Order Placed', desc: 'We have received your order', icon: <Plus size={20} /> },
    { id: 'accepted', label: 'Accepted', desc: 'STM Salam is preparing your food', icon: <CheckCircle size={20} /> },
    { id: 'preparing', label: 'Preparing', desc: 'Our chefs are grilling your kebabs', icon: <Clock size={20} /> },
    { id: 'ready', label: 'Food Ready', desc: 'Order is packed and ready', icon: <Package size={20} /> },
    { id: 'delivering', label: 'Out for Delivery', desc: 'Driver is on the way', icon: <Truck size={20} /> },
    { id: 'delivered', label: 'Delivered', desc: 'Enjoy your meal!', icon: <CheckCircle size={20} /> }
  ]

  const getActiveStep = (status) => {
    const idx = steps.findIndex(s => s.id === status)
    return idx === -1 ? 0 : idx
  }

  const fetchOrder = async () => {
    if (!id) return
    try {
      const orders = dataService.getOrders();
      const found = orders.find(o => o.id === id);
      if (found) {
        setOrder(found)
        setLoading(false)
      }
    } catch (err) {
      console.error('Tracking Error:', err)
    }
  }

  useEffect(() => {
    fetchOrder()
    const handleLocalUpdate = () => fetchOrder();
    window.addEventListener('stm_data_updated', handleLocalUpdate);
    const interval = setInterval(fetchOrder, 5000);
    return () => {
        clearInterval(interval);
        window.removeEventListener('stm_data_updated', handleLocalUpdate);
    };
  }, [id])

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: '20px' }}>
        <Loader size={48} className="spin" color="var(--gold)" />
        <h2 style={{ fontWeight: 800 }}>Tracking your order...</h2>
        <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const activeStep = getActiveStep(order.status)
  const orderType = order.mode || 'delivery'

  return (
    <div style={{ background: 'var(--bg-body)', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Premium Header */}
      <div style={{ background: 'var(--green-dark)', padding: '60px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1800)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: 'var(--gold)', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '24px' }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
             <div>
                <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 900, letterSpacing: '-2px', marginBottom: '8px' }}>Order Tracking</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px' }}>ID: <span style={{ color: 'white', fontWeight: 700 }}>#{order.id}</span> · {order.items.length} Items</p>
             </div>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: '16px 32px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                <div style={{ color: 'var(--gold)', fontWeight: 900, fontSize: '28px', lineHeight: 1 }}>{activeStep >= 5 ? 'Delivered' : '25–35 min'}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: 800, marginTop: '4px', textTransform: 'uppercase', letterSpacing: '1px' }}>{activeStep >= 5 ? 'Enjoy your food' : 'Estimated Time'}</div>
             </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px', alignItems: 'start' }}>
        
        {/* Progress Tracker Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div style={{ background: 'white', borderRadius: '32px', padding: '48px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ position: 'relative' }}>
                 {/* Main Line */}
                 <div style={{ position: 'absolute', left: '26px', top: '24px', bottom: '24px', width: '4px', background: 'var(--border)', zIndex: 0 }} />
                 {/* Progress Overlay */}
                 <div style={{ 
                    position: 'absolute', left: '26px', top: '24px', 
                    height: `${(activeStep / (steps.length - 1)) * 100}%`, 
                    width: '4px', background: 'var(--success)', zIndex: 1,
                    transition: 'all 1s ease-in-out'
                 }} />

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', zIndex: 2 }}>
                    {steps.map((step, i) => {
                      const isCompleted = i < activeStep
                      const isActive = i === activeStep
                      return (
                        <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                           <div style={{
                             width: '56px', height: '56px', borderRadius: '18px',
                             background: isCompleted ? 'var(--success)' : isActive ? 'var(--gold)' : 'white',
                             border: `3px solid ${isCompleted ? 'var(--success)' : isActive ? 'var(--gold)' : 'var(--border)'}`,
                             color: isCompleted || isActive ? 'white' : 'var(--text-light)',
                             display: 'flex', alignItems: 'center', justifyContent: 'center',
                             boxShadow: isActive ? 'var(--shadow-gold)' : 'none',
                             transition: 'all 0.3s'
                           }}>
                             {isCompleted ? <CheckCircle size={24} /> : step.icon}
                           </div>
                           <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 900, fontSize: '19px', color: isCompleted || isActive ? 'var(--text-dark)' : 'var(--text-light)' }}>{step.label}</div>
                              <div style={{ fontSize: '14px', color: 'var(--text-light)', fontWeight: 600 }}>{step.desc}</div>
                           </div>
                           {isActive && (
                             <div style={{ background: 'var(--gold-tint)', color: 'var(--gold)', padding: '6px 12px', borderRadius: '100px', fontSize: '12px', fontWeight: 900 }}>IN PROGRESS</div>
                           )}
                        </div>
                      )
                    })}
                 </div>
              </div>
           </div>

           {/* Map Embed or Placeholder */}
           <div style={{ background: 'white', borderRadius: '32px', overflow: 'hidden', height: '340px', border: '1px solid var(--border)', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200)', backgroundSize: 'cover', opacity: 0.6 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                 <div style={{ background: 'white', padding: '16px 24px', borderRadius: '40px', boxShadow: 'var(--shadow-xl)', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 900 }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--success)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                    {order.status === 'delivering' ? 'Our driver is on the move' : 'Tracking position live'}
                 </div>
              </div>
           </div>
        </div>

        {/* Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           {/* Order Summary */}
           <div style={{ background: 'white', borderRadius: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <div style={{ background: 'var(--cream)', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <ReceiptText size={22} color="var(--green-mid)" />
                 <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--green-dark)' }}>Order Summary</h3>
              </div>
              <div style={{ padding: '32px' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    {order.items.map((item, idx) => (
                       <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                             <span style={{ fontWeight: 900, fontSize: '14px', background: 'var(--cream)', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.qty}</span>
                             <span style={{ fontWeight: 700, fontSize: '15px' }}>{item.name}</span>
                          </div>
                          <span style={{ fontWeight: 800, fontSize: '15px' }}>${(item.price * item.qty).toFixed(2)}</span>
                       </div>
                    ))}
                 </div>
                 <div style={{ borderTop: '1.5px solid var(--border)', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '18px' }}>Total Amount</span>
                    <span style={{ fontWeight: 900, fontSize: '24px', color: 'var(--green-dark)' }}>${order.total}</span>
                 </div>
              </div>
           </div>

           {/* Actions */}
           <div style={{ background: 'white', borderRadius: '32px', padding: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Need Assistance?</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 <button className="btn btn-primary" style={{ width: '100%', borderRadius: '16px', padding: '16px', justifyContent: 'center', gap: '12px' }}>
                    <Phone size={18} /> Contact Shop
                 </button>
                 <button className="btn btn-outline" style={{ width: '100%', borderRadius: '16px', padding: '16px', justifyContent: 'center', gap: '12px' }}>
                    <RefreshCcw size={18} /> Reorder This Meal
                 </button>
              </div>
           </div>

           {/* Delivery Partner */}
           {orderType === 'delivery' && (
             <div style={{ background: 'white', borderRadius: '32px', padding: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                <h4 style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>Your Delivery Partner</h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '16px', overflow: 'hidden', background: 'var(--cream)' }}>
                       <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=200" alt="Driver" />
                    </div>
                    <div>
                       <div style={{ fontWeight: 900, fontSize: '18px' }}>Suresh Kumar</div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'var(--text-light)', fontWeight: 700 }}>
                          <Star size={14} fill="var(--gold)" color="var(--gold)" /> 4.9 · Honda FB 1234
                       </div>
                    </div>
                </div>
             </div>
           )}

           <Link to="/menu" style={{ color: 'var(--green-mid)', fontWeight: 800, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', padding: '10px', textDecoration: 'none' }}>
              <Plus size={18} /> Order something more <ChevronRight size={18} />
           </Link>
        </div>
      </div>

      <style>{`
         @keyframes pulse {
           0% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.4); }
           70% { box-shadow: 0 0 0 10px rgba(22, 163, 74, 0); }
           100% { box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
         }
      `}</style>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { MapPin, Phone, Clock, CheckCircle, Truck, Package, MessageSquare, ChevronRight, ArrowLeft, Star, ShoppingBag, ReceiptText, RefreshCcw, Plus, Loader } from 'lucide-react'
import { shopInfo } from '../data/menuData'
import { fetchOrderById } from '../admin/services/dataService'

export default function OrderTracking() {
  const { orderId: id } = useParams()
  const navigate = useNavigate()
  
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const steps = [
    { id: 'pending', label: 'Order Placed', desc: 'We have received your order', icon: <Plus size={20} /> },
    { id: 'accepted', label: 'Accepted', desc: 'STM Salam is preparing your food', icon: <CheckCircle size={20} /> },
    { id: 'preparing', label: 'Preparing', desc: 'Our chefs are grilling your kebabs', icon: <Clock size={20} /> },
    { id: 'ready', label: 'Food Ready', desc: 'Order is packed and ready', icon: <Package size={20} /> },
    { id: 'delivering', label: 'Out for Delivery', desc: 'Driver is on the way', icon: <Truck size={20} /> },
    { id: 'delivered', label: 'Delivered', desc: 'Enjoy your meal!', icon: <CheckCircle size={20} /> }
  ]

  const getActiveStep = (status) => {
    if (!status) return 0;
    const idx = steps.findIndex(s => s.id === status.toLowerCase())
    return idx === -1 ? 0 : idx
  }

  const loadOrder = async () => {
    if (!id) {
        setError(true)
        setLoading(false)
        return
    }
    try {
      const data = await fetchOrderById(id);
      if (data) {
        setOrder(data)
        setError(false)
      } else {
        setError(true)
      }
    } catch (err) {
      console.error('Tracking Error:', err)
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrder()
    const interval = setInterval(loadOrder, 10000); // Polling every 10s
    return () => clearInterval(interval);
  }, [id])

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: '20px', background: '#f8fafc' }}>
        <Loader size={48} className="spin" color="var(--gold)" />
        <h2 style={{ fontWeight: 800, color: 'var(--green-dark)' }}>Connecting to Kitchen...</h2>
        <style>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (error || !order) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh', gap: '24px', textAlign: 'center', padding: '20px' }}>
        <div style={{ width: '80px', height: '80px', background: '#fee2e2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ReceiptText size={40} color="#ef4444" />
        </div>
        <div>
            <h2 style={{ fontSize: '28px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '12px' }}>Order Not Found</h2>
            <p style={{ color: '#64748b', maxWidth: '400px' }}>We couldn't find an order with ID: <strong>{id}</strong>. Please check your order history or link.</p>
        </div>
        <button onClick={() => navigate('/profile')} className="btn btn-gold" style={{ padding: '16px 32px', borderRadius: '16px' }}>View My Orders</button>
      </div>
    )
  }

  const activeStep = getActiveStep(order.status || order.stage || 'pending')
  const orderType = order.mode || 'delivery'

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Premium Header */}
      <div style={{ background: 'var(--green-dark)', padding: '60px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1800)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <button onClick={() => navigate('/')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', fontWeight: 800, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', marginBottom: '24px', padding: '8px 16px', borderRadius: '12px' }}>
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
             <div>
                <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 900, letterSpacing: '-2px', marginBottom: '8px' }}>Your Order Status</h1>
                <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', fontWeight: 600 }}>ID: <span style={{ color: 'white' }}>#{order.id?.slice(-8)}</span> · {(order.items || []).length} Items</p>
             </div>
             <div style={{ background: 'rgba(255,255,255,0.1)', padding: '20px 40px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)', textAlign: 'center' }}>
                <div style={{ color: 'var(--gold)', fontWeight: 950, fontSize: '32px', lineHeight: 1 }}>{activeStep >= 5 ? 'Arrived!' : 'Preparing'}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 800, marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Current Status</div>
             </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', alignItems: 'start' }}>
        
        {/* Progress Tracker Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           <div style={{ background: 'white', borderRadius: '32px', padding: '40px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ position: 'relative' }}>
                 {/* Main Line */}
                 <div style={{ position: 'absolute', left: '26px', top: '24px', bottom: '24px', width: '4px', background: '#f1f5f9', zIndex: 0 }} />
                 {/* Progress Overlay */}
                 <div style={{ 
                    position: 'absolute', left: '26px', top: '24px', 
                    height: `${(activeStep / (steps.length - 1)) * 100}%`, 
                    width: '4px', background: 'var(--green-mid)', zIndex: 1,
                    transition: 'all 1s ease-in-out'
                 }} />

                 <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', position: 'relative', zIndex: 2 }}>
                    {steps.map((step, i) => {
                      const isCompleted = i < activeStep
                      const isActive = i === activeStep
                      return (
                        <div key={i} style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
                           <div style={{
                             width: '56px', height: '56px', borderRadius: '18px',
                             background: isCompleted ? 'var(--green-mid)' : isActive ? 'var(--gold)' : 'white',
                             border: `3px solid ${isCompleted ? 'var(--green-mid)' : isActive ? 'var(--gold)' : '#e2e8f0'}`,
                             color: isCompleted || isActive ? 'white' : '#94a3b8',
                             display: 'flex', alignItems: 'center', justifyContent: 'center',
                             transition: 'all 0.3s'
                           }}>
                             {isCompleted ? <CheckCircle size={24} /> : step.icon}
                           </div>
                           <div style={{ flex: 1 }}>
                              <div style={{ fontWeight: 900, fontSize: '18px', color: isCompleted || isActive ? '#0f172a' : '#94a3b8' }}>{step.label}</div>
                              <div style={{ fontSize: '14px', color: '#64748b', fontWeight: 600 }}>{step.desc}</div>
                           </div>
                           {isActive && (
                             <div style={{ background: 'var(--gold-tint)', color: 'var(--gold)', padding: '6px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 900 }}>LIVE</div>
                           )}
                        </div>
                      )
                    })}
                 </div>
              </div>
           </div>

           {/* Map Embed or Placeholder */}
           <div style={{ background: 'white', borderRadius: '32px', overflow: 'hidden', height: '340px', border: '1px solid #e2e8f0', position: 'relative' }}>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200)', backgroundSize: 'cover', opacity: 0.6 }} />
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center' }}>
                 <div style={{ background: 'white', padding: '16px 24px', borderRadius: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', display: 'inline-flex', alignItems: 'center', gap: '12px', fontWeight: 900 }}>
                    <div style={{ width: '12px', height: '12px', background: 'var(--green-mid)', borderRadius: '50%', animation: 'pulse 2s infinite' }} />
                    GPS Tracking Active
                 </div>
              </div>
           </div>
        </div>

        {/* Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
           {/* Order Summary */}
           <div style={{ background: 'white', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
              <div style={{ background: 'var(--cream)', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <ReceiptText size={22} color="var(--green-mid)" />
                 <h3 style={{ fontSize: '18px', fontWeight: 950, color: 'var(--green-dark)' }}>Order Summary</h3>
              </div>
              <div style={{ padding: '32px' }}>
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                    {(order.items || []).map((item, idx) => (
                       <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                             <span style={{ fontWeight: 900, fontSize: '14px', background: 'var(--cream)', width: '32px', height: '32px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{item.qty}</span>
                             <span style={{ fontWeight: 800, fontSize: '15px', color: '#0f172a' }}>{item.name}</span>
                          </div>
                          <span style={{ fontWeight: 950, fontSize: '15px' }}>${((item.price || 0) * (item.qty || 0)).toFixed(2)}</span>
                       </div>
                    ))}
                 </div>
                 <div style={{ borderTop: '2px solid #f1f5f9', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '18px', color: '#64748b' }}>Total Paid</span>
                    <span style={{ fontWeight: 950, fontSize: '28px', color: 'var(--green-dark)', letterSpacing: '-1px' }}>${order.total}</span>
                 </div>
              </div>
           </div>

           {/* Actions */}
           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                onClick={() => window.open(`https://wa.me/${shopInfo.whatsapp.replace(/\D/g, '')}?text=Hi, I am checking on my order #${id}`, '_blank')}
                style={{ width: '100%', borderRadius: '20px', padding: '20px', background: 'var(--green-dark)', color: 'white', border: 'none', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 10px 25px rgba(1,50,32,0.15)' }}
              >
                 <MessageSquare size={20} /> Chat with Shop
              </button>
              <button 
                onClick={() => navigate('/menu')}
                style={{ width: '100%', borderRadius: '20px', padding: '20px', background: 'white', color: 'var(--green-dark)', border: '2px solid var(--green-dark)', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
              >
                 <Plus size={20} /> Order More Food
              </button>
           </div>
        </div>
      </div>

      <style>{`
         @keyframes pulse {
           0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
           70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
           100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
         }
      `}</style>
    </div>
  )
}

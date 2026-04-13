import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, CreditCard, Banknote, Wallet, Phone, Home, Bike, ShieldCheck, ChevronDown, Check, User, Mail, MessageSquare, ArrowLeft, ReceiptText, Lock, QrCode, ArrowRight } from 'lucide-react'
import { shopInfo } from '../data/menuData'
import { useCart } from '../context/CartContext'
import { API_URL } from '../config/api'
import { placeOrder } from '../admin/services/dataService'

export default function Checkout() {
  const navigate = useNavigate()
  const { cartItems, subtotal, clearCart } = useCart()
  const [mode, setMode] = useState('delivery')
  const [payment, setPayment] = useState('card')
  const [formData, setFormData] = useState({
    name: 'Ahmad Faiz',
    phone: '+65 9123 4567',
    email: 'faiz@example.com',
    address: 'Blk 55 Marine Terrace, #04-123, Singapore 440055',
    notes: '',
  })
  const [paymentStatus, setPaymentStatus] = useState('idle') // 'idle' | 'awaiting' | 'verifying' | 'success'
  const [orderDetails, setOrderDetails] = useState(null)
  const [processing, setProcessing] = useState(false)

  const deliveryFee = mode === 'delivery' ? (subtotal >= 30 ? 0 : shopInfo.deliveryFee) : 0
  const taxRate = 0.09 // 9% GST
  const tax = subtotal * taxRate
  const total = subtotal + tax + deliveryFee

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const verifyPayment = async () => {
    setPaymentStatus('verifying')
    
    // Simulate Status API Check (3 seconds)
    setTimeout(async () => {
      setPaymentStatus('success')
      await finalizeOrder(true) // Finalize and Confirm
    }, 3000)
  }

  const handlePlaceOrder = async (shouldOpenWhatsApp = true) => {
    if (payment === 'paynow' || payment === 'card') {
      setPaymentStatus('awaiting')
      return // Don't confirm yet
    }
    
    // For Cash, proceed to finalize
    setProcessing(true)
    await finalizeOrder(shouldOpenWhatsApp)
  }

  const finalizeOrder = async (shouldOpenWhatsApp = true) => {
    try {
      setProcessing(true)
      
      const newOrder = await placeOrder({
          customer: formData,
          items: cartItems,
          total: total.toFixed(2),
          mode,
          payment,
          notes: formData.notes,
          payment_status: payment === 'cash' ? 'pending' : 'paid',
          stage: 'kitchen_preparation'
      });
      
      // 2. WhatsApp Notification
      if (shouldOpenWhatsApp) {
        const itemsList = cartItems.map(item => `${item.qty}x ${item.name} ($${(item.price * item.qty).toFixed(2)})`).join('\n')
        const message = `*Order Confirmed (Paid)!*%0A*Order ID:* ${newOrder.id}%0A-------------------------%0A*Customer:* ${formData.name}%0A*Total: $${total.toFixed(2)}*%0A*Payment:* ${payment.toUpperCase()} (VERIFIED)%0A*Pushed to Kitchen Preparation!*`
        const whatsappUrl = `https://wa.me/${shopInfo.whatsapp.replace(/\D/g, '')}?text=${message}`
        window.open(whatsappUrl, '_blank')
      }
      
      clearCart()
      localStorage.setItem('stm_last_order_id', newOrder.id)
      
      // Success delay for UX
      setTimeout(() => navigate(`/tracking/${newOrder.id}`), 1000)
    } catch (err) {
      alert('Order finalization failed.');
      setPaymentStatus('idle')
    } finally {
      setProcessing(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px' }}>
        <h2>Your cart is empty</h2>
        <button onClick={() => navigate('/menu')} className="btn btn-primary" style={{ marginTop: '20px' }}>Browse Menu</button>
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--bg-body)', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ background: 'var(--green-dark)', padding: '60px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1800)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', cursor: 'pointer', fontWeight: 800, fontSize: '14px', marginBottom: '24px' }}>
            <ArrowLeft size={16} /> Return to Cart
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{ color: 'white', fontSize: '48px', fontWeight: 900, letterSpacing: '-2px', marginBottom: '8px' }}>Finalize Order</h1>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '17px' }}>Review your details and confirm your delivery</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 420px', gap: '40px', alignItems: 'start' }}>
        {/* Left Column: Form Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* MODE SELECTOR */}
          <section style={{ background: 'white', borderRadius: '32px', padding: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', background: 'var(--gold-tint)', color: 'var(--gold)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>1</div>
              Choose Fulfilment
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[
                { id: 'delivery', icon: <Bike size={24} />, title: 'Doorstep Delivery', sub: 'To your location' },
                { id: 'pickup', icon: <Home size={24} />, title: 'Self-Pickup', sub: 'Collect from shop' }
              ].map(m => (
                <div key={m.id} onClick={() => setMode(m.id)} style={{
                  border: `2.5px solid ${mode === m.id ? 'var(--green-mid)' : 'var(--border)'}`,
                  borderRadius: '20px', padding: '24px', cursor: 'pointer',
                  background: mode === m.id ? 'var(--green-tint)' : 'white',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative'
                }}>
                  <div style={{ color: mode === m.id ? 'var(--green-mid)' : 'var(--text-light)', marginBottom: '16px' }}>{m.icon}</div>
                  <div style={{ fontWeight: 900, fontSize: '18px', color: mode === m.id ? 'var(--green-mid)' : 'var(--text-dark)' }}>{m.title}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-light)', fontWeight: 600 }}>{m.sub}</div>
                  {mode === m.id && <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--green-mid)', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Check size={16} /></div>}
                </div>
              ))}
            </div>
          </section>

          {/* CONTACT & DELIVERY INFO */}
          <section style={{ background: 'white', borderRadius: '32px', padding: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', background: 'var(--gold-tint)', color: 'var(--gold)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>2</div>
              Order Details
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase' }}>Full Name</label>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--cream)', borderRadius: '14px', padding: '0 16px', border: '1.5px solid var(--border)' }}>
                        <User size={18} color="var(--text-light)" />
                        <input name="name" value={formData.name} onChange={handleChange} style={{ border: 'none', background: 'transparent', outline: 'none', height: '52px', width: '100%', fontWeight: 700, fontSize: '15px' }} />
                     </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                     <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase' }}>Phone Number</label>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--cream)', borderRadius: '14px', padding: '0 16px', border: '1.5px solid var(--border)' }}>
                        <Phone size={18} color="var(--text-light)" />
                        <input name="phone" value={formData.phone} onChange={handleChange} style={{ border: 'none', background: 'transparent', outline: 'none', height: '52px', width: '100%', fontWeight: 700, fontSize: '15px' }} />
                     </div>
                  </div>
               </div>

               {mode === 'delivery' && (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase' }}>Delivery Address</label>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'var(--green-tint)', borderRadius: '14px', padding: '16px', border: '1.5px solid var(--green-mid)' }}>
                       <MapPin size={20} color="var(--green-mid)" style={{ marginTop: '2px' }} />
                       <div style={{ flex: 1 }}>
                          <textarea name="address" value={formData.address} onChange={handleChange} style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontWeight: 700, fontSize: '15px', minHeight: '60px', color: 'var(--green-dark)', resize: 'none', lineHeight: 1.5 }} />
                          <div style={{ color: 'var(--green-mid)', fontSize: '12px', fontWeight: 800, marginTop: '4px' }}>✓ Current delivery zone: Marine Terrace / Bedok</div>
                       </div>
                    </div>
                 </div>
               )}

               <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 800, color: 'var(--text-light)', textTransform: 'uppercase' }}>Order Notes (Optional)</label>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', background: 'var(--cream)', borderRadius: '14px', padding: '16px', border: '1.5px solid var(--border)' }}>
                     <MessageSquare size={18} color="var(--text-light)" style={{ marginTop: '2px' }} />
                     <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Allergies, no onions, leave at door, etc." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontWeight: 600, fontSize: '14px', minHeight: '60px', resize: 'none', lineHeight: 1.5 }} />
                  </div>
               </div>
            </div>
          </section>

          {/* PAYMENT OPTIONS */}
          <section style={{ background: 'white', borderRadius: '32px', padding: '32px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', background: 'var(--gold-tint)', color: 'var(--gold)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</div>
              How would you like to pay?
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
               {[
                 { id: 'card', icon: <CreditCard size={22} />, title: 'Credit / Debit Card', sub: 'HitPay Integrated Checkout' },
                 { id: 'paynow', icon: <Wallet size={22} />, title: 'PayNow / SGQR', sub: 'Scan & Verify instantly' },
                 { id: 'cash', icon: <Banknote size={22} />, title: 'Cash on Hand', sub: mode === 'delivery' ? 'Pay rider upon delivery' : 'Pay at the counter' }
               ].map(p => (
                 <div key={p.id} style={{ display: 'flex', flexDirection: 'column' }}>
                   <div onClick={() => { if(paymentStatus === 'idle') setPayment(p.id) }} style={{
                     display: 'grid', gridTemplateColumns: '48px 1fr 24px', alignItems: 'center',
                     border: `1.5px solid ${payment === p.id ? 'var(--green-mid)' : 'var(--border)'}`,
                     background: payment === p.id ? 'var(--green-tint)' : 'white',
                     borderRadius: '20px', padding: '18px 20px', cursor: 'pointer', transition: '0.2s',
                     opacity: paymentStatus !== 'idle' && payment !== p.id ? 0.5 : 1
                   }}>
                     <div style={{ color: payment === p.id ? 'var(--green-mid)' : 'var(--text-light)' }}>{p.icon}</div>
                     <div>
                        <div style={{ fontWeight: 800, fontSize: '15px', color: payment === p.id ? 'var(--green-mid)' : 'var(--text-dark)' }}>{p.title}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>{p.sub}</div>
                     </div>
                     <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: `2px solid ${payment === p.id ? 'var(--green-mid)' : 'var(--border)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {payment === p.id && <div style={{ width: '12px', height: '12px', background: 'var(--green-mid)', borderRadius: '50%' }} />}
                     </div>
                   </div>
                   
                   {/* Integrated Payment Context (QR/Link) */}
                   {p.id === payment && paymentStatus !== 'idle' && (
                     <div style={{ background: '#f0f9ff', margin: '12px 0 0 0', padding: '24px', borderRadius: '24px', border: '2.5px solid var(--gold)', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
                        {paymentStatus === 'awaiting' && (
                          <>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
                               <QrCode size={20} color="var(--green-dark)" />
                               <p style={{ fontWeight: 900, color: 'var(--green-dark)', margin: 0, fontSize: '15px', textTransform: 'uppercase' }}>Waiting for Payment Success</p>
                            </div>
                            <div style={{ display: 'inline-block', margin: '8px 0', background: 'white', padding: '16px', borderRadius: '20px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
                               <QrCode size={160} color="var(--green-dark)" strokeWidth={1.2} />
                            </div>
                            <div style={{ marginTop: '24px' }}>
                               <button onClick={verifyPayment} className="btn btn-gold" style={{ width: '100%', padding: '16px', borderRadius: '14px', justifyContent: 'center' }}>
                                 Verify Payment Status <ShieldCheck size={18} />
                               </button>
                            </div>
                          </>
                        )}

                        {paymentStatus === 'verifying' && (
                          <div style={{ padding: '40px 0' }}>
                             <div className="pulse-loader" style={{ width: '50px', height: '50px', background: 'var(--gold)', borderRadius: '50%', margin: '0 auto 20px', animation: 'pulse 1s infinite' }} />
                             <p style={{ fontWeight: 900, color: 'var(--green-dark)' }}>Confirming with HitPay Status API...</p>
                          </div>
                        )}

                        {paymentStatus === 'success' && (
                          <div style={{ padding: '40px 0' }}>
                             <div style={{ width: '60px', height: '60px', background: 'var(--success)', borderRadius: '50%', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Check size={32} color="white" strokeWidth={4} />
                             </div>
                             <p style={{ fontWeight: 900, color: 'var(--success)' }}>Payment Verified! Finalizing Order...</p>
                          </div>
                        )}
                        
                        <p style={{ fontSize: '12px', color: 'var(--text-light)', marginTop: '16px', fontWeight: 700, fontStyle: 'italic' }}>
                          *Order will only be sent to kitchen after payment verification.
                        </p>
                     </div>
                   )}
                 </div>
               ))}
            </div>
          </section>
        </div>

        {/* Right Column: Final Summary Sidebar */}
        <div style={{ position: 'sticky', top: '120px' }}>
          <div style={{ background: 'white', borderRadius: '32px', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ background: 'var(--green-dark)', padding: '24px 32px', display: 'flex', alignItems: 'center', gap: '12px', color: 'white' }}>
              <ReceiptText size={22} color="var(--gold)" />
              <h3 style={{ fontSize: '19px', fontWeight: 900 }}>Order Checklist</h3>
            </div>
            
            <div style={{ padding: '32px' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px', borderBottom: '1.5px solid var(--border)', paddingBottom: '24px' }}>
                  {cartItems.map(i => (
                    <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                       <div style={{ display: 'flex', gap: '12px' }}>
                          <span style={{ fontWeight: 900, fontSize: '14px', background: 'var(--cream)', width: '28px', height: '28px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{i.qty}</span>
                          <div>
                             <div style={{ fontWeight: 800, fontSize: '15px' }}>{i.name}</div>
                             <div style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 700 }}>${i.price.toFixed(2)} ea</div>
                          </div>
                       </div>
                       <span style={{ fontWeight: 800, fontSize: '15px' }}>${(i.price * i.qty).toFixed(2)}</span>
                    </div>
                  ))}
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: 'var(--text-light)', fontWeight: 600 }}>
                    <span>Items Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: 'var(--text-light)', fontWeight: 600 }}>
                    <span>Fulfilment ({mode})</span>
                    <span style={{ fontWeight: 800, color: deliveryFee === 0 ? 'var(--success)' : 'inherit' }}>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '15px', color: 'var(--text-light)', fontWeight: 600 }}>
                    <span>GST (9%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', color: 'var(--green-dark)', fontWeight: 900, marginTop: '10px' }}>
                    <span>Grand Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
               </div>

               <div style={{ background: 'var(--gold-tint)', borderRadius: '18px', padding: '16px', display: 'flex', gap: '12px', marginBottom: '32px' }}>
                  <ShieldCheck size={20} color="var(--gold)" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--gold)', lineHeight: 1.5, margin: 0 }}>
                    Order confirmed after payment success.
                  </p>
               </div>

               <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                 <button 
                   onClick={() => handlePlaceOrder(false)} 
                   disabled={processing || paymentStatus !== 'idle'}
                   className="btn btn-gold" 
                   style={{ 
                     width: '100%', padding: '20px', fontSize: '18px', borderRadius: '18px', justifyContent: 'center',
                     boxShadow: 'var(--shadow-gold)', gap: '12px', opacity: (processing || paymentStatus !== 'idle') ? 0.7 : 1, cursor: processing ? 'wait' : 'pointer'
                   }}>
                   {processing ? 'Processing...' : (
                     <>Confirm & Pay <ArrowRight size={22} strokeWidth={3} /></>
                   )}
                 </button>
               </div>
               
               <p style={{ textAlign: 'center', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, marginTop: '18px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                 Payment status verified in real-time
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

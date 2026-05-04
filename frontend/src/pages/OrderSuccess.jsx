import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckCircle, ShoppingBag, ArrowRight, MessageSquare, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function OrderSuccess() {
  const navigate = useNavigate()
  const orderId = localStorage.getItem('stm_last_order_id') || ''
  const canTrack = Boolean(orderId)

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }}
        style={{ background: 'white', padding: '60px 40px', borderRadius: '40px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', maxWidth: '500px', width: '100%' }}
      >
        <div style={{ width: '100px', height: '100px', background: 'var(--success-tint)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 32px' }}>
           <CheckCircle size={56} color="var(--success)" strokeWidth={2.5} />
        </div>
        
        <h1 style={{ fontSize: '32px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '16px' }}>Order Confirmed!</h1>
        <p style={{ color: '#64748b', fontSize: '16px', lineHeight: 1.6, marginBottom: '32px', fontWeight: 600 }}>
          Your order <span style={{ color: 'var(--green-mid)', fontWeight: 900 }}>#{orderId || 'pending'}</span> has been received. 
          {canTrack ? ' You can track it live below.' : ' Tracking link will be available once order ID is ready.'}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
           {!canTrack ? (
             <button onClick={() => navigate('/menu')} className="btn btn-gold" style={{ padding: '20px', borderRadius: '18px', justifyContent: 'center' }}>
                Browse More Items <ArrowRight size={20} />
             </button>
           ) : (
             <Link
               to={`/tracking/${orderId}`}
               onClick={() => console.log('Navigating to tracking:', orderId)}
               className="btn btn-gold"
               style={{ padding: '20px', borderRadius: '18px', justifyContent: 'center', textDecoration: 'none' }}
             >
                Track Live Progress <MapPin size={20} />
             </Link>
           )}
           
           <Link to="/" style={{ color: 'var(--text-light)', fontWeight: 800, fontSize: '15px', textDecoration: 'none', padding: '10px' }}>
              Return to Homepage
           </Link>
        </div>

        <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px dashed #eef2f6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
           <div style={{ width: '40px', height: '40px', background: '#f0fdf4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageSquare size={18} color="var(--success)" /></div>
           <p style={{ margin: 0, fontSize: '13px', color: '#64748b', fontWeight: 700, textAlign: 'left' }}>
             Need help? <span style={{ color: 'var(--green-mid)' }}>Chat with STM Support</span>
           </p>
        </div>
      </motion.div>
    </div>
  )
}

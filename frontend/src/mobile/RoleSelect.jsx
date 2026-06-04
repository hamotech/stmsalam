import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Bike, ShieldAlert, Utensils } from 'lucide-react'

export default function RoleSelect() {
  const navigate = useNavigate()

  const roles = [
    {
      id: 'customer',
      title: 'Order Food',
      description: 'I want to order food and track deliveries',
      icon: <Utensils size={32} color="#0A8754" />,
      route: '/login', // Will redirect back to / after login
      color: 'rgba(10, 135, 84, 0.1)'
    },
    {
      id: 'rider',
      title: 'Rider Partner',
      description: 'I am a delivery rider',
      icon: <Bike size={32} color="#D4AF37" />,
      route: '/login?role=rider',
      color: 'rgba(245, 158, 11, 0.1)'
    },
    {
      id: 'admin',
      title: 'Restaurant Admin',
      description: 'Manage orders and kitchen',
      icon: <ShieldAlert size={32} color="#dc2626" />,
      route: '/login?role=admin',
      color: 'rgba(220, 38, 38, 0.1)'
    }
  ]

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      color: 'white'
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', marginBottom: '40px' }}
      >
        <img src="/stmsalamlogo.png" alt="GoldenGravityExpressX" style={{ width: '120px', marginBottom: '16px', borderRadius: '50%' }} />
        <h1 style={{ fontSize: '28px', fontWeight: '800', margin: '0 0 8px 0' }}>Welcome to STM</h1>
        <p style={{ color: '#94a3b8', margin: 0 }}>Select your portal to continue</p>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {roles.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(r.route)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: r.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {r.icon}
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>{r.title}</div>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>{r.description}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

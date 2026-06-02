import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, ShoppingBag, User, Bike } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function MobileLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { userProfile } = useAuth()

  const isRider = userProfile?.role === 'rider'
  const isAdmin = userProfile?.role === 'admin'

  // Do not show bottom nav on admin routes or specific isolated pages
  const hideBottomNav = 
    location.pathname.startsWith('/admin') ||
    location.pathname.startsWith('/login') ||
    location.pathname === '/mobile-role-select' ||
    location.pathname.startsWith('/tracking')

  const tabs = []
  
  if (isRider) {
    tabs.push({ id: 'driver', icon: <Bike size={24} />, path: '/driver', label: 'Deliveries' })
    tabs.push({ id: 'profile', icon: <User size={24} />, path: '/profile', label: 'Profile' })
  } else if (!isAdmin) {
    tabs.push({ id: 'home', icon: <Home size={24} />, path: '/', label: 'Home' })
    tabs.push({ id: 'menu', icon: <ShoppingBag size={24} />, path: '/menu', label: 'Menu' })
    tabs.push({ id: 'profile', icon: <User size={24} />, path: '/profile', label: 'Profile' })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', paddingBottom: hideBottomNav ? '0' : '70px' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        {children}
      </div>

      {!hideBottomNav && tabs.length > 0 && (
        <div style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: '70px',
          background: 'white',
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          paddingBottom: 'env(safe-area-inset-bottom, 16px)',
          zIndex: 9999,
          boxShadow: '0 -4px 6px -1px rgba(0, 0, 0, 0.05)'
        }}>
          {tabs.map(tab => {
            const isActive = location.pathname === tab.path
            return (
              <div 
                key={tab.id}
                onClick={() => navigate(tab.path)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  color: isActive ? '#0A8754' : '#94a3b8',
                  cursor: 'pointer',
                  padding: '8px',
                  flex: 1
                }}
              >
                {React.cloneElement(tab.icon, { 
                  color: isActive ? '#0A8754' : '#94a3b8',
                  strokeWidth: isActive ? 2.5 : 2
                })}
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: isActive ? '700' : '500' 
                }}>
                  {tab.label}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import WhatsAppChatButton from './components/WhatsAppChatButton'
import SupportHubWidget from './components/SupportHubWidget'
import { Capacitor } from '@capacitor/core'
import { SplashScreen } from '@capacitor/splash-screen'
import MobileLayout from './mobile/MobileLayout'
import RoleSelect from './mobile/RoleSelect'
import { useAuth } from './context/AuthContext'

const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./pages/Menu'))
const Cart = lazy(() => import('./pages/Cart'))
const Gallery = lazy(() => import('./pages/Gallery'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const Checkout = lazy(() => import('./pages/Checkout'))
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const PaymentSuccess = lazy(() => import('./pages/PaymentSuccess'))
const PaymentCancel = lazy(() => import('./pages/PaymentCancel'))
const OrderTracking = lazy(() => import('./pages/OrderTracking'))
const Admin = lazy(() => import('./pages/Admin'))
const DriverPanel = lazy(() => import('./pages/DriverPanel'))
const DataSeedPage = lazy(() => import('./pages/DataSeedPage'))
const ShopScan = lazy(() => import('./pages/ShopScan'))

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function Shell() {
  const location = useLocation()
  const path = location.pathname
  // Navbar + footer: hidden on admin/rider and on “focused” flows (login, pay, etc.)
  const hideNavFooter =
    ['/admin', '/driver', '/rider', '/login', '/order-success', '/success', '/cancel', '/sandbox', '/pay', '/scan-pay'].some((p) => path.startsWith(p)) ||
    path.startsWith('/seed')
  // STM Help + WhatsApp: show on every customer-facing page (including login, checkout, pay)
  const hideFloatingHelp = path.startsWith('/admin') || path.startsWith('/driver') || path.startsWith('/rider')

  const { userProfile, loading: authLoading } = useAuth()

  React.useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide().catch(console.error)
    }
  }, [])

  // Intercept root route for native users who are logged out
  if (Capacitor.isNativePlatform() && !authLoading && !userProfile && path === '/') {
    return <Navigate to="/mobile-role-select" replace />
  }

  const isNative = Capacitor.isNativePlatform()
  const LayoutWrapper = isNative ? MobileLayout : React.Fragment

  return (
    <LayoutWrapper>
      {!hideNavFooter && !isNative && <Navbar />}
      <AnimatePresence mode="popLayout">
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: 'var(--green-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /></div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"         element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/menu"     element={<PageWrapper><Menu /></PageWrapper>} />
            <Route path="/gallery"  element={<PageWrapper><Gallery /></PageWrapper>} />
            <Route path="/about"    element={<PageWrapper><AboutUs /></PageWrapper>} />
            <Route path="/cart"     element={<PageWrapper><Cart /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
            <Route path="/login"    element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/profile"  element={<PageWrapper><Profile /></PageWrapper>} />
            <Route path="/order-success" element={<PageWrapper><OrderSuccess /></PageWrapper>} />
            <Route path="/success" element={<PageWrapper><PaymentSuccess /></PageWrapper>} />
            <Route path="/cancel" element={<PageWrapper><PaymentCancel /></PageWrapper>} />
            <Route path="/tracking/:orderId" element={<PageWrapper><OrderTracking /></PageWrapper>} />
            <Route path="/order-tracking/:orderId" element={<PageWrapper><OrderTracking /></PageWrapper>} />
            <Route path="/admin/*"    element={<PageWrapper><Admin /></PageWrapper>} />
            <Route path="/driver"   element={<PageWrapper><DriverPanel /></PageWrapper>} />
            <Route path="/rider" element={<Navigate to="/driver" replace />} />
            <Route path="/seed"     element={<PageWrapper><DataSeedPage /></PageWrapper>} />
            <Route path="/scan-pay/:orderId" element={<PageWrapper><ShopScan /></PageWrapper>} />
            <Route path="/mobile-role-select" element={<PageWrapper><RoleSelect /></PageWrapper>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      {!hideNavFooter && <Footer />}
      {!hideFloatingHelp && <SupportHubWidget />}
      {!hideFloatingHelp && (
        <WhatsAppChatButton message="Hi STM Salam, I need help with my order." label="Chat with Admin" />
      )}
    </LayoutWrapper>
  )
}

import { DataProvider } from './context/DataContext'

export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <CartProvider>
          <BrowserRouter>
            <Shell />
          </BrowserRouter>
        </CartProvider>
      </DataProvider>
    </AuthProvider>
  )
}

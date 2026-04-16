import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

const Home = lazy(() => import('./pages/Home'))
const Menu = lazy(() => import('./pages/Menu'))
const Cart = lazy(() => import('./pages/Cart'))
const Gallery = lazy(() => import('./pages/Gallery'))
const AboutUs = lazy(() => import('./pages/AboutUs'))
const Checkout = lazy(() => import('./pages/Checkout'))
const OrderTracking = lazy(() => import('./pages/OrderTracking'))
const Login = lazy(() => import('./pages/Login'))
const Profile = lazy(() => import('./pages/Profile'))
const OrderSuccess = lazy(() => import('./pages/OrderSuccess'))
const Admin = lazy(() => import('./pages/Admin'))
const DriverPanel = lazy(() => import('./pages/DriverPanel'))
const DataSeedPage = lazy(() => import('./pages/DataSeedPage'))

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

function Shell() {
  const location = useLocation()
  const hide = ['/admin', '/driver', '/login', '/order-success'].some(p => location.pathname.startsWith(p))
  
  return (
    <>
      {!hide && <Navbar />}
      <AnimatePresence mode="wait">
        <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: 'var(--green-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} /></div>}>
          <Routes location={location} key={location.pathname}>
            <Route path="/"         element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/menu"     element={<PageWrapper><Menu /></PageWrapper>} />
            <Route path="/gallery"  element={<PageWrapper><Gallery /></PageWrapper>} />
            <Route path="/about"    element={<PageWrapper><AboutUs /></PageWrapper>} />
            <Route path="/cart"     element={<PageWrapper><Cart /></PageWrapper>} />
            <Route path="/checkout" element={<PageWrapper><Checkout /></PageWrapper>} />
            <Route path="/tracking/:orderId" element={<PageWrapper><OrderTracking /></PageWrapper>} />
            <Route path="/tracking" element={<PageWrapper><OrderTracking /></PageWrapper>} />
            <Route path="/login"    element={<PageWrapper><Login /></PageWrapper>} />
            <Route path="/profile"  element={<PageWrapper><Profile /></PageWrapper>} />
            <Route path="/order-success" element={<PageWrapper><OrderSuccess /></PageWrapper>} />
            <Route path="/admin/*"    element={<PageWrapper><Admin /></PageWrapper>} />
            <Route path="/driver"   element={<PageWrapper><DriverPanel /></PageWrapper>} />
            <Route path="/seed"     element={<PageWrapper><DataSeedPage /></PageWrapper>} />
          </Routes>
        </Suspense>
      </AnimatePresence>
      {!hide && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Shell />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

import React from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Gallery from './pages/Gallery'
import AboutUs from './pages/AboutUs'
import Checkout from './pages/Checkout'
import OrderTracking from './pages/OrderTracking'
import Login from './pages/Login'
import Profile from './pages/Profile'
import OrderSuccess from './pages/OrderSuccess'
import Admin from './pages/Admin'
import DriverPanel from './pages/DriverPanel'
import DataSeedPage from './pages/DataSeedPage'

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
          <Route path="/seed"     element={<DataSeedPage />} />
        </Routes>
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

import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Star, Clock, ChevronRight, Flame, Tag, Truck, ShieldCheck,
  Search, MapPin, ShoppingBag, Utensils, Heart, Timer,
  ArrowRight, Phone, Mail, Instagram, Facebook, Twitter, Play, Smartphone,
  Download, CheckCircle, ChevronLeft, QrCode, Apple, User, Bell, Filter,
  Zap, CloudRain, Activity, Award, Repeat, Bookmark, Mic, Leaf, Target, Info,
  MessageCircle, CreditCard, ScanLine, ExternalLink, Wifi, Shield
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { shopInfo, outlets, menuItems } from '../data/menuData'
import { API_URL } from '../config/api'
import { dataService } from '../admin/services/dataService'
import { useCart } from '../context/CartContext'
import { useData } from '../context/DataContext'
import { useAuth } from '../context/AuthContext'
import { Plus, Minus, Image as ImageIcon, PlayCircle } from 'lucide-react'
import WhatsAppChatButton from '../components/WhatsAppChatButton'
import SmartImage from '../components/common/SmartImage'
import { DEFAULT_FALLBACK_IMAGE, resolveImageUrl } from '../utils/imageUrl'
// static data removed

/* ── tiny floating food component ── */
function FloatingFood({ emoji, delay, left, size }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [-10, 15, -10] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', left, fontSize: size || '40px', opacity: 0.15, zIndex: 0, pointerEvents: 'none', top: `${20 + delay * 15}%` }}
    >{emoji}</motion.div>
  )
}

/* ── favorite item card component ── */
function FavoriteItemCard({ item, idx, inCart, addToCart, navigate }) {
  const [isJustAdded, setIsJustAdded] = useState(false);
  
  const handleAdd = (e) => {
    e.stopPropagation();
    addToCart(item);
    setIsJustAdded(true);
    setTimeout(() => setIsJustAdded(false), 2000);
  };

  const badges = ["Popular", "Best Seller", "Hot Pick", "Recommended"];
  const badge = badges[idx % badges.length];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1 }}
      whileHover={{ y: -10 }}
      style={{ 
        background: 'white', 
        borderRadius: '32px', 
        overflow: 'hidden', 
        border: '1px solid #eef2f6', 
        boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ position: 'relative', height: '240px', overflow: 'hidden', background: '#f8fafc' }} onClick={() => navigate('/menu')}>
        <SmartImage
          src={item.img || item.image || 'https://images.unsplash.com/photo-1544145945-f904253d0c71?auto=format&fit=crop&w=400'}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          alt={item.name}
        />
        <div style={{ position: 'absolute', top: '20px', left: '20px', background: 'var(--gold)', color: 'var(--green-dark)', padding: '6px 14px', borderRadius: '12px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: '0 4px 12px rgba(212,175,55,0.3)' }}>
          {badge}
        </div>
      </div>
      
      <div style={{ padding: '32px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '20px', fontWeight: 900, color: 'var(--green-dark)', lineHeight: 1.2 }}>{item.name}</h3>
          <span style={{ fontSize: '22px', fontWeight: 950, color: 'var(--green-mid)' }}>${parseFloat(item.price).toFixed(2)}</span>
        </div>
        
        <p style={{ color: 'var(--text-light)', fontSize: '15px', fontWeight: 500, lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
          {item.description || 'Authentic taste prepared fresh daily with the finest ingredients.'}
        </p>
        
        <button 
          onClick={handleAdd}
          style={{ 
            width: '100%',
            border: 'none', 
            background: isJustAdded ? '#22c55e' : 'var(--green-dark)', 
            color: 'white', 
            fontWeight: 800, 
            fontSize: '16px', 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            gap: '10px', 
            padding: '16px', 
            borderRadius: '18px', 
            boxShadow: isJustAdded ? '0 10px 20px rgba(34,197,94,0.3)' : '0 10px 20px rgba(1,50,32,0.15)',
            transition: 'all 0.3s ease'
          }}
        >
          {isJustAdded ? (
            <><CheckCircle size={20} /> Added!</>
          ) : inCart ? (
            <><ShoppingBag size={20} /> Add More</>
          ) : (
            <><Plus size={20} /> Add to Tray</>
          )}
        </button>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const { products: dynamicProducts, gallery: dynamicGallery } = useData()
  const [heroIdx, setHeroIdx] = useState(0)
  const defaultHeroImages = [
    '/aboutusimage/tehtarik_premium.png', 
    '/aboutusimage/burger_bg.png', 
    '/aboutusimage/juice_bg.png', 
    '/aboutusimage/tea_snacks_bg.png'
  ]
  const heroImages = dynamicGallery.length > 0 
    ? dynamicGallery.slice(0, 4).map(item => item.url) 
    : defaultHeroImages;
  const { cartItems, subtotal, addToCart, updateQty } = useCart()
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [weatherAlert, setWeatherAlert] = useState(true)
  const [showQR, setShowQR] = useState(false)
  const [showPayNow, setShowPayNow] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 8000)
    return () => clearInterval(timer)
  }, [heroImages.length])


  const scroll = (d) => {
    if (scrollRef.current) {
      const s = scrollRef.current.scrollLeft
      scrollRef.current.scrollTo({ left: d === 'left' ? s - 320 : s + 320, behavior: 'smooth' })
    }
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '120px', position: 'relative', overflow: 'hidden' }}>
      
      {/* ══════════ SHOP HIGHLIGHTS (Premium Style) ══════════ */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ 
          background: 'linear-gradient(to right, #ffffff, #f8fafc, #ffffff)', 
          borderBottom: '1px solid #f1f5f9', 
          padding: '14px 0', 
          zIndex: 1001,
          position: 'relative'
        }}
      >
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
           {[
             { emoji: "❤️", text: "Made Fresh Daily", color: "#fecaca" },
             { emoji: "👨‍🍳", text: "Prepared with Care", color: "#d1fae5" },
             { emoji: "📍", text: "Marine Terrace Favorite Spot", color: "#e0f2fe" }
           ].map((item, idx) => (
             <motion.div 
               key={idx}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: idx * 0.2, duration: 0.8, ease: "easeOut" }}
               whileHover={{ y: -2, background: 'white', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
               style={{ 
                 display: 'flex', 
                 alignItems: 'center', 
                 gap: '10px', 
                 padding: '8px 20px', 
                 borderRadius: '100px', 
                 background: 'rgba(255,255,255,0.6)', 
                 border: '1px solid #f1f5f9',
                 transition: 'all 0.3s ease',
                 cursor: 'default'
               }}
             >
               <span style={{ 
                 fontSize: '18px', 
                 background: item.color, 
                 width: '32px', 
                 height: '32px', 
                 display: 'flex', 
                 alignItems: 'center', 
                 justifyContent: 'center', 
                 borderRadius: '50%' 
               }}>
                 {item.emoji}
               </span>
               <span style={{ 
                 fontSize: '14px', 
                 fontWeight: 800, 
                 color: 'var(--green-dark)', 
                 letterSpacing: '-0.2px' 
               }}>
                 {item.text}
               </span>
             </motion.div>
           ))}
        </div>
      </motion.div>

      {/* ══════════ SMART HEADER BAR ══════════ */}
      <div style={{ background: 'white', borderBottom: '1px solid #eef2f6', padding: '16px 0', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <div className="container smart-header-inner" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="header-address-pill" style={{ background: 'var(--cream)', padding: '10px 18px', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <MapPin size={18} color="var(--green-mid)" />
              <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-dark)' }}>Blk 55 Marine Terrace, #01-303</span>
              <ChevronRight size={14} color="var(--text-light)" />
            </div>
          </div>
          <div className="smart-header-right" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-light)', cursor: 'pointer', position: 'relative' }}>
              <Bell size={22} />
              <div style={{ position: 'absolute', top: -2, right: -2, width: '8px', height: '8px', background: 'var(--danger, #ef4444)', borderRadius: '50%', border: '2px solid white' }} />
            </button>
            <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--green-tint)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <User size={22} color="var(--green-dark)" />
              </div>
            </Link>
          </div>
        </div>
      </div>


      {/* ══════════ ACTIVE ORDER TRACKER ══════════ */}
      <ActiveOrderTracker />

      {/* ══════════ HERO SECTION ══════════ */}
      <section style={{ position: 'relative', height: '85vh', minHeight: '600px', overflow: 'hidden', background: 'var(--green-dark)' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={heroIdx}
            src={resolveImageUrl(heroImages[heroIdx])}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.4, scale: 1 }}
            exit={{ opacity: 0.1 }}
            transition={{ duration: 1.5 }}
            loading={heroIdx === 0 ? "eager" : "lazy"}
            onError={(event) => {
              const target = event.currentTarget
              if (target.dataset.fallbackApplied === '1') return
              console.warn('[ImageLoadError] hero image failed; using fallback', {
                attemptedSrc: target.currentSrc || target.src,
                originalSrc: heroImages[heroIdx],
              })
              target.dataset.fallbackApplied = '1'
              target.src = DEFAULT_FALLBACK_IMAGE
            }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </AnimatePresence>

        <div className="container" style={{ position: 'relative', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '2px', background: 'var(--gold)' }} />
              <span style={{ color: 'var(--gold)', fontWeight: 800, letterSpacing: '3px', fontSize: '14px', textTransform: 'uppercase' }}>EST. 1988 · Singapore</span>
            </div>
            <h1 style={{ color: 'white', fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.2, letterSpacing: '-1.5px', marginBottom: '28px' }}>
              Authentic Drinks and Warm Comfort Food <span style={{ color: 'var(--gold)', letterSpacing: '-0.5px' }}>Delivered Fresh</span>
            </h1>
            <div className="hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <Link to="/menu" className="btn btn-gold" style={{ padding: '18px 40px', borderRadius: '16px', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                <ShoppingBag size={20} color="var(--green-dark)" /> Order Now
              </Link>
              <WhatsAppChatButton 
                message="Hi STM Salam, I want to know more about your menu." 
                type="button" 
                label="Chat with Admin"
                style={{ padding: '18px 40px', borderRadius: '16px', fontSize: '16px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)' }} 
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════ SCANPAY QR MODAL (Full Payment Flow) ══════════ */}
      <AnimatePresence>
        {showQR && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowQR(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(1, 50, 32, 0.92)', backdropFilter: 'blur(12px)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px', overflowY: 'auto' }}>
            <motion.div initial={{ scale: 0.85, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 50 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              style={{ background: 'white', borderRadius: '40px', padding: '36px 32px', textAlign: 'center', maxWidth: '440px', width: '100%', position: 'relative', overflow: 'hidden', margin: 'auto 0' }}>
              
              {/* Close button */}
              <button onClick={() => setShowQR(false)} style={{ position: 'absolute', top: '20px', right: '20px', width: '36px', height: '36px', borderRadius: '50%', background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', fontSize: '18px', fontWeight: 700, transition: 'all 0.2s' }}>✕</button>

              {/* Step Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '28px' }}>
                {['Scan QR', 'Pay', 'Confirm'].map((step, i) => (
                  <React.Fragment key={step}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: i === 0 ? 'var(--green-mid)' : '#e2e8f0', color: i === 0 ? 'white' : 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 900 }}>{i + 1}</div>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: i === 0 ? 'var(--green-dark)' : 'var(--text-light)' }}>{step}</span>
                    </div>
                    {i < 2 && <div style={{ width: '20px', height: '2px', background: '#e2e8f0', borderRadius: '1px' }} />}
                  </React.Fragment>
                ))}
              </div>

              {/* Header */}
              <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, var(--green-tint), rgba(5,150,105,0.1))', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                <ScanLine size={32} color="var(--green-mid)" />
              </div>
              <h3 style={{ fontSize: '26px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '8px', letterSpacing: '-0.5px' }}>ScanPay — QR PayNow</h3>
              <p style={{ color: 'var(--text-light)', fontWeight: 600, marginBottom: '28px', fontSize: '15px', lineHeight: 1.5 }}>
                Scan the QR to complete payment.<br />
                <span style={{ color: 'var(--green-mid)', fontWeight: 700 }}>After payment, tap "I Have Paid"</span> and send your screenshot on WhatsApp.
              </p>

              {/* QR Code Image */}
              <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '28px', border: '2px solid #e2e8f0', marginBottom: '24px', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: 'var(--green-mid)', color: 'white', padding: '4px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 900, letterSpacing: '0.5px', textTransform: 'uppercase' }}>SGQR PayNow</div>
                <div style={{ width: '240px', height: '300px', background: 'white', margin: '12px auto 0', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9', overflow: 'hidden' }}>
                  <object
                    data="/scanner-pay.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                    type="application/pdf"
                    style={{ width: '240px', height: '300px', border: 'none' }}
                  >
                    <div style={{ padding: '12px', fontSize: '13px', fontWeight: 700 }}>
                      <a href="/scanner-pay.pdf" target="_blank" rel="noreferrer" style={{ color: 'var(--green-mid)' }}>Open scan-to-pay PDF</a>
                    </div>
                  </object>
                </div>
                <div style={{ marginTop: '16px', fontSize: '13px', color: 'var(--text-light)', fontWeight: 700 }}>
                  PayNow: <span style={{ color: 'var(--green-dark)', fontWeight: 900 }}>{shopInfo.phone}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
                {[
                  { icon: <ShieldCheck size={14} />, text: 'Verified' },
                  { icon: <ScanLine size={14} />, text: 'SGQR' },
                  { icon: <Shield size={14} />, text: 'Secure' }
                ].map((badge, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#f0fdf4', padding: '5px 12px', borderRadius: '100px', fontSize: '11px', fontWeight: 800, color: 'var(--green-mid)' }}>
                    {badge.icon} {badge.text}
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <motion.button 
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const message = `Hello STM Salam! 👋\n\nI have completed my PayNow payment.\n\n💳 Payment Method: ScanPay (SGQR PayNow)\n📞 Contact: My attached screenshot\n\nPlease verify my payment. Thank you! 🙏`
                    const whatsappUrl = `https://wa.me/${shopInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, '_blank')
                  }}
                  className="btn btn-gold" 
                  style={{ width: '100%', padding: '20px', borderRadius: '18px', fontSize: '17px', justifyContent: 'center', boxShadow: '0 10px 30px rgba(212,175,55,0.35)', gap: '10px', border: 'none', cursor: 'pointer' }}
                >
                  <CheckCircle size={22} /> I Have Paid
                </motion.button>
                
                <p style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 600, lineHeight: 1.5, margin: '0' }}>
                  Clicking "<strong>I Have Paid</strong>" will open WhatsApp so you can send your payment screenshot for verification.
                </p>

                <button onClick={() => setShowQR(false)} style={{ padding: '14px', borderRadius: '14px', border: '1.5px solid #e2e8f0', background: 'transparent', color: 'var(--text-light)', fontWeight: 800, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container" style={{ marginTop: '32px' }}>

        {/* ══════════ PAYMENT & QUICK ACTION STRIP ══════════ */}
        <div className="quick-action-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px' }}>
          {[
            { icon: <MessageCircle size={28} />, label: 'WhatsApp Pay', desc: 'Order via chat', color: '#25d366', bg: 'rgba(37,211,102,0.08)', action: () => window.open(`https://wa.me/${shopInfo.whatsapp.replace(/[^0-9]/g, '')}`, '_blank') },
            { icon: <ScanLine size={28} />, label: 'ScanPay', desc: 'QR PayNow', color: 'var(--green-mid)', bg: 'var(--green-tint)', action: () => setShowQR(true) },
            { icon: <CreditCard size={28} />, label: 'Pay via PayNow', desc: 'Scan & Pay Securely', color: '#4f46e5', bg: 'rgba(79,70,229,0.06)', action: () => setShowPayNow(true) },
            { icon: <Smartphone size={28} />, label: 'Get the App', desc: 'iOS & Android', color: 'var(--gold)', bg: 'var(--gold-tint)', action: () => document.getElementById('app-download')?.scrollIntoView({ behavior: 'smooth' }) },
          ].map((a, i) => (
            <motion.button key={i} whileHover={{ y: -4, boxShadow: '0 16px 40px rgba(0,0,0,0.08)' }} onClick={a.action}
              style={{ background: 'white', border: '1px solid #eef2f6', borderRadius: '24px', padding: '28px 20px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', transition: '0.3s' }}>
              <div className="action-icon-wrapper" style={{ width: '56px', height: '56px', borderRadius: '18px', background: a.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: a.color }}>{a.icon}</div>
              <div className="action-label" style={{ fontWeight: 900, fontSize: '15px', color: 'var(--green-dark)' }}>{a.label}</div>
              <div className="action-desc" style={{ fontSize: '12px', color: 'var(--text-light)', fontWeight: 700 }}>{a.desc}</div>
            </motion.button>
          ))}
        </div>
        
        {/* ══════════ PAYNOW DEDICATED MODAL ══════════ */}
        <AnimatePresence>
          {showPayNow && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPayNow(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(1, 50, 32, 0.92)', backdropFilter: 'blur(12px)', zIndex: 9999, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '20px', overflowY: 'auto' }}>
              <motion.div initial={{ scale: 0.85, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.85, y: 50 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={e => e.stopPropagation()}
                style={{ background: 'white', borderRadius: '40px', padding: '36px 32px', textAlign: 'center', maxWidth: '440px', width: '100%', position: 'relative', overflow: 'hidden', margin: 'auto 0' }}>
                
                <button onClick={() => setShowPayNow(false)} style={{ position: 'absolute', top: '20px', right: '20px', width: '36px', height: '36px', borderRadius: '50%', background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-light)', fontSize: '18px', fontWeight: 700 }}>✕</button>

                <div style={{ width: '64px', height: '64px', background: 'var(--gold-tint)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <QrCode size={32} color="var(--gold)" />
                </div>
                
                <h3 style={{ fontSize: '24px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '8px' }}>PayNow Secure Payment</h3>
                <p style={{ color: 'var(--text-light)', fontWeight: 600, marginBottom: '24px', fontSize: '14px' }}>Scan the SGQR code to pay and confirm via WhatsApp.</p>

                <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '28px', border: '2px solid #e2e8f0', marginBottom: '24px' }}>
                  <div style={{ width: '220px', height: '220px', background: 'white', margin: '0 auto', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
                    <object data="/scanner-pay.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH" type="application/pdf" style={{ width: '220px', height: '220px', border: 'none' }}>
                      <a href="/scanner-pay.pdf" target="_blank" rel="noreferrer" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--green-mid)' }}>Open PDF</a>
                    </object>
                  </div>
                  
                  <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
                    <div style={{ background: 'white', padding: '12px', borderRadius: '16px', border: '1px solid #eef2f6' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: 800, textTransform: 'uppercase' }}>Item subtotal</div>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--green-dark)' }}>SGD {subtotal.toFixed(2)}</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-light)', fontWeight: 700, marginTop: '4px', lineHeight: 1.3 }}>Delivery min SGD {(shopInfo.minOrderDelivery ?? 10).toFixed(0)} · free ≤{shopInfo.freeDeliveryRadiusKm} km from {shopInfo.outletName}</div>
                    </div>
                    <div style={{ background: 'white', padding: '12px', borderRadius: '16px', border: '1px solid #eef2f6' }}>
                      <div style={{ fontSize: '10px', color: 'var(--text-light)', fontWeight: 800, textTransform: 'uppercase' }}>Temp Order ID</div>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--gold)' }}>#PN-{Math.floor(1000 + Math.random() * 9000)}</div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'left', marginBottom: '24px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--green-dark)', marginBottom: '8px' }}>Instructions:</div>
                  {[
                    "Scan the SGQR code with your banking app.",
                    "Pay the total amount shown above.",
                    "Tap 'I Have Paid' to send screenshot on WhatsApp."
                  ].map((text, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '13px', color: 'var(--text-light)', fontWeight: 600, marginBottom: '4px' }}>
                      <div style={{ color: 'var(--green-mid)' }}>•</div> {text}
                    </div>
                  ))}
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const tempId = `PN-${Math.floor(1000 + Math.random() * 9000)}`;
                    const total = subtotal.toFixed(2);
                    const message = `Hello STM Salam! 👋\n\nI have completed my PayNow payment.\n\n📄 Order ID: ${tempId}\n👤 Name: Customer\n💰 Item subtotal: SGD ${total}\n(Delivery & final total confirmed at checkout.)\n\nI am attaching my payment screenshot below. Please verify my order. Thank you!`;
                    window.open(`https://wa.me/${shopInfo.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                    setShowPayNow(false);
                  }}
                  className="btn btn-gold" 
                  style={{ width: '100%', padding: '20px', borderRadius: '18px', fontSize: '17px', justifyContent: 'center', boxShadow: '0 10px 30px rgba(212,175,55,0.3)', gap: '10px' }}
                >
                  <CheckCircle size={22} /> I Have Paid
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══════════ OFFER / PROMO SECTION ══════════ */}
        <section style={{ marginBottom: '80px' }}>
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ background: 'var(--green-dark)', color: 'white', borderRadius: '32px', padding: '48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 20px 40px rgba(1,50,32,0.1)', position: 'relative', overflow: 'hidden', flexWrap: 'wrap', gap: '32px' }}>
            <div style={{ position: 'absolute', right: '-5%', top: '-20%', opacity: 0.05 }}><ShoppingBag size={240} color="white" /></div>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '540px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Star size={20} color="var(--gold)" />
                <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>Seasonal Offer</span>
              </div>
              <h3 style={{ fontWeight: 900, fontSize: '36px', marginBottom: '16px', lineHeight: 1.2 }}>Today’s Highlights</h3>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', fontWeight: 500, marginBottom: '32px', lineHeight: 1.6 }}>
                Enjoy selected favourites and seasonal specials, perfect for tea time, lunch, or evening cravings.
              </p>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={() => navigate('/menu')} className="btn" style={{ background: 'var(--gold)', color: 'var(--green-dark)', padding: '16px 32px', borderRadius: '14px', fontWeight: 800, fontSize: '15px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShoppingBag size={18} /> Start Your Order
                </button>
              </div>
            </div>
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '20px' }}>
              {(dynamicProducts.filter(p => p.featured || p.badge === 'bestseller').length > 0 
                ? dynamicProducts.filter(p => p.featured || p.badge === 'bestseller')
                : dynamicProducts
              ).slice(0, 2).map((p, i) => (
                <div key={p.id} style={{ position: 'relative', width: '140px', height: '140px', transform: i === 0 ? 'translateY(10px)' : 'translateY(-10px)' }}>
                  <SmartImage src={p.image || p.img || '/bg1.jpeg'} alt={p.name} style={{ width: '100%', height: '100%', borderRadius: '24px', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.1)' }} />
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', right: '12px', background: 'rgba(255,255,255,0.9)', padding: '6px 10px', borderRadius: '12px', fontSize: '10px', fontWeight: 900, color: 'var(--green-dark)', textAlign: 'center', backdropFilter: 'blur(4px)', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ══════════ CUSTOMER FAVORITES SECTION ══════════ */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ fontSize: '42px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '16px', letterSpacing: '-1.5px' }}
            >
              Customer Favorites
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ color: 'var(--text-light)', fontSize: '18px', fontWeight: 500, maxWidth: '600px', margin: '0 auto' }}
            >
              Enjoy STM Salam’s most-loved drinks and snacks, freshly prepared every day.
            </motion.p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px', marginBottom: '56px' }}>
            {(dynamicProducts.filter(p => p.featured || p.badge === 'bestseller').length > 0
                ? dynamicProducts.filter(p => p.featured || p.badge === 'bestseller')
                : dynamicProducts.slice(0, 8)
              )
              .sort((a, b) => (b.featured ? 2 : (b.badge === 'bestseller' ? 1 : 0)) - (a.featured ? 2 : (a.badge === 'bestseller' ? 1 : 0)))
              .slice(0, 8) // Show up to 8 items in the grid
              .map((item, idx) => (
                <FavoriteItemCard 
                  key={item.id} 
                  item={item} 
                  idx={idx} 
                  inCart={cartItems.find(c => c.id === item.id)}
                  addToCart={addToCart}
                  navigate={navigate}
                />
              ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            {/* View Full Menu Image Preview */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              {dynamicProducts.filter(p => p.badge === 'bestseller' || p.badge === 'new').slice(0, 4).map((p, i) => (
                <motion.div key={p.id || i} initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }}
                  style={{ width: '56px', height: '56px', borderRadius: '50%', border: '4px solid white', overflow: 'hidden', marginLeft: i === 0 ? 0 : '-15px', boxShadow: '0 10px 20px rgba(0,0,0,0.1)', background: '#f1f5f9' }}>
                  <SmartImage src={p.img || p.image || '/bg1.jpeg'} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} title={p.name} />
                </motion.div>
              ))}
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '4px solid white', background: 'var(--gold)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '-15px', zIndex: 1, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
                <Utensils size={24} />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/menu')}
              style={{ 
                background: 'white', 
                color: 'var(--green-dark)', 
                border: '2px solid var(--green-dark)', 
                padding: '18px 48px', 
                borderRadius: '20px', 
                fontWeight: 900, 
                fontSize: '18px', 
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease'
              }}
            >
              View Full Menu <ChevronRight size={22} />
            </motion.button>
          </div>
        </section>

        {/* ══════════ SCAN & PAY QUICK SECTION ══════════ */}
        <section style={{ marginBottom: '80px' }}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ 
              background: 'white', 
              borderRadius: '40px', 
              padding: '48px', 
              border: '1px solid #e2e8f0', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '48px', 
              flexWrap: 'wrap',
              boxShadow: '0 20px 50px rgba(0,0,0,0.03)'
            }}
          >
            <div style={{ flex: '1', minWidth: '300px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gold-tint)', color: 'var(--gold)', padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '20px' }}>
                <QrCode size={16} /> Instant Payment
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '20px', letterSpacing: '-1.5px' }}>Scan & Pay Instantly</h2>
              <p style={{ color: 'var(--text-light)', fontSize: '17px', fontWeight: 500, lineHeight: 1.6, marginBottom: '32px' }}>
                In a hurry? You can scan our official SGQR PayNow code directly from your banking app to pay for your orders or support the shop. 
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <button onClick={() => setShowQR(true)} style={{ background: 'var(--green-dark)', color: 'white', border: 'none', padding: '16px 32px', borderRadius: '16px', fontWeight: 900, fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ScanLine size={20} /> Open Scanner
                </button>
                <Link to="/menu" style={{ background: 'var(--cream)', color: 'var(--green-dark)', padding: '16px 32px', borderRadius: '16px', fontWeight: 900, fontSize: '16px', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  Browse Menu <ArrowRight size={20} />
                </Link>
              </div>
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.02, rotate: 1 }}
              onClick={() => setShowQR(true)}
              style={{ 
                width: '240px', 
                background: '#f8fafc', 
                padding: '20px', 
                borderRadius: '35px', 
                border: '2px solid var(--gold)', 
                cursor: 'pointer',
                position: 'relative'
              }}
            >
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', background: 'var(--gold)', color: 'var(--green-dark)', padding: '4px 16px', borderRadius: '100px', fontSize: '11px', fontWeight: 900, whiteSpace: 'nowrap' }}>Official SGQR</div>
              <div style={{ background: 'white', borderRadius: '25px', padding: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <object
                  data="/scanner-pay.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                  type="application/pdf"
                  style={{ width: '100%', height: '200px', border: 'none', borderRadius: '15px' }}
                >
                  <a href="/scanner-pay.pdf" target="_blank" rel="noreferrer" style={{ fontSize: '14px', fontWeight: 800, color: 'var(--green-dark)' }}>Open scan-to-pay PDF</a>
                </object>
              </div>
              <div style={{ textAlign: 'center', marginTop: '16px' }}>
                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 800 }}>TAP TO ENLARGE</div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════ WHY CHOOSE STM SALAM ══════════ */}
        <section style={{ marginBottom: '64px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
            {[
              { icon: <Flame size={32} />, title: 'Freshly Made', desc: 'Prepared hot upon your order.' },
              { icon: <Zap size={32} />, title: 'Fast Delivery', desc: 'Zero-G delivery speeds direct to you.' },
              { icon: <Heart size={32} />, title: 'Local Favorites', desc: 'Authentic Marine Terrace Kopitiam taste.' },
              { icon: <Tag size={32} />, title: 'Affordable Prices', desc: 'Delicious food without breaking the bank.' }
            ].map((f, i) => (
              <div key={i} style={{ background: 'var(--cream)', borderRadius: '24px', padding: '32px', textAlign: 'center' }}>
                <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green-mid)', margin: '0 auto 16px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
                  {f.icon}
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--green-dark)', marginBottom: '8px' }}>{f.title}</h4>
                <p style={{ color: 'var(--text-light)', fontSize: '14px', fontWeight: 600 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════ GALLERY HIGHLIGHTS SECTION ══════════ */}
        <section style={{ marginBottom: '80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px', padding: '0 10px' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--green-tint)', color: 'var(--green-mid)', padding: '6px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
                <ImageIcon size={14} /> Our Visual Journey
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 950, color: 'var(--green-dark)', letterSpacing: '-1.5px' }}>Moments at Salam</h2>
            </div>
            <Link to="/gallery" style={{ color: 'var(--green-mid)', fontWeight: 800, textDecoration: 'none', fontSize: '15px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              View All Media <ArrowRight size={18} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {dynamicGallery.length > 0 ? (
              dynamicGallery.map((item, i) => {
                const isVideo = item.type === 'video';
                return (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 0.98 }}
                    onClick={() => navigate('/gallery')}
                    style={{ 
                      position: 'relative', 
                      borderRadius: '24px', 
                      overflow: 'hidden', 
                      aspectRatio: '1/1',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                      background: '#000'
                    }}
                  >
                    {isVideo ? (
                      <video 
                        src={item.url} 
                        muted 
                        preload="none"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
                        onMouseOver={e => e.target.play()}
                        onMouseOut={e => { e.target.pause(); e.target.currentTime = 0; }}
                      />
                    ) : (
                      <SmartImage src={item.url} alt="Gallery item" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    )}
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.1)' }}>
                      {isVideo && <PlayCircle size={40} color="white" style={{ opacity: 0.8 }} />}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '60px', background: 'var(--cream)', borderRadius: '24px', border: '1px dashed #cbd5e1' }}>
                 <p style={{ fontWeight: 800, color: 'var(--text-light)', fontSize: '15px' }}>Check back soon for latest moments at STM Salam!</p>
              </div>
            )}
          </div>
        </section>

        {/* ══════════ CALL TO ACTION ══════════ */}
        <section style={{ marginBottom: '80px', padding: '0 20px' }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              background: 'linear-gradient(135deg, #059669 0%, #013220 100%)', 
              borderRadius: '24px', 
              padding: '80px 32px', 
              textAlign: 'center', 
              position: 'relative', 
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(1, 50, 32, 0.15)'
            }}>
            
            {/* ── Floating Background Glows ── */}
            <motion.div 
              animate={{ 
                y: [0, -20, 0],
                x: [0, 10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              style={{ 
                position: 'absolute', top: '-20%', right: '-10%', 
                width: '300px', height: '300px', 
                background: 'rgba(255,255,255,0.15)', 
                borderRadius: '50%', filter: 'blur(60px)',
                zIndex: 0
              }} 
            />
            <motion.div 
              animate={{ 
                y: [0, 30, 0],
                x: [0, -20, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ 
                position: 'absolute', bottom: '-20%', left: '-5%', 
                width: '250px', height: '250px', 
                background: 'rgba(255,255,255,0.1)', 
                borderRadius: '50%', filter: 'blur(50px)',
                zIndex: 0
              }} 
            />
            
            {/* ── Preparing Items Animation (Floating Food) ── */}
            {[
              { e: '☕', t: '5%', l: '10%', s: '32px', d: 0 },
              { e: '🍔', t: '15%', l: '85%', s: '40px', d: 1 },
              { e: '🥟', t: '70%', l: '8%', s: '36px', d: 2 },
              { e: '🍛', t: '65%', l: '88%', s: '38px', d: 1.5 },
              { e: '🧊', t: '40%', l: '92%', s: '30px', d: 0.5 },
              { e: '🍰', t: '80%', l: '15%', s: '28px', d: 2.5 }
            ].map((food, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 0.25, scale: 1 }}
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ 
                  y: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 5 + i, repeat: Infinity, ease: "easeInOut" },
                  opacity: { duration: 1 }
                }}
                style={{ position: 'absolute', top: food.t, left: food.l, fontSize: food.s, zIndex: 0, filter: 'grayscale(0.2) contrast(1.2)' }}
              >
                {food.e}
              </motion.div>
            ))}
            
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '640px', margin: '0 auto' }}>
              <motion.h2 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ fontSize: '42px', fontWeight: 950, color: '#FFFFFF', marginBottom: '20px', lineHeight: 1.1, textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                Ready to Order?
              </motion.h2>
              <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '19px', fontWeight: 500, marginBottom: '48px', lineHeight: 1.6 }}>
                Browse our full menu to select your favourites, customise your order, and check out seamlessly with our dedicated ordering page.
              </p>
              
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <motion.button 
                  whileHover={{ y: -4, scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.15)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/menu')} 
                  style={{ 
                    background: '#FFFFFF', 
                    color: '#059669', 
                    padding: '18px 48px', 
                    borderRadius: '14px', 
                    fontWeight: 800, 
                    fontSize: '18px', 
                    border: 'none', 
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.08)'
                  }}>
                  Start Your Order
                </motion.button>
                
                <motion.button 
                  whileHover={{ y: -2, background: 'rgba(255,255,255,0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/menu')} 
                  style={{ 
                    background: 'rgba(255,255,255,0.1)', 
                    color: 'white', 
                    padding: '18px 42px', 
                    borderRadius: '14px', 
                    fontWeight: 700, 
                    fontSize: '16px', 
                    border: '1px solid rgba(255,255,255,0.4)', 
                    cursor: 'pointer'
                  }}>
                  Explore Full Menu
                </motion.button>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ══════════ WHATSAPP ORDER CTA ══════════ */}
        <section style={{ marginBottom: '64px' }}>
          <div className="whatsapp-promo-box" style={{ background: 'linear-gradient(135deg, #075e54 0%, #128c7e 50%, #25d366 100%)', borderRadius: '40px', padding: '56px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '10%', bottom: '-20%', opacity: 0.1 }}><MessageCircle size={200} /></div>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <MessageCircle size={20} color="white" />
                <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 800, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>WhatsApp Ordering</span>
              </div>
              <h2 style={{ color: 'white', fontSize: '36px', fontWeight: 950, marginBottom: '16px', lineHeight: 1.1 }}>Order via WhatsApp — It's That Simple</h2>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', fontWeight: 600, marginBottom: '32px', lineHeight: 1.7 }}>
                Send us your order on WhatsApp. Pay via PayNow or Cash. Get automated delivery notifications: <em>"Your cargo has cleared Earth's atmosphere!"</em>
              </p>
              <div className="hero-buttons" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <a href={`https://wa.me/${shopInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'white', color: '#075e54', padding: '16px 32px', borderRadius: '18px', fontWeight: 900, fontSize: '16px', textDecoration: 'none' }}>
                  <MessageCircle size={22} /> Chat Now
                </a>
                <Link to="/menu" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.15)', color: 'white', padding: '16px 32px', borderRadius: '18px', fontWeight: 900, fontSize: '16px', textDecoration: 'none', border: '2px solid rgba(255,255,255,0.3)' }}>
                  <ExternalLink size={20} /> View Catalog
                </Link>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
              {['📦 Send your order list', '💳 Pay via PayNow / ScanPay', '🚀 Track your Zero-G Delivery'].map((step, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.12)', padding: '16px 24px', borderRadius: '16px', color: 'white', fontWeight: 700, fontSize: '15px', display: 'flex', alignItems: 'center', gap: '12px', backdropFilter: 'blur(8px)' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 950 }}>{i + 1}</div>
                  {step}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ LOYALTY + REFERRAL ══════════ */}
        <div className="loyalty-referral-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', marginBottom: '64px' }}>
          <div style={{ background: 'white', padding: '40px', borderRadius: '40px', border: '1px solid #eef2f6', display: 'flex', gap: '32px', alignItems: 'center' }}>
            <div style={{ background: 'var(--gold-tint)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Award size={48} color="var(--gold)" />
            </div>
            <div>
              <h4 style={{ fontSize: '22px', fontWeight: 950, marginBottom: '8px' }}>Loyalty Progress</h4>
              <p style={{ color: 'var(--text-light)', fontSize: '14px', fontWeight: 700, marginBottom: '16px' }}>Only <span style={{ color: 'var(--gold)' }}>260 points</span> away from a FREE Nasi Lemak!</p>
              <div style={{ height: '8px', background: 'var(--cream)', borderRadius: '4px' }}>
                <div style={{ width: '75%', height: '100%', background: 'var(--gold)', borderRadius: '4px' }} />
              </div>
            </div>
          </div>
          <div style={{ background: 'var(--green-dark)', padding: '40px', borderRadius: '40px', color: 'white', display: 'flex', gap: '32px', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', right: '-10%', top: '-20%', opacity: 0.1 }}><Zap size={120} color="var(--gold)" /></div>
            <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
              <h4 style={{ fontSize: '22px', fontWeight: 950, marginBottom: '8px' }}>Invite & Get $10</h4>
              <p style={{ opacity: 0.8, fontSize: '14px', fontWeight: 600, marginBottom: '24px' }}>Share your invite link and both of you get $10 Credits.</p>
              <button className="btn btn-gold" style={{ padding: '12px 24px', fontSize: '14px', borderRadius: '12px' }}>Copy Invite Link</button>
            </div>
          </div>
        </div>

        {/* ══════════ STM MOBILE APP SHOWCASE ══════════ */}
        <section id="app-download" style={{ marginBottom: '80px' }}>

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--gold-tint)', color: 'var(--gold)', padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '20px' }}
            >
              <Smartphone size={16} /> STM Mobile App
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 950, color: 'var(--green-dark)', letterSpacing: '-2px', lineHeight: 1.1, marginBottom: '20px' }}
            >
              Your STM Salam,<br /><span style={{ color: 'var(--green-mid)' }}>in your pocket.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              style={{ color: 'var(--text-light)', fontSize: '18px', fontWeight: 500, maxWidth: '580px', margin: '0 auto', lineHeight: 1.6 }}
            >
              Browse the full menu, order in seconds, track live delivery, and pay securely — all from the STM Mobile app.
            </motion.p>
          </div>

          {/* Feature Cards Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '64px' }}>
            {[
              { icon: '🏠', title: 'Smart Home Feed', desc: 'Curated favourites, seasonal highlights & live promotions front and centre.', color: '#e0f2fe', accent: '#0ea5e9' },
              { icon: '🍽️', title: 'Full Menu Browsing', desc: 'Filter by category, search, and add to cart with one tap — just like the web.', color: '#d1fae5', accent: 'var(--green-mid)' },
              { icon: '📍', title: 'Live Order Tracking', desc: 'Watch your rider on the map in real-time from kitchen to your door.', color: '#fef3c7', accent: '#f59e0b' },
              { icon: '💳', title: 'In-App Payments', desc: 'PayNow QR and Stripe card payments — all secured in the app.', color: '#ede9fe', accent: '#7c3aed' },
              { icon: '💬', title: 'Order Chat & Support', desc: 'Message the STM team directly via in-app chat or WhatsApp any time.', color: '#fce7f3', accent: '#db2777' },
              { icon: '👤', title: 'Profile & History', desc: 'View past orders, re-order favourites, and manage your account settings.', color: '#ecfdf5', accent: 'var(--green-dark)' },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}
                style={{ background: 'white', borderRadius: '28px', padding: '32px 28px', border: '1px solid #eef2f6', transition: 'all 0.3s ease', cursor: 'default' }}
              >
                <div style={{ width: '56px', height: '56px', borderRadius: '18px', background: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '20px' }}>
                  {f.icon}
                </div>
                <h4 style={{ fontSize: '17px', fontWeight: 900, color: 'var(--green-dark)', marginBottom: '10px', letterSpacing: '-0.3px' }}>{f.title}</h4>
                <p style={{ fontSize: '14px', color: 'var(--text-light)', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Big CTA Banner with phone mockups */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ background: 'linear-gradient(135deg, #011a0e 0%, #013220 45%, #024a30 100%)', borderRadius: '48px', padding: 'clamp(40px,6vw,72px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '48px', flexWrap: 'wrap', position: 'relative', overflow: 'hidden' }}
          >
            {/* Background decoration */}
            <motion.div animate={{ y: [-10, 14, -10] }} transition={{ duration: 3.5, repeat: Infinity }} style={{ position: 'absolute', right: '38%', top: '10%', fontSize: '64px', opacity: 0.12, pointerEvents: 'none' }}>📱</motion.div>
            <motion.div animate={{ y: [8, -12, 8], rotate: [0, 8, 0] }} transition={{ duration: 4.5, repeat: Infinity }} style={{ position: 'absolute', right: '20%', bottom: '10%', fontSize: '52px', opacity: 0.1, pointerEvents: 'none' }}>☕</motion.div>
            <motion.div animate={{ y: [-6, 10, -6] }} transition={{ duration: 3, repeat: Infinity }} style={{ position: 'absolute', left: '55%', top: '20%', fontSize: '44px', opacity: 0.08, pointerEvents: 'none' }}>🥙</motion.div>

            {/* Text side */}
            <div style={{ maxWidth: '520px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212,175,55,0.15)', border: '1px solid rgba(212,175,55,0.3)', color: 'var(--gold)', padding: '8px 18px', borderRadius: '100px', fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '24px' }}>
                <Smartphone size={14} /> STM Mobile · React Native
              </div>
              <h2 style={{ color: 'white', fontSize: 'clamp(28px,4vw,46px)', fontWeight: 950, marginBottom: '20px', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                Download the STM Salam App
                <span style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--green-dark)', padding: '4px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 900, letterSpacing: '0.5px', textTransform: 'uppercase', marginLeft: '12px', verticalAlign: 'middle' }}>
                  Coming Soon
                </span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '16px', fontWeight: 500, marginBottom: '36px', lineHeight: 1.7 }}>
                Built with React Native &amp; Expo for iOS and Android. Enjoy native-speed ordering, live tracking on a map, in-app payments, and real-time chat with the STM team — wherever you are.
              </p>

              {/* Store buttons */}
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '36px' }}>
                <motion.a
                  href="https://play.google.com/store"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, boxShadow: '0 16px 32px rgba(0,0,0,0.25)' }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', color: '#111', padding: '14px 24px', borderRadius: '18px', textDecoration: 'none', transition: '0.3s', minWidth: '170px' }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734c0-.382.218-.712.609-.92z" fill="#4285F4"/><path d="M17.219 8.381l-3.427 3.62 3.427 3.618 3.87-2.174a1.123 1.123 0 000-1.89l-3.87-2.174z" fill="#FBBC04"/><path d="M3.609 1.814L13.792 12l3.427-3.619L5.64.596c-.4-.224-.87-.23-1.292-.009-.133.07-.3.185-.74.627v.6z" fill="#34A853"/><path d="M13.792 12L3.61 22.186c.44.442.607.557.74.627.421.22.891.215 1.291-.01l11.578-6.804L13.792 12z" fill="#EA4335"/></svg>
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, opacity: 0.6, letterSpacing: '0.5px' }}>GET IT ON</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, marginTop: '-2px' }}>Google Play</div>
                  </div>
                </motion.a>
                <motion.a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -3, boxShadow: '0 16px 32px rgba(0,0,0,0.25)' }}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'white', color: '#111', padding: '14px 24px', borderRadius: '18px', textDecoration: 'none', transition: '0.3s', minWidth: '170px' }}
                >
                  <Apple size={26} />
                  <div>
                    <div style={{ fontSize: '10px', fontWeight: 700, opacity: 0.6, letterSpacing: '0.5px' }}>DOWNLOAD ON THE</div>
                    <div style={{ fontSize: '16px', fontWeight: 900, marginTop: '-2px' }}>App Store</div>
                  </div>
                </motion.a>
              </div>

              {/* Trust features */}
              <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
                {[
                  { icon: <Shield size={16} />, text: 'Secure Payments' },
                  { icon: <Wifi size={16} />, text: 'Live Map Tracking' },
                  { icon: <Zap size={16} />, text: '2× Loyalty Points' },
                  { icon: <CheckCircle size={16} />, text: 'Halal Verified' },
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '7px', color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontWeight: 700 }}>
                    <span style={{ color: 'var(--gold)' }}>{f.icon}</span> {f.text}
                  </div>
                ))}
              </div>
            </div>

            {/* Dual phone mockups */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', gap: '20px', alignItems: 'flex-end' }}>
              {/* Back phone — slightly smaller + offset */}
              <motion.div
                animate={{ y: [6, -10, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                style={{ width: '200px', height: '420px', background: '#0a2414', borderRadius: '32px', border: '2.5px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)', flexShrink: 0, display: 'flex', flexDirection: 'column', transform: 'translateY(24px)' }}
              >
                {/* Status bar */}
                <div style={{ padding: '14px 14px 8px', background: '#062410', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--gold)', fontSize: '9px', fontWeight: 900, letterSpacing: '1px' }}>STM SALAM</span>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e' }} />
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--gold)' }} />
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#ef4444' }} />
                  </div>
                </div>
                {/* Order tracking screen */}
                <div style={{ flex: 1, background: '#f8fafc', padding: '12px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ background: 'var(--green-dark)', borderRadius: '14px', padding: '14px', color: 'white' }}>
                    <div style={{ fontSize: '9px', fontWeight: 800, opacity: 0.7, letterSpacing: '1px', marginBottom: '4px' }}>LIVE TRACKING</div>
                    <div style={{ fontSize: '13px', fontWeight: 900, marginBottom: '8px' }}>Order #STM-8821</div>
                    <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: '8px', height: '6px', overflow: 'hidden' }}>
                      <div style={{ width: '72%', height: '100%', background: '#22c55e', borderRadius: '8px' }} />
                    </div>
                    <div style={{ marginTop: '6px', fontSize: '10px', fontWeight: 700, color: 'var(--gold)' }}>Rider assigned · Arriving in 8 min</div>
                  </div>
                  <div style={{ background: 'white', borderRadius: '12px', padding: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <div style={{ height: '90px', background: 'linear-gradient(135deg, #e8f5e9, #c8e6c9)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>🗺️</div>
                    <div style={{ marginTop: '8px', fontSize: '10px', fontWeight: 700, color: 'var(--text-light)' }}>Tracking on map</div>
                  </div>
                  <div style={{ background: 'white', borderRadius: '12px', padding: '10px', display: 'flex', gap: '8px', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
                    <div style={{ fontSize: '22px' }}>🛵</div>
                    <div>
                      <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--green-dark)' }}>Ahmad · Rider</div>
                      <div style={{ fontSize: '9px', fontWeight: 600, color: 'var(--text-light)' }}>On his way to you</div>
                    </div>
                    <div style={{ marginLeft: 'auto', background: 'var(--green-tint)', color: 'var(--green-dark)', padding: '4px 10px', borderRadius: '8px', fontSize: '9px', fontWeight: 900 }}>CHAT</div>
                  </div>
                </div>
              </motion.div>

              {/* Front phone — main */}
              <motion.div
                animate={{ y: [-10, 8, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                style={{ width: '220px', height: '460px', background: '#062410', borderRadius: '36px', border: '3px solid rgba(255,255,255,0.15)', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.6)', flexShrink: 0, display: 'flex', flexDirection: 'column' }}
              >
                {/* Top bar */}
                <div style={{ padding: '18px 16px 12px', background: 'var(--green-dark)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '8px', color: 'var(--gold)', fontWeight: 800, letterSpacing: '1px' }}>STM SALAM</div>
                    <div style={{ fontSize: '13px', color: 'white', fontWeight: 900 }}>Home</div>
                  </div>
                  <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>👤</div>
                </div>
                {/* Home screen body */}
                <div style={{ flex: 1, background: '#f8fafc', padding: '12px', overflowY: 'hidden', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {/* Search bar */}
                  <div style={{ background: 'white', borderRadius: '12px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
                    <div style={{ fontSize: '12px' }}>🔍</div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 600 }}>Search food, drinks…</div>
                  </div>
                  {/* Quick cats */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {['🍽️ Food', '🥤 Drinks', '🥪 Snacks'].map((c, i) => (
                      <div key={i} style={{ background: i === 0 ? 'var(--green-dark)' : 'white', color: i === 0 ? 'white' : 'var(--text-dark)', fontSize: '9px', fontWeight: 800, padding: '5px 8px', borderRadius: '8px', whiteSpace: 'nowrap', boxShadow: '0 2px 6px rgba(0,0,0,0.04)' }}>
                        {c}
                      </div>
                    ))}
                  </div>
                  {/* Hero card */}
                  <div style={{ background: 'var(--green-dark)', borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                    <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300" alt="burger" style={{ width: '100%', height: '80px', objectFit: 'cover', opacity: 0.6 }} />
                    <div style={{ position: 'absolute', inset: 0, padding: '10px' }}>
                      <div style={{ fontSize: '7px', color: 'var(--gold)', fontWeight: 900, letterSpacing: '1px' }}>TODAY'S HIGHLIGHT</div>
                      <div style={{ fontSize: '11px', color: 'white', fontWeight: 900, marginTop: '2px' }}>Teh Tarik &amp; more</div>
                      <div style={{ marginTop: '4px', background: 'var(--gold)', color: 'var(--green-dark)', display: 'inline-block', padding: '3px 8px', borderRadius: '5px', fontSize: '8px', fontWeight: 900 }}>Order →</div>
                    </div>
                  </div>
                  {/* Favourite items */}
                  <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--green-dark)' }}>Customer Favorites</div>
                  {[
                    { name: 'Fresh Juice', price: '$4.20', emoji: '🥤' },
                    { name: 'Chicken Biryani', price: '$11.90', emoji: '🍛' },
                    { name: 'Shawarma', price: '$8.90', emoji: '🌯' },
                  ].map((item, i) => (
                    <div key={i} style={{ background: 'white', borderRadius: '10px', padding: '8px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{item.emoji}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--green-dark)' }}>{item.name}</div>
                        <div style={{ fontSize: '9px', fontWeight: 700, color: 'var(--green-mid)' }}>{item.price}</div>
                      </div>
                      <div style={{ width: '20px', height: '20px', background: 'var(--green-dark)', color: 'white', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 900 }}>+</div>
                    </div>
                  ))}
                </div>
                {/* Tab bar */}
                <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 8px 14px', background: 'white', borderTop: '1px solid #eef2f6' }}>
                  {['🏠', '🍽️', '🛒', '📦', '👤'].map((icon, i) => (
                    <div key={i} style={{ fontSize: '18px', opacity: i === 0 ? 1 : 0.4 }}>{icon}</div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  )
}

/* ── Active Order Tracker Sub-Component ── */
function ActiveOrderTracker() {
  const { user } = useAuth() || {}
  const [activeOrder, setActiveOrder] = useState(null)
  const normalizeStatus = (raw) =>
    String(raw || '').trim().toLowerCase().replace(/[\s-]+/g, '_')

  useEffect(() => {
    if (!user) return undefined
    const unsub = dataService.subscribeOrders((allOrders) => {
      const mine = allOrders.filter((o) =>
        o.userId === user.id ||
        o.customer?.email === user.email ||
        o.customer?.phone === user.phone
      )
      const ACTIVE_ALLOWED = ['pending', 'confirmed', 'preparing', 'ready', 'assigned', 'picked_up']
      const active = mine.find((o) => {
        const st = normalizeStatus(o.status || o.stage || o.orderStatus)
        return ACTIVE_ALLOWED.includes(st)
      })
      setActiveOrder(active || null)
      if (import.meta.env.DEV && active?.id) {
        console.log('Received live update:', normalizeStatus(active.status || active.stage || active.orderStatus))
      }
    })
    return () => { if (typeof unsub === 'function') unsub() }
  }, [user])

  if (!activeOrder) return null

  const statusKey = normalizeStatus(activeOrder.status || activeOrder.stage || activeOrder.orderStatus)
  const statusMap = {
    pending: 'Order Placed',
    confirmed: 'Confirmed',
    preparing: 'Preparing your food',
    ready: 'Ready for pickup',
    assigned: 'Rider assigned',
    picked_up: 'Out for delivery',
    delivered: 'Delivered',
  }
  const progressMap = { pending: 12, preparing: 35, ready: 55, assigned: 72, picked_up: 90, delivered: 100 }

  return (
    <Link to={`/tracking/${activeOrder.id}`} style={{ display: 'block', textDecoration: 'none', background: 'white', borderBottom: '1.5px solid #eef2f6' }}>
      <div className="container" style={{ padding: '16px 0', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <Activity size={24} color="var(--gold)" />
          <div style={{ position: 'absolute', bottom: -4, right: -4, width: '14px', height: '14px', border: '3px solid white', borderRadius: '50%', background: 'var(--success, #22c55e)', animation: 'pulse 1.5s infinite' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--green-dark)' }}>{statusMap[statusKey] || 'Processing...'}...</div>
            <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--success, #22c55e)', background: '#f0fdf4', padding: '4px 10px', borderRadius: '8px' }}>ARRIVING IN 14 MIN</div>
          </div>
          <div style={{ height: '6px', background: 'var(--cream)', borderRadius: '3px' }}>
            <motion.div initial={{ width: 0 }} animate={{ width: `${progressMap[statusKey] ?? 20}%` }} style={{ height: '100%', background: 'var(--success, #22c55e)', borderRadius: '3px' }} />
          </div>
        </div>
        <ChevronRight size={20} color="var(--text-light)" />
      </div>
    </Link>
  )
}

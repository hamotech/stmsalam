import React, { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  MapPin, CreditCard, Banknote, Wallet, Phone, Home, Bike, 
  ShieldCheck, ChevronDown, Check, User, Mail, MessageSquare, 
  ArrowLeft, ReceiptText, Lock, QrCode, ArrowRight, CirclePlay, CircleX,
  CircleCheck, RefreshCw, Paperclip 
} from 'lucide-react'
import { shopInfo } from '../data/menuData';
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import {
  placeGrabOrderAtCheckout,
  createCheckoutIdempotencyKey,
  readPersistedCheckoutIdempotencyKey,
  persistCheckoutIdempotencyKey,
  clearPersistedCheckoutIdempotencyKey,
  tryAcquireCheckoutTabLock,
  releaseCheckoutTabLock,
  heartbeatCheckoutTabLock,
  validateCheckoutSessionController,
  releaseServerCheckoutLease,
  persistResolvedOrderForIdempotency,
} from '../services/grabCheckout'
import {
  createStripePendingOrder,
  handleStripePayment,
} from '../services/stripeCheckout'
import { motion, AnimatePresence } from 'framer-motion'
import WhatsAppChatButton from '../components/WhatsAppChatButton'
import { storage, db, auth as firebaseAuth } from '../lib/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateDoc, doc } from 'firebase/firestore'
import { haversineKm, geocodeAddressSingapore, computeDeliveryQuote, isGoogleMapsGeocodingConfigured } from '../utils/delivery'

/** UI payment id → labels normalized by `grabCheckout` + Cloud Function `PAYMENT_ALIASES`. */
const CHECKOUT_PAYMENT_MAP = {
  paynow: 'PAYNOW',
  stripe: 'CARD',
  paypal: 'CARD',
  cash: 'COD',
}

const buildSafeOrderLineItems = (items = []) => {
  return (items || [])
    .filter(
      (i) =>
        i &&
        typeof i.name === 'string' &&
        i.name.trim().length > 0 &&
        Number.isFinite(i.price) &&
        i.price > 0 &&
        Number.isInteger(i.qty) &&
        i.qty > 0
    )
    .map((i) => ({
      name: i.name.trim(),
      price: Number(i.price),
      qty: i.qty,
    }))
}

export default function Checkout() {
  const navigate = useNavigate()
  
  // Defensive Context Access
  const cart = useCart() || {}
  const { cartItems = [], subtotal = 0, clearCart } = cart
  
  const auth = useAuth() || {}
  const { user, isGuest } = auth
  
  const [mode, setMode] = useState('delivery')
  const [payment, setPayment] = useState('paynow')
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    address: user?.address || '',
    notes: '',
  })

  const [orderDetails, setOrderDetails] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [uploadingScreenshot, setUploadingScreenshot] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState('');
  const [deliveryDistanceKm, setDeliveryDistanceKm] = useState(null)
  const [geoLoading, setGeoLoading] = useState(false)
  const [geoError, setGeoError] = useState('')
  const [checkoutForeignTabLock, setCheckoutForeignTabLock] = useState(false)
  const checkoutIdempotencyRef = useRef(null)
  const checkoutSubmitLockRef = useRef(false)
  const stripePaymentLaunchRef = useRef(false)
  const stripeCheckoutCooldownUntilRef = useRef(0)
  const checkoutProcessingSyncRef = useRef(false)
  const stripeHostedRedirectIssuedRef = useRef(false)

  const commitCheckoutIdempotencySession = () => {
    if (!validateCheckoutSessionController()) return false
    releaseCheckoutTabLock()
    clearPersistedCheckoutIdempotencyKey()
    checkoutIdempotencyRef.current = null
    void releaseServerCheckoutLease()
    return true
  }

  /** Cross-tab lock: avoids two tabs each minting a fresh idempotency key for the same profile. */
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const acquired = tryAcquireCheckoutTabLock()
    setCheckoutForeignTabLock(!acquired)
    const hb = window.setInterval(() => heartbeatCheckoutTabLock(), 90_000)
    const onUnload = () => releaseCheckoutTabLock()
    window.addEventListener('beforeunload', onUnload)
    window.addEventListener('pagehide', onUnload)
    return () => {
      window.clearInterval(hb)
      window.removeEventListener('beforeunload', onUnload)
      window.removeEventListener('pagehide', onUnload)
      releaseCheckoutTabLock()
    }
  }, [])

  /** When returning to a visible tab, refresh lock liveness (timers are throttled in background). */
  useEffect(() => {
    if (typeof document === 'undefined') return undefined
    const onVis = () => {
      if (document.visibilityState === 'visible') heartbeatCheckoutTabLock()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  /** Restore crash-resume key from sessionStorage; new key only when none stored. Cleared only on commit (nav / reset), not on unmount. */
  useEffect(() => {
    const stored = readPersistedCheckoutIdempotencyKey()
    if (stored) {
      checkoutIdempotencyRef.current = stored
    } else if (!checkoutIdempotencyRef.current) {
      checkoutIdempotencyRef.current = createCheckoutIdempotencyKey()
      persistCheckoutIdempotencyKey(checkoutIdempotencyRef.current)
    }
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Step 2 Requirement: Handle back navigation and order persistence
  useEffect(() => {
    const lastOrderId = localStorage.getItem('stm_last_order_id');
    // If we have a last order and the cart is empty, redirect to tracking instead of showing empty checkout
    if (lastOrderId && (!cartItems || cartItems.length === 0)) {
      console.log('Navigating to tracking:', lastOrderId);
      navigate(`/tracking/${lastOrderId}`, { replace: true });
    } else if ((!cartItems || cartItems.length === 0) && !lastOrderId) {
      console.error('Track navigation blocked: missing orderId in Checkout.');
    }
  }, [cartItems.length, navigate]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || prev.name,
        phone: user.phone || prev.phone,
        email: user.email || prev.email,
        address: user.address || prev.address
      }));
    }
  }, [user]);

  const safeSubtotal = Number(subtotal) || 0
  const taxRate = 0 // Override: GST removed
  const tax = safeSubtotal * taxRate

  const deliveryQuote = useMemo(
    () => computeDeliveryQuote({ mode, subtotal: safeSubtotal, distanceKm: deliveryDistanceKm }),
    [mode, safeSubtotal, deliveryDistanceKm]
  )

  const deliveryFee =
    mode === 'delivery' && !deliveryQuote.blocked
      ? (typeof deliveryQuote.deliveryFee === 'number' ? deliveryQuote.deliveryFee : 0)
      : 0

  const total = safeSubtotal + tax + deliveryFee

  useEffect(() => {
    if (mode !== 'delivery') {
      setDeliveryDistanceKm(null)
      setGeoError('')
      setGeoLoading(false)
      return
    }
    const addr = (formData.address || '').trim()
    const hasSgPostal = /\b\d{6}\b/.test(addr)
    if (addr.length < 6 || (!hasSgPostal && addr.length < 8)) {
      setDeliveryDistanceKm(null)
      setGeoError('')
      return
    }
    const timer = setTimeout(async () => {
      setGeoLoading(true)
      setGeoError('')
      try {
        const pt = await geocodeAddressSingapore(addr)
        if (!pt) {
          setDeliveryDistanceKm(null)
          setGeoError(
            isGoogleMapsGeocodingConfigured()
              ? 'We could not place that address on the map. Check the 6-digit postal code, block and street name, then try again.'
              : import.meta.env.DEV
                ? 'We could not place that address on the map. Use a 6-digit postal code with block and street, or DETECT ME. Tip: set VITE_GOOGLE_MAPS_API_KEY in .env.local for reliable geocoding.'
                : 'We could not place that address on the map. Add a 6-digit Singapore postal code (e.g. 440004) with block and street, or tap DETECT ME to use your location.'
          )
          return
        }
        const km = haversineKm(shopInfo.outletLat, shopInfo.outletLng, pt.lat, pt.lon)
        setDeliveryDistanceKm(km)
        setGeoError('')
      } catch {
        setDeliveryDistanceKm(null)
        setGeoError('Distance check failed. Standard delivery fee applies until we confirm your address.')
      } finally {
        setGeoLoading(false)
      }
    }, 750)
    return () => clearTimeout(timer)
  }, [mode, formData.address])

  const handleChange = (e) => {
    if (e?.target) {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  }

  const handlePlaceOrder = async () => {
    if (processing) {
      return
    }
    stripeHostedRedirectIssuedRef.current = false
    if (checkoutForeignTabLock) {
      alert('Checkout is already active in another browser tab. Finish or close that tab first.')
      return
    }

    const nameTrim = (formData?.name || '').trim()
    const phoneTrim = (formData?.phone || '').trim()
    if (!nameTrim) {
      alert('Please enter your name.')
      return
    }
    if (!phoneTrim) {
      alert('Please enter your mobile number.')
      return
    }

    if (mode === 'delivery') {
      if (deliveryQuote.blocked) {
        alert(
          `Delivery needs a minimum order of SGD ${(shopInfo.minOrderDelivery ?? 10).toFixed(2)}. ` +
          `Add more items, or choose pickup at ${shopInfo.outletName}.`
        )
        return
      }
      if (!(formData.address || '').trim()) {
        alert('Please enter your full delivery address (include postal code).')
        return
      }
    }

    const normalizedPhone = String(phoneTrim).replace(/\s|-/g, '')
    const isValidSgPhone = /^(?:\+65)?[689]\d{7}$/.test(normalizedPhone)

    if ((payment === 'stripe' || payment === 'paypal') && !isValidSgPhone) {
      alert('Please enter a valid Singapore phone number before online payment.')
      return
    }

    if (checkoutSubmitLockRef.current) {
      return
    }
    checkoutSubmitLockRef.current = true

    if (checkoutProcessingSyncRef.current) {
      checkoutSubmitLockRef.current = false
      return
    }
    checkoutProcessingSyncRef.current = true

    // Stripe/PayPal fall back to the bundled demo gateway when no real
    // checkout URL is configured — lets the app run end-to-end before the
    // client provides production credentials.

    setProcessing(true)
    let stripeHostedFlowThisSubmit = false
    try {
      const safeItems = buildSafeOrderLineItems(cartItems)

      if (!safeItems.length) {
        console.error('[CHECKOUT] Invalid cart items:', cartItems)
        alert('Cart is invalid. Please refresh cart.')
        setProcessing(false)
        return
      }

      const orderTotalRaw = safeItems.reduce((sum, i) => sum + i.price * i.qty, 0)

      if (!Number.isFinite(orderTotalRaw) || orderTotalRaw <= 0) {
        console.error('[CHECKOUT] Invalid total:', orderTotalRaw)
        alert('Invalid order total. Please try again.')
        setProcessing(false)
        return
      }

      const paymentModeForCf = CHECKOUT_PAYMENT_MAP[payment]

      if (!paymentModeForCf) {
        console.error('[CHECKOUT] Invalid payment mode:', payment)
        alert('Invalid payment method.')
        setProcessing(false)
        return
      }

      let idempotencyKey =
        checkoutIdempotencyRef.current?.trim() ||
        readPersistedCheckoutIdempotencyKey() ||
        createCheckoutIdempotencyKey()

      if (!idempotencyKey) {
        console.error('[CHECKOUT] Missing idempotency key')
        alert('Session error. Please refresh checkout.')
        setProcessing(false)
        return
      }

      persistCheckoutIdempotencyKey(idempotencyKey)
      checkoutIdempotencyRef.current = idempotencyKey

      console.log('[CHECKOUT DEBUG PAYLOAD]', {
        items: safeItems,
        total: orderTotalRaw,
        paymentModeForCf,
        idempotencyKey,
        uid: firebaseAuth?.currentUser?.uid || user?.id,
      })

      // Stripe (card): only ../services/stripeCheckout.js → fixed Cloud Run createStripeCheckout (no other HTTP checkout path).
      if (payment === 'stripe') {
        const cd = stripeCheckoutCooldownUntilRef.current
        if (Date.now() < cd) {
          const sec = Math.max(1, Math.ceil((cd - Date.now()) / 1000))
          alert(`Please wait ${sec}s before trying payment again (network cooldown).`)
          setProcessing(false)
          return
        }
        const stripeItems = [...safeItems]
        if (mode === 'delivery' && deliveryFee > 0) {
          stripeItems.push({
            name: 'Delivery fee',
            price: Number(deliveryFee.toFixed(2)),
            qty: 1,
          })
        }
        const orderTotalForStripe = stripeItems.reduce(
          (sum, i) => sum + i.price * i.qty,
          0
        )
        if (!Number.isFinite(orderTotalForStripe) || orderTotalForStripe <= 0) {
          alert('Invalid order total. Please try again.')
          setProcessing(false)
          return
        }

        const stripeOrderId = await createStripePendingOrder({
          items: stripeItems,
          totalAmount: Number(orderTotalForStripe.toFixed(2)),
          idempotencyKey,
          customerName: nameTrim,
          customerPhone: normalizedPhone,
          mode,
          notes: formData.notes,
          address: mode === 'delivery' ? formData.address : '',
        })

        persistResolvedOrderForIdempotency(idempotencyKey, stripeOrderId)

        setOrderDetails({ id: stripeOrderId, trackingToken: '' })

        if (!commitCheckoutIdempotencySession()) return
        if (clearCart) clearCart()
        localStorage.setItem('stm_last_order_id', stripeOrderId)

        if (stripePaymentLaunchRef.current) {
          return
        }
        stripePaymentLaunchRef.current = true
        stripeHostedFlowThisSubmit = true
        try {
          const stripePayResult = await handleStripePayment({
            orderId: stripeOrderId,
            customerName: nameTrim,
          })
          if (stripePayResult && stripePayResult.redirected) {
            stripeHostedRedirectIssuedRef.current = true
          }
        } catch (stripeErr) {
          stripePaymentLaunchRef.current = false
          throw stripeErr
        }
        return
      }

      const orderId = await placeGrabOrderAtCheckout({
        items: safeItems,
        totalAmount: Number(orderTotalRaw.toFixed(2)),
        paymentMode: paymentModeForCf,
        idempotencyKey,
      })

      const newOrder = { id: orderId, trackingToken: '' }
      setOrderDetails(newOrder)

      const origin = window.location.origin
      const trackingUrl = `${origin}/tracking/${encodeURIComponent(orderId)}`
      const cancelUrl = `${origin}/checkout`

      if (payment === 'paynow') {
        setShowPaymentModal(true)
      } else if (payment === 'paypal') {
        const envBase = import.meta.env.VITE_PAYPAL_CHECKOUT_URL
        const isPlaceholderPay = (val) => {
          if (!val) return true
          const v = String(val).toLowerCase()
          return v.includes('replace_me') || v.includes('replace-me')
            || v.includes('your_') || v.includes('example.com')
        }
        const useDemo = isPlaceholderPay(envBase)
        const base = useDemo ? `${origin}/pay` : envBase
        const sep = base.includes('?') ? '&' : '?'

        const url =
          `${base}${sep}` +
          `method=${encodeURIComponent(payment)}` +
          `&amount=${encodeURIComponent((total || 0).toFixed(2))}` +
          `&currency=SGD` +
          `&invoice=${encodeURIComponent(orderId)}` +
          `&note=${encodeURIComponent(`phone:${normalizedPhone}`)}` +
          `&success_url=${encodeURIComponent(trackingUrl)}` +
          `&cancel_url=${encodeURIComponent(cancelUrl)}` +
          `&return_url=${encodeURIComponent(trackingUrl)}` +
          `&redirect_url=${encodeURIComponent(trackingUrl)}`

        if (useDemo) {
          if (!commitCheckoutIdempotencySession()) return
          if (clearCart) clearCart()
          localStorage.setItem('stm_last_order_id', orderId)
          window.location.href = url
        } else {
          window.open(url, '_blank', 'noopener,noreferrer')
          finalizeSuccess(newOrder)
        }
      } else {
        finalizeSuccess(newOrder)
      }
    } catch (err) {
      if (stripeHostedFlowThisSubmit) {
        stripeCheckoutCooldownUntilRef.current = Date.now() + 8000
      }
      const msg = err && typeof err.message === 'string' ? err.message : 'Internal error. Check Firebase logs.'
      console.error('[CHECKOUT ERROR FULL]', {
        message: err?.message,
        stack: err?.stack,
        payload: {
          cartItems,
          total,
          payment,
          idempotency: checkoutIdempotencyRef.current,
        },
      })
      alert(msg)
    } finally {
      checkoutSubmitLockRef.current = false
      setProcessing(false)
      if (!stripeHostedRedirectIssuedRef.current) {
        checkoutProcessingSyncRef.current = false
      }
    }
  }

  const handleScreenshotUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !orderDetails) return;
    setUploadingScreenshot(true);
    try {
      // Basic compression before upload
      const compressedDataURL = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (re) => {
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const MAX_WIDTH = 1000;
            let width = img.width;
            let height = img.height;
            if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
            canvas.width = width; canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL('image/webp', 0.8));
          };
          img.src = re.target.result;
        };
        reader.readAsDataURL(file);
      });

      const blob = await (await fetch(compressedDataURL)).blob();
      const fileRef = storageRef(storage, `proofs/${orderDetails.id}_${Date.now()}.webp`);
      await uploadBytes(fileRef, blob, { contentType: 'image/webp' });
      const url = await getDownloadURL(fileRef);
      
      // Source of truth: orders only (public_tracking mirrors via Cloud Functions).
      await updateDoc(doc(db, 'orders', orderDetails.id), { payment_screenshot: url });

      setScreenshotUrl(url);
      alert('Payment screenshot uploaded successfully!');
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Failed to upload screenshot. Please try again.');
    } finally {
      setUploadingScreenshot(false);
    }
  };

  const handlePaidNotification = () => {
    if (!orderDetails) return;
    
    const itemsList = (cartItems || []).map(item => `* ${item.name} x${item.qty}`).join('\n');
    const addressLine = mode === 'delivery' ? `\nAddress: ${formData.address}` : '\nOption: Store Pickup';
    
    // Step 4 Requirement: Only add line if screenshot truly exists
    const screenshotLine = screenshotUrl ? `\n\nPayment screenshot uploaded. Please check order record.` : '';

    const message = `*New STM Order*\n` +
      `Order ID: ${orderDetails.id}\n` +
      `Customer: ${formData.name}\n` +
      `Phone: ${formData.phone}\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total: SGD ${(total || 0).toFixed(2)}*` +
      `${addressLine}` +
      screenshotLine;

    const waUrl = `https://wa.me/${(shopInfo?.whatsapp || '6591915766').replace(/\D/g, '')}?text=${encodeURIComponent(message)}`
    window.open(waUrl, '_blank')
    finalizeSuccess(orderDetails)
  }

  const finalizeSuccess = (order) => {
    if (!commitCheckoutIdempotencySession()) return
    if (clearCart) clearCart()
    if (order?.id) {
       localStorage.setItem('stm_last_order_id', order.id)
       // Use replace: true to prevent back navigation to the checkout form
       navigate(`/tracking/${order.id}${order.trackingToken ? `?token=${order.trackingToken}` : ''}`, { replace: true })
    } else {
       navigate('/', { replace: true })
    }
  }

  const [locating, setLocating] = useState(false)
  const isPlaceholderUrl = (val) => {
    if (!val) return true
    const v = String(val).toLowerCase()
    return v.includes('replace_me') || v.includes('replace-me')
      || v.includes('your_') || v.includes('example.com')
  }
  const missingStripeEnv = isPlaceholderUrl(import.meta.env.VITE_STRIPE_CHECKOUT_URL)
  const missingPaypalEnv = isPlaceholderUrl(import.meta.env.VITE_PAYPAL_CHECKOUT_URL)
  const hasFirebaseForStripe = !!String(import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim()
  const stripePaymentConfigured = hasFirebaseForStripe

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.')
      return
    }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`, {
            headers: { 'User-Agent': 'STM-Salam-Digital-Platform' }
          });
          const data = await res.json()
          const address = data.display_name || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          setFormData(prev => ({ ...prev, address }))
        } catch (err) {
          console.error('Geocoding error:', err)
          setFormData(prev => ({ ...prev, address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}` }))
        } finally {
          setLocating(false)
        }
      },
      (err) => {
        console.error('Geolocation error:', err)
        alert('Unable to get your location. Please check browser permissions.')
        setLocating(false)
      },
      { enableHighAccuracy: true, timeout: 5000 }
    )
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f8fafc', flexDirection: 'column', gap: '20px' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #e2e8f0', borderTopColor: 'var(--green-dark)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ fontWeight: 800, color: '#64748b' }}>Preparing Checkout...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '20px' }}>
        <div style={{ maxWidth: '440px', background: 'white', padding: '48px', borderRadius: '32px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.05)' }}>
          <div style={{ width: '80px', height: '80px', background: 'var(--cream)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <ReceiptText size={40} color="var(--gold)" />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 950, color: 'var(--green-dark)', marginBottom: '12px' }}>Your Cart is Empty</h2>
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: '1.6', marginBottom: '32px' }}>Add some delicacies from our menu to start your order.</p>
          <button onClick={() => navigate('/menu')} style={{ width: '100%', padding: '18px', background: 'var(--green-dark)', color: 'white', border: 'none', borderRadius: '16px', fontWeight: 900, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            Start Ordering <ArrowRight size={20} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '100px' }}>
      {/* Header */}
      <div style={{ background: 'var(--green-dark)', padding: '60px 0 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: 0.1, background: 'url(https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=1000)', backgroundSize: 'cover' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <button onClick={() => navigate('/cart')} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', fontWeight: 700, fontSize: '14px', marginBottom: '24px' }}>
            <ArrowLeft size={16} /> Edit Order
          </button>
          <h1 style={{ color: 'white', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 950, letterSpacing: '-2px', marginBottom: '8px' }}>Finalize Order</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '16px', fontWeight: 500 }}>{isGuest ? 'Guest Checkout (WhatsApp Confirmation)' : 'Secure Cloud Ordering'}</p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
        
        {/* Left: Info Sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <section style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '30px', height: '30px', background: 'var(--green-tint)', color: 'var(--green-dark)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>1</div>
              Itemized Order
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {cartItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#f8fafc', borderRadius: '16px' }}>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--cream)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '14px' }}>{item.qty}</div>
                    <span style={{ fontWeight: 800, fontSize: '15px' }}>{item.name}</span>
                  </div>

                  <span style={{ fontWeight: 950, color: 'var(--green-dark)' }}>${((item.price || 0) * (item.qty || 0)).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </section>

          <section style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '30px', height: '30px', background: 'var(--green-tint)', color: 'var(--green-dark)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>2</div>
              Order Type
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[{ id: 'delivery', icon: <Bike size={20} />, text: 'Delivery' }, { id: 'pickup', icon: <Home size={20} />, text: 'Pickup' }].map(opt => (
                <button key={opt.id} onClick={() => setMode(opt.id)} style={{ padding: '16px', borderRadius: '16px', border: `2.5px solid ${mode === opt.id ? 'var(--green-mid)' : '#f1f5f9'}`, background: mode === opt.id ? 'var(--green-tint)' : 'white', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: '0.2s' }}>
                  <span style={{ color: mode === opt.id ? 'var(--green-mid)' : '#64748b' }}>{opt.icon}</span>
                  <span style={{ fontWeight: 800, color: mode === opt.id ? 'var(--green-dark)' : '#64748b' }}>{opt.text}</span>
                </button>
              ))}
            </div>
            <p style={{ marginTop: '14px', fontSize: '12px', color: '#64748b', lineHeight: 1.5, fontWeight: 600 }}>
              {mode === 'delivery'
                ? `Free delivery: SGD ${(shopInfo.minOrderFreeDelivery ?? 10).toFixed(0)}+ and within ${shopInfo.freeDeliveryRadiusKm} km of our outlet. Otherwise SGD ${shopInfo.deliveryFee.toFixed(2)} delivery fee.`
                : `Collect from ${shopInfo.outletName} — no delivery fee.`}
            </p>
          </section>

          <section style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '12px', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MapPin size={18} color="var(--green-mid)" /> Order from
            </h2>
            <div style={{ background: '#f8fafc', borderRadius: '14px', padding: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ fontWeight: 900, fontSize: '15px', color: 'var(--green-dark)', marginBottom: '6px' }}>{shopInfo.outletName}</div>
              <div style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, fontWeight: 600 }}>{shopInfo.outletAddress}</div>
            </div>
          </section>

          <section style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '30px', height: '30px', background: 'var(--green-tint)', color: 'var(--green-dark)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>3</div>
              {mode === 'delivery' ? 'Delivery details' : 'Your details'}
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }} />
              <input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: 600, boxSizing: 'border-box' }} />
              {mode === 'delivery' && (
                <>
                  <div style={{ position: 'relative' }}>
                    <textarea name="address" value={formData.address} onChange={handleChange} placeholder="Full address including postal code (e.g. Marine Parade)" style={{ width: '100%', padding: '14px', paddingRight: '120px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: 600, boxSizing: 'border-box', minHeight: '80px' }} />
                    <button type="button" onClick={handleDetectLocation} disabled={locating} style={{ position: 'absolute', top: '10px', right: '10px', background: 'var(--green-dark)', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '10px', fontSize: '11px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} /> {locating ? 'Locating...' : 'DETECT ME'}
                    </button>
                  </div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', lineHeight: 1.5 }}>
                    {geoLoading && <span style={{ color: '#0ea5e9' }}>Checking distance from {shopInfo.outletName}…</span>}
                    {!geoLoading && deliveryDistanceKm != null && (
                      <span>
                        ≈ <strong>{deliveryDistanceKm.toFixed(1)} km</strong> from outlet —{' '}
                        {deliveryQuote.freeDelivery
                          ? <strong style={{ color: '#15803d' }}>free delivery applies</strong>
                          : <strong style={{ color: '#b45309' }}>SGD {shopInfo.deliveryFee.toFixed(2)} delivery fee</strong>}
                      </span>
                    )}
                    {!geoLoading && geoError && (
                      <span style={{ color: '#b45309' }}>{geoError}</span>
                    )}
                    {!geoLoading && !geoError && deliveryDistanceKm == null && (formData.address || '').trim().length >= 8 && (
                      <span style={{ color: '#64748b' }}>Could not measure distance yet — fee may apply until confirmed.</span>
                    )}
                  </div>
                </>
              )}
              {mode === 'pickup' && (
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600, lineHeight: 1.5, padding: '12px', background: '#f8fafc', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                  Pick up at <strong>{shopInfo.outletName}</strong>. We’ll use your phone number to coordinate pickup time.
                </div>
              )}
              <textarea name="notes" value={formData.notes} onChange={handleChange} placeholder="Any specific requests?" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', fontWeight: 600, boxSizing: 'border-box', minHeight: '60px' }} />
            </div>
          </section>

          {!isGuest && (
            <section style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '30px', height: '30px', background: 'var(--green-tint)', color: 'var(--green-dark)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>4</div>
                Payment Method
              </h2>
              <div style={{ display: 'grid', gap: '10px' }}>
                {[{ id: 'paynow', icon: <QrCode size={18} />, title: 'PayNow SGQR' }, { id: 'stripe', icon: <CreditCard size={18} />, title: 'Pay with Stripe' }, { id: 'paypal', icon: <Wallet size={18} />, title: 'Pay with PayPal' }, { id: 'cash', icon: <Banknote size={18} />, title: 'Cash' }].map(p => (
                  <button key={p.id} onClick={() => setPayment(p.id)} style={{ width: '100%', padding: '16px', borderRadius: '16px', border: `2.5px solid ${payment === p.id ? 'var(--green-mid)' : '#f1f5f9'}`, background: payment === p.id ? 'var(--green-tint)' : 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', textAlign: 'left' }}>
                    <div style={{ color: payment === p.id ? 'var(--green-mid)' : '#64748b' }}>{p.icon}</div>
                    <span style={{ fontWeight: 800, color: '#0f172a' }}>{p.title}</span>
                  </button>
                ))}
              </div>
              {((payment === 'stripe' && missingStripeEnv && !stripePaymentConfigured) || (payment === 'paypal' && missingPaypalEnv)) && (
                <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: '10px', background: '#fffbeb', color: '#92400e', border: '1px solid #fde68a', fontSize: '12px', fontWeight: 700 }}>
                  Running in <strong>demo mode</strong> — no real payment will be captured. For Stripe, set <code>VITE_FIREBASE_PROJECT_ID</code> and deploy <code>createStripePendingOrder</code> + Cloud Run <code>createStripeCheckout</code> (URL is fixed in code). For PayPal, set <code>VITE_PAYPAL_CHECKOUT_URL</code>.
                </div>
              )}
            </section>
          )}
        </div>

        {/* Right: Summary */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div style={{ background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px' }}>Final Total</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px', marginBottom: '20px' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: 600 }}><span>Subtotal</span><span>${safeSubtotal.toFixed(2)}</span></div>
               <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', fontWeight: 600 }}>
                 <span>Delivery</span>
                 <span style={{ fontWeight: 800, color: mode === 'pickup' || deliveryFee === 0 ? '#15803d' : '#0f172a' }}>
                   {mode === 'pickup' ? 'Pickup — FREE' : deliveryQuote.blocked ? '—' : deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                 </span>
               </div>
               {mode === 'delivery' && deliveryQuote.blocked && (
                 <div style={{ fontSize: '12px', fontWeight: 700, color: '#b45309', background: '#fffbeb', padding: '10px', borderRadius: '10px', border: '1px solid #fde68a' }}>
                   Minimum SGD {(shopInfo.minOrderDelivery ?? 10).toFixed(2)} for delivery. Add items or choose pickup.
                 </div>
               )}
               {checkoutForeignTabLock && (
                 <div style={{ fontSize: '12px', fontWeight: 700, color: '#92400e', background: '#fffbeb', padding: '10px', borderRadius: '10px', border: '1px solid #fde68a', marginTop: '10px' }}>
                   Another tab is using checkout. Complete or close it first — otherwise the same order could be placed twice.
                 </div>
               )}
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: 950, color: 'var(--green-dark)', marginTop: '4px' }}><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button 
              onClick={handlePlaceOrder} 
              disabled={processing || checkoutForeignTabLock || (mode === 'delivery' && deliveryQuote.blocked)} 
              style={{ 
                width: '100%', 
                padding: '20px', 
                background: 'var(--green-dark)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '16px', 
                fontWeight: 900, 
                cursor: processing || checkoutForeignTabLock ? 'not-allowed' : 'pointer', 
                fontSize: '17px', 
                animation: 'pulse 2s infinite' 
              }}
            >
              {processing ? 'Processing...' : checkoutForeignTabLock ? 'Another tab has checkout' : (isGuest ? 'Order via WhatsApp' : 'Confirm Order')}
            </button>
            
            <WhatsAppChatButton 
              message="Hi STM Salam, I want help with payment." 
              type="button" 
              label="Payment Help?" 
              style={{ width: '100%', marginTop: '16px', padding: '16px', fontSize: '15px', borderRadius: '16px', background: 'var(--gold-tint)', color: 'var(--green-dark)', boxShadow: 'none' }} 
            />

            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', color: '#94a3b8' }}>
              <Lock size={14} /> <span style={{ fontSize: '12px', fontWeight: 700 }}>Secure End-to-End Encryption</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── PayNow Scanner Modal ── */}
      <AnimatePresence>
        {showPaymentModal && orderDetails && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
            <div style={{ background: 'white', borderTop: '6px solid var(--gold)', borderRadius: '32px', padding: '32px', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 950, marginBottom: '8px' }}>Scan & Pay</h2>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Open the scan-to-pay sheet (PDF) or use your bank app to complete PayNow.</p>
              <div style={{ width: '100%', maxWidth: 320, height: 420, margin: '0 auto 16px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#f8fafc' }}>
                <object
                  data="/scanner-pay.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                  type="application/pdf"
                  title="Scan to pay"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                >
                  <div style={{ padding: '16px', fontSize: '14px', fontWeight: 600 }}>
                    <a href="/scanner-pay.pdf" target="_blank" rel="noreferrer" style={{ color: 'var(--green-dark)' }}>
                      Open scan-to-pay PDF
                    </a>
                  </div>
                </object>
              </div>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '16px' }}>
                <a href="/scanner-pay.pdf" download style={{ color: 'var(--green-mid)', fontWeight: 800 }}>Download PDF</a>
              </p>
              
              <div style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', 
                  padding: '12px', background: screenshotUrl ? '#f0fdf4' : '#f8fafc', 
                  border: screenshotUrl ? '2px solid #16a34a' : '2px dashed #cbd5e1',
                  borderRadius: '12px', cursor: 'pointer', transition: '0.2s'
                }}>
                  {uploadingScreenshot ? <RefreshCw className="animate-spin" size={18} /> : (screenshotUrl ? <CircleCheck size={18} color="#16a34a" /> : <Paperclip size={18} color="#64748b" />)}
                  <span style={{ fontWeight: 800, fontSize: '13px', color: screenshotUrl ? '#166534' : '#64748b' }}>
                    {uploadingScreenshot ? 'Uploading...' : (screenshotUrl ? 'Screenshot Attached' : 'Tap to Upload Receipt')}
                  </span>
                  <input type="file" accept="image/*" onChange={handleScreenshotUpload} style={{ display: 'none' }} disabled={uploadingScreenshot} />
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                <button onClick={() => {
                  if (!orderDetails?.id) return;
                  const itemsList = (cartItems || []).map(item => `* ${item.name} x${item.qty}`).join('\n');
                  const addressLine = mode === 'delivery' ? `\nAddress: ${formData.address}` : '\nOption: Store Pickup';
                  const message = `*New STM Order*\nOrder ID: ${orderDetails.id}\nCustomer: ${formData.name}\nPhone: ${formData.phone}\n\n*Items:*\n${itemsList}\n\n*Total: SGD ${(total || 0).toFixed(2)}*${addressLine}`;
                  const waUrl = `https://wa.me/${(shopInfo?.whatsapp || '6591915766').replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
                  window.open(waUrl, '_blank');
                }} style={{ flex: 1, padding: '12px', background: 'var(--green-mid)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 900, cursor: 'pointer' }}>Share on WhatsApp</button>
                <button onClick={() => { finalizeSuccess(orderDetails); }} style={{ flex: 1, padding: '12px', background: 'var(--green-dark)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 900, cursor: 'pointer' }}>I Have Completed Payment</button>
              </div>
              <button onClick={() => setShowPaymentModal(false)} style={{ marginTop: '8px', padding: '8px', background: 'transparent', color: '#64748b', border: 'none', cursor: 'pointer' }}>Back</button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
  placeOnlineOrderAtCheckout,
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
} from '../services/onlineCheckout'
import {
  createStripePendingOrder,
  handleStripePayment,
} from '../services/stripeCheckout'
import { motion, AnimatePresence } from 'framer-motion'
import WhatsAppChatButton from '../components/WhatsAppChatButton'
import { storage, db, auth as firebaseAuth } from '../lib/firebase'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateDoc, doc } from 'firebase/firestore'
import { assertNoDirectOrderLifecycleWrite } from '../lib/orderLifecycleGuards'
import { haversineKm, geocodeAddressSingapore, computeDeliveryQuote, isGoogleMapsGeocodingConfigured } from '../utils/delivery'
import { PAYMENT_MODE } from '../domain/orderStateMachine';

/** UI payment id → labels normalized by `onlineCheckout` + Cloud Function `PAYMENT_ALIASES`. */
const CHECKOUT_PAYMENT_MAP = {
  COD: 'COD',
  SCANNER: 'SCANNER',
  STRIPE: 'STRIPE',
}

const paymentMethods = [
  {
    id: PAYMENT_MODE.COD,
    title: 'Cash on Delivery',
    description: 'Pay when your order arrives',
    icon: 'cash'
  },
  {
    id: PAYMENT_MODE.SCANNER,
    title: 'Scan & Pay',
    description: 'Pay instantly using SGQR / PayNow',
    icon: 'qr'
  },
  {
    id: PAYMENT_MODE.STRIPE,
    title: 'Stripe Pay',
    description: 'Secure payment with Stripe',
    icon: 'card'
  }
];

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
  const [payment, setPayment] = useState(PAYMENT_MODE.SCANNER)
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
  const prevPaymentForIdemRef = useRef(null)

  useEffect(() => {
    if (prevPaymentForIdemRef.current !== null && prevPaymentForIdemRef.current !== payment) {
      clearPersistedCheckoutIdempotencyKey()
      const nextKey = createCheckoutIdempotencyKey()
      checkoutIdempotencyRef.current = nextKey
      persistCheckoutIdempotencyKey(nextKey)
    }
    prevPaymentForIdemRef.current = payment
  }, [payment])

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
    console.log('CHECKOUT_TRIGGER_PAYMENT_METHOD', payment)
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

    if (payment === PAYMENT_MODE.STRIPE && !isValidSgPhone) {
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

      const paymentMethodOut = CHECKOUT_PAYMENT_MAP[payment] ?? payment
      console.log('CONFIRM_ORDER_PAYMENT_METHOD', paymentMethodOut)

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
        paymentMethod: paymentMethodOut,
        idempotencyKey,
        uid: firebaseAuth?.currentUser?.uid || user?.id,
      })

      // Stripe (card): only ../services/stripeCheckout.js → fixed Cloud Run createStripeCheckout (no other HTTP checkout path).
      if (payment === PAYMENT_MODE.STRIPE) {
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

      const orderId = await placeOnlineOrderAtCheckout({
        items: safeItems,
        totalAmount: Number(orderTotalRaw.toFixed(2)),
        paymentMethod: paymentMethodOut,
        idempotencyKey,
        customerName: nameTrim,
        customerPhone: normalizedPhone,
        mode,
        notes: formData.notes,
        address: mode === 'delivery' ? formData.address : '',
      })

      const newOrder = { id: orderId, trackingToken: '' }
      setOrderDetails(newOrder)

      const origin = window.location.origin
      const trackingUrl = `${origin}/tracking/${encodeURIComponent(orderId)}`
      const cancelUrl = `${origin}/checkout`

      if (payment === PAYMENT_MODE.SCANNER) {
        if (!commitCheckoutIdempotencySession()) return
        if (clearCart) clearCart()
        localStorage.setItem('stm_last_order_id', orderId)
        navigate(`/scan-pay/${orderId}`, { replace: true })
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
      const patch = { payment_screenshot: url };
      assertNoDirectOrderLifecycleWrite(patch, 'Checkout.paymentScreenshot');
      await updateDoc(doc(db, 'orders', orderDetails.id), patch);

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

  const handleDetectLocation = async () => {
    setLocating(true)
    
    try {
      let lat, lng;
      
      if (Capacitor.isNativePlatform()) {
        const { Geolocation } = await import('@capacitor/geolocation');
        
        try {
          const checkPerms = await Geolocation.checkPermissions();
          if (checkPerms.location !== 'granted') {
            const reqPerms = await Geolocation.requestPermissions();
            if (reqPerms.location !== 'granted') {
              alert('Location permission denied. Please enable it in your device settings.');
              setLocating(false);
              return;
            }
          }
        } catch (e) {
          console.error('Error checking/requesting permissions:', e);
        }

        const position = await Geolocation.getCurrentPosition({ enableHighAccuracy: true });
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      } else {
        if (!navigator.geolocation) {
          alert('Geolocation is not supported by your browser.')
          setLocating(false)
          return
        }
        
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, { enableHighAccuracy: true, timeout: 5000 });
        });
        lat = position.coords.latitude;
        lng = position.coords.longitude;
      }
      
      // Reverse Geocoding via Nominatim
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`, {
          headers: { 'User-Agent': 'STM-Salam-Digital-Platform' }
        });
        const data = await res.json()
        const address = data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`
        setFormData(prev => ({ ...prev, address }))
      } catch (err) {
        console.error('Geocoding error:', err)
        setFormData(prev => ({ ...prev, address: `${lat.toFixed(6)}, ${lng.toFixed(6)}` }))
      }
      
    } catch (err) {
      console.error('Location detection error:', err)
      alert('Unable to detect location. Please enable GPS or enter address manually.')
    } finally {
      setLocating(false)
    }
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
    <div className="cart-container" style={{ background: '#f8fafc', minHeight: '100vh' }}>
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
                          : <strong style={{ color: '#B8860B' }}>SGD {shopInfo.deliveryFee.toFixed(2)} delivery fee</strong>}
                      </span>
                    )}
                    {!geoLoading && geoError && (
                      <span style={{ color: '#B8860B' }}>{geoError}</span>
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
              <div style={{ display: 'grid', gap: '12px' }}>
                {paymentMethods.map(p => {
                  let IconComponent = Banknote;
                  if (p.icon === 'qr') IconComponent = QrCode;
                  if (p.icon === 'card') IconComponent = CreditCard;

                  const isSelected = payment === p.id;
                  const titleText = p.title || 'Payment Option';
                  const descText = p.description || '';

                  return (
                    <button
                      key={p.id}
                      onClick={() => setPayment(p.id)}
                      type="button"
                      style={{
                        width: '100%',
                        padding: '16px 20px',
                        borderRadius: '20px',
                        border: `2.5px solid ${isSelected ? 'var(--green-mid)' : '#f1f5f9'}`,
                        background: isSelected ? 'var(--green-tint)' : 'white',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '16px',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div
                          style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            background: isSelected ? 'var(--green-mid)' : '#f8fafc',
                            color: isSelected ? 'white' : '#64748b',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <IconComponent size={20} />
                        </div>
                        <div>
                          <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '15px', marginBottom: '2px' }}>
                            {titleText}
                          </div>
                          <div style={{ color: '#64748b', fontSize: '13px', fontWeight: 600 }}>
                            {descText}
                          </div>
                        </div>
                      </div>
                      
                      {/* Selection indicator */}
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          border: `2px solid ${isSelected ? 'var(--green-mid)' : '#cbd5e1'}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: isSelected ? 'var(--green-mid)' : 'transparent',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {isSelected && <Check size={12} color="white" strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {(payment === PAYMENT_MODE.STRIPE && missingStripeEnv && !stripePaymentConfigured) && (
                <div style={{ marginTop: '12px', padding: '10px 12px', borderRadius: '10px', background: 'rgba(212,175,55,0.08)', color: '#B8860B', border: '1px solid rgba(212,175,55,0.3)', fontSize: '12px', fontWeight: 700 }}>
                  Running in <strong>demo mode</strong> — no real payment will be captured. For Stripe, set <code>VITE_FIREBASE_PROJECT_ID</code> and deploy <code>createStripePendingOrder</code> + Cloud Run <code>createStripeCheckout</code> (URL is fixed in code).
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
                 <div style={{ fontSize: '12px', fontWeight: 700, color: '#B8860B', background: 'rgba(212,175,55,0.08)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.3)' }}>
                   Minimum SGD {(shopInfo.minOrderDelivery ?? 10).toFixed(2)} for delivery. Add items or choose pickup.
                 </div>
               )}
               {checkoutForeignTabLock && (
                 <div style={{ fontSize: '12px', fontWeight: 700, color: '#B8860B', background: 'rgba(212,175,55,0.08)', padding: '10px', borderRadius: '10px', border: '1px solid rgba(212,175,55,0.3)', marginTop: '10px' }}>
                   Another tab is using checkout. Complete or close it first — otherwise the same order could be placed twice.
                 </div>
               )}
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '22px', fontWeight: 950, color: 'var(--green-dark)', marginTop: '4px' }}><span>Total</span><span>${total.toFixed(2)}</span></div>
            </div>
            <button 
              onClick={handlePlaceOrder} 
              disabled={processing || checkoutForeignTabLock || (mode === 'delivery' && deliveryQuote.blocked)} 
              className="proceed-btn"
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


    </div>
  )
}

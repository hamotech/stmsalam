import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MapPin, MessageSquare, Package, Navigation, CheckCircle, User, Target, Wallet, Phone } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db, functions } from '../lib/firebase'
import { doc, onSnapshot, query, collection, where, updateDoc, serverTimestamp, setDoc, limit, addDoc, orderBy, getDoc } from 'firebase/firestore'
import { getToken } from 'firebase/messaging'
import { getMessagingInstance } from '../lib/firebase'
import { httpsCallable } from 'firebase/functions'
import { safeLog } from '../utils/runtimeSafety'
import { assertNoDirectOrderLifecycleWrite } from '../lib/orderLifecycleGuards'
import { advanceRiderLeg } from '../admin/services/dataService'
/** Align with unified `orders.status` + legacy rider UI strings. */
const STATUS_FILTER = ['assigned', 'picked_up', 'ready_for_pickup', 'out_for_delivery']
const TASK_STATUS_FILTER = new Set(STATUS_FILTER)

const toOrderStatus = (raw) => {
  let val = String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_')
  if (val === 'assigned') return 'ready_for_pickup'
  return val
}

const riderTaskStatusLabel = (raw) => {
  const st = toOrderStatus(raw)
  if (st === 'out_for_delivery') return 'Out for delivery'
  return 'Assigned / Ready for pickup'
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return 9999;
  const R = 6371e3; // metres
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;
  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; 
}

export default function DriverPanel() {
  const { user, loading, isAuthenticated } = useAuth() || {}
  const navigate = useNavigate()
  const riderId = user?.id || ''
  const isRiderAllowed = Boolean(isAuthenticated && user && (user.role === 'rider' || user.role === 'driver'))
  const [riderProfile, setRiderProfile] = useState({
    role: 'rider',
    status: 'offline',
    assignedOrders: [],
  })
  const [assignedOrders, setAssignedOrders] = useState([])
  const [availableOrders, setAvailableOrders] = useState([])
  const [rejectedOrders, setRejectedOrders] = useState(new Set())
  const [completedToday, setCompletedToday] = useState(0)
  const [busyOrderId, setBusyOrderId] = useState('')
  const [panelError, setPanelError] = useState('')
  const [chatOrderId, setChatOrderId] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const [driverLocation, setDriverLocation] = useState(null)
  const lastGpsPushRef = useRef(0)
  const lastGpsCoordsRef = useRef(null)
  const hasTrackableDelivery = assignedOrders.some((o) => {
    const st = toOrderStatus(o.status)
    return st === 'ready_for_pickup' || st === 'out_for_delivery'
  })

  // Fetch Available Orders
  useEffect(() => {
    if (!isRiderAllowed || !riderId || riderProfile.status === 'offline') return undefined
    const q = query(
      collection(db, 'orders'),
      where('status', 'in', ['placed', 'preparing', 'ready_for_pickup'])
    )
    const unsub = onSnapshot(q, (snap) => {
      const rows = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      // Filter out orders that already have a rider, or are rejected by this rider locally
      const available = rows.filter(r => 
        !r.assignedRiderId && 
        !rejectedOrders.has(r.id) &&
        (r.dispatchState?.offeredTo === riderId || r.dispatchState?.fallback === true)
      )
      setAvailableOrders(available)
    }, (e) => setPanelError('AvailableOrders: ' + (e?.message || 'Failed to subscribe available orders.')))
    return () => unsub()
  }, [isRiderAllowed, riderId, riderProfile.status, rejectedOrders])

  useEffect(() => {
    if (loading) return
    if (!isRiderAllowed) {
      navigate('/login?redirect=/rider', { replace: true })
    }
  }, [loading, isRiderAllowed, navigate])

  useEffect(() => {
    if (!isRiderAllowed || !riderId) return undefined
    const driverRef = doc(db, 'drivers', riderId)
    const unsub = onSnapshot(
      driverRef,
      async (snap) => {
        try {
          if (!snap.exists()) {
            const seed = { role: user?.role || 'driver', status: 'offline', assignedOrders: [] }
            console.log("Creating driver:", riderId);
            await setDoc(driverRef, seed, { merge: true })
            setRiderProfile(seed)
            if (import.meta.env.DEV) safeLog('Rider active status', seed.status)
            return
          }
          const data = snap.data() || {}
          // Legacy mapping: if DB still says active, treat as online.
          const statusRaw = data.status === 'active' ? 'online' : (data.status || 'offline')
          setRiderProfile({
            role: data.role || 'rider',
            status: statusRaw,
            assignedOrders: Array.isArray(data.assignedOrders) ? data.assignedOrders : [],
          })
          if (import.meta.env.DEV) safeLog('Rider active status', statusRaw)
        } catch (e) {
          setPanelError('Profile1: ' + (e?.message || 'Failed to load rider profile.'))
        }
      },
      (e) => setPanelError('Profile2: ' + (e?.message || 'Failed to subscribe rider profile.'))
    )
    return () => unsub()
  }, [isRiderAllowed, riderId])

  useEffect(() => {
    if (!isRiderAllowed || !chatOrderId) return undefined
    const q = query(collection(db, 'chats', chatOrderId, 'messages'), orderBy('createdAt', 'asc'))
    safeLog('chat initialized', { orderId: chatOrderId })
    const unsub = onSnapshot(
      q,
      (snap) => {
        setChatMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      },
      (e) => setPanelError(e?.message || 'Failed to subscribe rider chat.')
    )
    return () => unsub()
  }, [isRiderAllowed, chatOrderId])

  useEffect(() => {
    if (!isRiderAllowed || !riderId || riderProfile.status === 'offline') return undefined
    if (!navigator.geolocation) return undefined
    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const now = Date.now()
        if (now - lastGpsPushRef.current < 5000) return
        
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        const heading = pos.coords.heading || 0
        const speed = pos.coords.speed || 0
        
        if (lastGpsCoordsRef.current) {
          const dist = calculateDistance(lat, lng, lastGpsCoordsRef.current.lat, lastGpsCoordsRef.current.lng)
          if (dist < 10) return // Skip if moved less than 10 meters
        }

        lastGpsPushRef.current = now
        lastGpsCoordsRef.current = { lat, lng }
        setDriverLocation({ lat, lng })
        
        console.log("Updating driver GPS:", {
          uid: riderId,
          lat,
          lng
        });
        
        try {
          await setDoc(
            doc(db, 'drivers', riderId),
            {
              location: {
                lat,
                lng,
                heading,
                speed,
                updatedAt: serverTimestamp(),
              },
            },
            { merge: true }
          )
        } catch (e) {
          safeLog('[RiderGPS] update failed', e?.message || e)
        }
      },
      () => undefined,
      { enableHighAccuracy: true, maximumAge: 0, timeout: 10000 }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [isRiderAllowed, riderId, riderProfile.status])

  useEffect(() => {
    if (!isRiderAllowed || !riderId) return undefined
    console.log('[RIDER_AUTH_UID]', riderId);
    if (import.meta.env.DEV) safeLog('auth.uid:', riderId)
    const q = query(
      collection(db, 'orders'),
      where('assignedDriverId', '==', riderId)
    )
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rawRows = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        if (import.meta.env.DEV) safeLog('Fetched orders count', rawRows.length)
        const rows = rawRows.filter((row) => {
          console.log('[ORDER_ASSIGNMENT]', {
            assignedDriverId: row.assignedDriverId,
            assignedRiderName: row.assignedRiderName
          });
          console.log('[riderQuery]', { currentUid: riderId, assignedDriverId: row.assignedDriverId });
          const st = toOrderStatus(row.status)
          if (import.meta.env.DEV) safeLog('order.assignedDriverId:', row.assignedDriverId)
          return STATUS_FILTER.includes(st)
        })
        if (import.meta.env.DEV) safeLog('Matched rider orders', rows.length)
        rows.forEach(async (row) => {
          const patch = {}
          if (typeof row.assignedRiderId === 'undefined') patch.assignedRiderId = riderId
          if (!row.customerSnapshot) {
            patch.customerSnapshot = {
              name: row?.customer?.name || '',
              phone: row?.customer?.phone || '',
              address: row?.customer?.address || '',
            }
          }
          if (Object.keys(patch).length > 0) {
            assertNoDirectOrderLifecycleWrite(patch, 'DriverPanel.backfillOrderPatch')
            await setDoc(doc(db, 'orders', row.id), patch, { merge: true })
          }
        })
        setAssignedOrders(rows)
        if (import.meta.env.DEV) {
          rows.forEach((o) => safeLog('[Rider LIVE]', { orderId: o.id, status: toOrderStatus(o.status) }))
          if (rows[0]) {
            safeLog('rider data loaded', { orderId: rows[0].id })
          }
        }
      },
      (e) => setPanelError('AssignedOrders: ' + (e?.message || 'Failed to subscribe assigned deliveries.'))
    )
    return () => unsub()
  }, [isRiderAllowed, riderId])

  useEffect(() => {
    if (!isRiderAllowed || !riderId) return undefined
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const q = query(
      collection(db, 'orders'),
      where('assignedDriverId', '==', riderId),
      where('status', '==', 'delivered'),
      where('updatedAt', '>=', start),
      limit(200)
    )
    const unsub = onSnapshot(
      q,
      (snap) => {
        setCompletedToday(snap.size)
      },
      () => setCompletedToday(0)
    )
    return () => unsub()
  }, [isRiderAllowed, riderId])

  const activeDelivery = useMemo(() => {
    const priority = { out_for_delivery: 0, ready_for_pickup: 1, picked_up: 2 }
    const sorted = [...assignedOrders]
      .filter((o) => toOrderStatus(o.status) !== 'delivered' && toOrderStatus(o.status) !== 'assigned')
      .sort((a, b) => {
        const pa = priority[toOrderStatus(a.status)] ?? 99
        const pb = priority[toOrderStatus(b.status)] ?? 99
        return pa - pb
      })
    return sorted[0] || null
  }, [assignedOrders])

  const getDeliveryDistance = (delivery) => {
    if (delivery?.distance) return delivery.distance;
    if (delivery?.deliveryDistance) return delivery.deliveryDistance;
    
    const cLat = delivery?.customerLocation?.lat || delivery?.customerSnapshot?.location?.lat || delivery?.location?.lat;
    const cLng = delivery?.customerLocation?.lng || delivery?.customerSnapshot?.location?.lng || delivery?.location?.lng;
    
    if (driverLocation && cLat && cLng) {
      const dist = calculateDistance(driverLocation.lat, driverLocation.lng, cLat, cLng);
      return `${(dist / 1000).toFixed(1)} km`;
    }
    return 'N/A';
  };

  const earningsToday = completedToday * 7.5
  const dailyGoal = 20
  const goalPct = Math.min(100, Math.round((completedToday / dailyGoal) * 100))

  const setShiftStatus = async (next) => {
    if (!riderId) return
    const driverRef = doc(db, 'drivers', riderId)
    const snap = await getDoc(driverRef)
    
    let fcmToken = ''
    if (next === 'online') {
      try {
        const messaging = getMessagingInstance()
        if (messaging) {
          fcmToken = await getToken(messaging, { vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY || '' })
        }
      } catch (err) {
        safeLog('FCM Token error:', err)
      }
    }

    const payload = { role: user?.role || 'driver', status: next, fcmToken, shiftActive: next === 'online', lastActive: serverTimestamp() }
    if (!snap.exists()) {
      console.log("Updating driver:", riderId);
      await setDoc(driverRef, { ...payload, assignedOrders: [] }, { merge: true })
    } else {
      console.log("Updating driver:", riderId);
      await updateDoc(driverRef, payload)
    }
    if (import.meta.env.DEV) safeLog('Rider active status', next)
  }

  const startDelivery = async (orderId) => {
    if (!orderId) return
    setBusyOrderId(orderId)
    try {
      await advanceRiderLeg(orderId, 'pickup');
      setShiftStatus('busy')
    } catch(err) {
      safeLog('Error starting delivery', err);
      setPanelError(err.message || 'Error starting delivery');
    } finally {
      setBusyOrderId('')
    }
  }

  const markDelivered = async (orderId) => {
    if (!orderId) return
    setBusyOrderId(orderId)
    try {
      await advanceRiderLeg(orderId, 'deliver');
      setShiftStatus('online')
    } catch(err) {
      safeLog('Error marking delivered', err);
      setPanelError(err.message || 'Error marking delivered');
    } finally {
      setBusyOrderId('')
    }
  }

  const acceptOrder = async (order) => {
    if (!order || !order.id) return
    if (toOrderStatus(order.status) !== 'ready_for_pickup') {
      setPanelError("Rider accept only when order is ready_for_pickup");
      throw new Error("Rider accept only when order is ready_for_pickup");
    }
    setBusyOrderId(order.id)
    try {
      await advanceRiderLeg(order.id, 'accept');
      setShiftStatus('busy')
    } catch(err) {
      safeLog('Error accepting order', err);
      setPanelError(err.message || 'Error accepting order');
    } finally {
      setBusyOrderId('')
    }
  }

  const rejectOrder = async (orderId) => {
    setRejectedOrders(prev => new Set(prev).add(orderId))
  }

  const openMaps = (order) => {
    const address = encodeURIComponent(order?.customerSnapshot?.address || order?.customer?.address || order?.address || '')
    if (!address) return
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank')
  }

  const messageCustomer = (order) => {
    const phone = String(order?.customerSnapshot?.phone || order?.customer?.phone || '').replace(/\D/g, '')
    if (!phone) return
    const msg = encodeURIComponent(`Hi, this is your SMT rider for order #${order.id?.slice(-8)}.`)
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank')
  }

  const callCustomer = (order) => {
    const phone = String(order?.customerSnapshot?.phone || order?.customer?.phone || '').replace(/[^\d+]/g, '')
    if (!phone) return
    window.location.href = `tel:${phone}`
  }

  const sendChatMessage = async () => {
    const text = chatInput.trim()
    if (!chatOrderId || !text) return
    await addDoc(collection(db, 'chats', chatOrderId, 'messages'), {
      text,
      senderId: riderId,
      senderRole: 'rider',
      createdAt: serverTimestamp(),
    })
    safeLog('chat send', { orderId: chatOrderId, senderId: riderId })
    setChatInput('')
  }

  if (loading) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', fontWeight: 700, color: '#64748b' }}>Verifying rider session...</div>
  }
  if (!isRiderAllowed) {
    return <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', fontWeight: 700, color: '#64748b' }}>Redirecting to rider login...</div>
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', maxWidth: '560px', margin: '0 auto', paddingBottom: '24px' }}>
      <header style={{ background: 'var(--green-dark)', padding: '24px', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'var(--gold)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
              {(user?.name || 'R').slice(0, 1).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900 }}>{user?.name || 'Rider'}</div>
            <div style={{ fontSize: '12px', fontWeight: 700, color: riderProfile.status !== 'offline' ? '#22c55e' : '#cbd5e1' }}>
                {riderProfile.status === 'online' ? 'Online (Waiting)' : riderProfile.status === 'busy' ? 'Busy (Delivering)' : 'Offline'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShiftStatus(riderProfile.status === 'offline' ? 'online' : 'offline')}
            style={{ border: 'none', borderRadius: '12px', padding: '10px 14px', cursor: 'pointer', fontWeight: 900, background: riderProfile.status !== 'offline' ? '#fee2e2' : '#dcfce7', color: riderProfile.status !== 'offline' ? '#b91c1c' : '#166534', transition: 'all 0.2s' }}
          >
            {riderProfile.status !== 'offline' ? 'Go Offline' : 'Go Online'}
          </button>
        </div>
      </header>

      <main style={{ padding: '20px' }}>
        {panelError ? (
          <div style={{ marginBottom: '12px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '12px', padding: '10px 12px', fontWeight: 700, fontSize: '13px' }}>
            {panelError}
          </div>
        ) : null}
        {riderProfile.status === 'offline' ? (
          <section style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '20px', padding: '18px', marginBottom: '18px' }}>
            <h3 style={{ margin: 0, marginBottom: '8px', fontSize: '16px', fontWeight: 900, color: '#9a3412' }}>You are Offline</h3>
            <div style={{ color: '#7c2d12', fontWeight: 700, fontSize: '14px' }}>
              Your shift is inactive. Go Online to receive deliveries.
            </div>
          </section>
        ) : (
        <section style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '20px', padding: '18px', marginBottom: '18px' }}>
          <h3 style={{ margin: 0, marginBottom: '12px', fontSize: '16px', fontWeight: 900 }}>Active Delivery</h3>
          {activeDelivery ? (
            <>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700 }}>Order #{activeDelivery.id?.slice(-8)?.toUpperCase()}</div>
              <div style={{ marginTop: '8px', display: 'grid', gap: '6px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                <div>Distance: {getDeliveryDistance(activeDelivery)}</div>
                <div>Status: {riderTaskStatusLabel(activeDelivery.status)}</div>
                <div>Customer: {activeDelivery?.customerSnapshot?.name || activeDelivery?.customer?.name || activeDelivery?.customerName || 'N/A'}</div>
                <div>Phone: {activeDelivery?.customerSnapshot?.phone || activeDelivery?.customer?.phone || activeDelivery?.customerPhone || activeDelivery?.phone || 'N/A'}</div>
                <div>Address: {activeDelivery?.customerSnapshot?.address || activeDelivery?.customer?.address || activeDelivery?.deliveryAddress || activeDelivery?.address || 'N/A'}</div>
                <div>Items: {(activeDelivery?.items || []).map((i) => `${i.qty}x ${i.name}`).join(', ') || 'N/A'}</div>
              </div>
              <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
                <button onClick={() => openMaps(activeDelivery)} style={{ padding: '14px', borderRadius: '14px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}><Navigation size={18} /> Maps</button>
                <button onClick={() => messageCustomer(activeDelivery)} style={{ padding: '14px', borderRadius: '14px', border: '1px solid #cbd5e1', background: '#f0fdf4', color: '#166534', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}><MessageSquare size={18} /> WhatsApp</button>
                <button onClick={() => callCustomer(activeDelivery)} style={{ padding: '14px', borderRadius: '14px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}><Phone size={18} /> Call</button>
                <button onClick={() => setChatOrderId(activeDelivery.id)} style={{ padding: '14px', borderRadius: '14px', border: '1px solid #cbd5e1', background: '#f8fafc', fontWeight: 800, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}><MessageSquare size={18} /> Chat</button>
              </div>
              {toOrderStatus(activeDelivery.status) === 'ready_for_pickup' ? (
                <button
                  type="button"
                  disabled={busyOrderId === activeDelivery.id}
                  onClick={() => acceptOrder(activeDelivery)}
                  style={{ marginTop: '16px', width: '100%', padding: '18px', fontSize: '16px', borderRadius: '14px', border: 'none', background: '#013220', color: 'white', fontWeight: 900, cursor: busyOrderId === activeDelivery.id ? 'wait' : 'pointer', boxShadow: '0 4px 12px rgba(1,50,32,0.2)' }}
                >
                  {busyOrderId === activeDelivery.id ? 'Updating...' : 'Accept Assigned Delivery'}
                </button>
              ) : activeDelivery.rider?.legStatus !== 'PICKED_UP' ? (
                <button
                  type="button"
                  disabled={busyOrderId === activeDelivery.id}
                  onClick={() => startDelivery(activeDelivery.id)}
                  style={{ marginTop: '16px', width: '100%', padding: '18px', fontSize: '16px', borderRadius: '14px', border: 'none', background: '#0369a1', color: 'white', fontWeight: 900, cursor: busyOrderId === activeDelivery.id ? 'wait' : 'pointer', boxShadow: '0 4px 12px rgba(3,105,161,0.2)' }}
                >
                  {busyOrderId === activeDelivery.id ? 'Updating...' : 'Start Delivery (Live Track)'}
                </button>
              ) : (
                <button
                  type="button"
                  disabled={busyOrderId === activeDelivery.id}
                  onClick={() => markDelivered(activeDelivery.id)}
                  style={{ marginTop: '16px', width: '100%', padding: '18px', fontSize: '16px', borderRadius: '14px', border: 'none', background: '#013220', color: 'white', fontWeight: 900, cursor: busyOrderId === activeDelivery.id ? 'wait' : 'pointer', boxShadow: '0 4px 12px rgba(1,50,32,0.2)' }}
                >
                  {busyOrderId === activeDelivery.id ? 'Updating...' : 'Swipe: Mark Delivered'}
                </button>
              )}
            </>
          ) : (
            <div style={{ color: '#64748b', fontWeight: 700 }}>No active delivery assigned.</div>
          )}
        </section>
        )}

        {riderProfile.status === 'online' && !activeDelivery ? (
          <section style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '20px', padding: '16px', marginBottom: '18px' }}>
            <h3 style={{ margin: 0, marginBottom: '12px', fontSize: '16px', fontWeight: 900 }}>Available Orders</h3>
            <div style={{ display: 'grid', gap: '10px' }}>
              {availableOrders.length === 0 ? (
                <div style={{ color: '#64748b', fontWeight: 700 }}>No available orders nearby.</div>
              ) : availableOrders.map((order) => (
                <div key={order.id} style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px', background: '#f8fafc' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 900 }}>#{order.id?.slice(-8)?.toUpperCase()}</div>
                    <div style={{ fontSize: '13px', color: '#0369a1', fontWeight: 700 }}>{toOrderStatus(order.status)}</div>
                  </div>
                  <div style={{ marginTop: '6px', fontSize: '13px', color: '#334155', fontWeight: 600 }}>
                    {(order.customerSnapshot?.name || order.customer?.name || 'Customer')} · {(order.customerSnapshot?.address || order.customer?.address || order.address || 'No address')}
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                    <button 
                      disabled={busyOrderId === order.id || toOrderStatus(order.status) !== 'ready_for_pickup'} 
                      onClick={() => acceptOrder(order)} 
                      style={{ 
                        flex: 1, 
                        padding: '10px', 
                        borderRadius: '10px', 
                        border: 'none', 
                        background: toOrderStatus(order.status) === 'ready_for_pickup' ? '#013220' : '#cbd5e1', 
                        color: toOrderStatus(order.status) === 'ready_for_pickup' ? 'white' : '#64748b', 
                        fontWeight: 800, 
                        cursor: toOrderStatus(order.status) === 'ready_for_pickup' ? 'pointer' : 'not-allowed' 
                      }}>
                      {toOrderStatus(order.status) === 'ready_for_pickup' ? 'Accept Order' : 'Prep...'}
                    </button>
                    <button onClick={() => rejectOrder(order.id)} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #cbd5e1', background: 'white', color: '#64748b', fontWeight: 800, cursor: 'pointer' }}>
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <div style={{ background: '#000', color: '#0f0', padding: '10px', fontSize: '12px', textAlign: 'center', fontWeight: 'bold' }}>
          [TEMP DEBUG] Logged in Rider UID: {riderId}
        </div>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '18px' }}>
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Deliveries Today</div>
            <div style={{ fontSize: '22px', fontWeight: 900 }}>{completedToday}</div>
          </div>
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Earnings Today</div>
            <div style={{ fontSize: '22px', fontWeight: 900 }}>${earningsToday.toFixed(2)}</div>
          </div>
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '16px', padding: '12px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700 }}>Goal Progress</div>
            <div style={{ fontSize: '22px', fontWeight: 900 }}>{goalPct}%</div>
          </div>
        </section>

        {riderProfile.status !== 'offline' ? (
        <section style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '20px', padding: '16px' }}>
          <h3 style={{ margin: 0, marginBottom: '12px', fontSize: '16px', fontWeight: 900 }}>Assigned Deliveries</h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, background: '#e2e8f0', padding: '4px 8px', borderRadius: '8px' }}>assigned</span>
            <span style={{ fontSize: '11px', fontWeight: 800, background: '#dbeafe', padding: '4px 8px', borderRadius: '8px' }}>picked_up</span>
            <span style={{ fontSize: '11px', fontWeight: 800, background: 'rgba(212,175,55,0.12)', padding: '4px 8px', borderRadius: '8px' }}>out_for_delivery</span>
          </div>
          <div style={{ display: 'grid', gap: '10px' }}>
            {assignedOrders.filter((o) => TASK_STATUS_FILTER.has(toOrderStatus(o.status))).length === 0 ? (
              <div style={{ color: '#64748b', fontWeight: 700 }}>No assigned deliveries.</div>
            ) : assignedOrders
              .filter((order) => TASK_STATUS_FILTER.has(toOrderStatus(order.status)))
              .map((order) => (
              <div key={order.id} style={{ border: '1px solid #e2e8f0', borderRadius: '14px', padding: '12px' }}>
                <div style={{ fontWeight: 900 }}>#{order.id?.slice(-8)?.toUpperCase()}</div>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700, marginTop: '4px' }}>{toOrderStatus(order.status)}</div>
                <div style={{ marginTop: '6px', fontSize: '13px', color: '#334155', fontWeight: 600 }}>
                  {(order.customerSnapshot?.name || order.customer?.name || 'Customer')} · {(order.customerSnapshot?.address || order.customer?.address || order.address || 'No address')}
                </div>
                {toOrderStatus(order.status) === 'assigned' && (
                  <button 
                    disabled={busyOrderId === order.id} 
                    onClick={() => acceptOrder(order.id)} 
                    style={{ marginTop: '12px', width: '100%', padding: '10px', borderRadius: '10px', border: 'none', background: '#013220', color: 'white', fontWeight: 800, cursor: busyOrderId === order.id ? 'wait' : 'pointer' }}>
                    {busyOrderId === order.id ? 'Accepting...' : 'Accept Order'}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
        ) : null}
        {chatOrderId ? (
          <section style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '20px', padding: '16px', marginTop: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 900 }}>Rider Chat · #{chatOrderId.slice(-8).toUpperCase()}</h3>
              <button onClick={() => setChatOrderId('')} style={{ border: '1px solid #cbd5e1', background: 'white', borderRadius: '8px', padding: '6px 10px', fontWeight: 700, cursor: 'pointer' }}>Close</button>
            </div>
            <div style={{ maxHeight: '180px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '8px', marginBottom: '8px' }}>
              {chatMessages.length === 0 ? <div style={{ color: '#64748b', fontSize: '13px' }}>Start conversation</div> : chatMessages.map((m) => (
                <div key={m.id} style={{ fontSize: '13px', marginBottom: '6px' }}>
                  <strong>{m.senderRole || 'user'}:</strong> {m.text || ''}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Type message..." style={{ flex: 1, border: '1px solid #cbd5e1', borderRadius: '10px', padding: '10px' }} />
              <button onClick={sendChatMessage} style={{ border: 'none', background: '#013220', color: 'white', borderRadius: '10px', padding: '10px 14px', fontWeight: 800, cursor: 'pointer' }}>Send</button>
            </div>
          </section>
        ) : null}
      </main>
    </div>
  )
}

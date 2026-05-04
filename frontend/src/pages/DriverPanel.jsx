import React, { useEffect, useMemo, useRef, useState } from 'react'
import { MapPin, MessageSquare, Package, Navigation, CheckCircle, User, Target, Wallet, Phone } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from '../lib/firebase'
import { doc, onSnapshot, query, collection, where, updateDoc, serverTimestamp, setDoc, limit, addDoc, orderBy, getDoc } from 'firebase/firestore'
import { safeLog } from '../utils/runtimeSafety'

const STATUS_FILTER = ['assigned', 'picked_up']
const TASK_STATUS_FILTER = new Set(['assigned', 'picked_up'])

const toOrderStatus = (raw) =>
  String(raw || '')
    .trim()
    .toLowerCase()
    .replace(/[\s-]+/g, '_')

export default function DriverPanel() {
  const { user, loading, isAuthenticated } = useAuth() || {}
  const navigate = useNavigate()
  const riderId = user?.id || ''
  const isRiderAllowed = Boolean(isAuthenticated && user && user.role === 'rider')
  const [riderProfile, setRiderProfile] = useState({
    role: 'rider',
    status: 'offline',
    assignedOrders: [],
  })
  const [assignedOrders, setAssignedOrders] = useState([])
  const [completedToday, setCompletedToday] = useState(0)
  const [busyOrderId, setBusyOrderId] = useState('')
  const [panelError, setPanelError] = useState('')
  const [chatOrderId, setChatOrderId] = useState('')
  const [chatMessages, setChatMessages] = useState([])
  const [chatInput, setChatInput] = useState('')
  const lastGpsPushRef = useRef(0)
  const hasTrackableDelivery = assignedOrders.some((o) => {
    const st = toOrderStatus(o.status)
    return st === 'assigned' || st === 'picked_up'
  })

  useEffect(() => {
    if (loading) return
    if (!isRiderAllowed) {
      navigate('/login?redirect=/rider', { replace: true })
    }
  }, [loading, isRiderAllowed, navigate])

  useEffect(() => {
    if (!isRiderAllowed || !riderId) return undefined
    const riderRef = doc(db, 'riders', riderId)
    const unsub = onSnapshot(
      riderRef,
      async (snap) => {
        try {
          if (!snap.exists()) {
            const seed = { role: 'rider', status: 'offline', assignedOrders: [] }
            await setDoc(riderRef, seed, { merge: true })
            setRiderProfile(seed)
            if (import.meta.env.DEV) safeLog('Rider active status', seed.status)
            return
          }
          const data = snap.data() || {}
          setRiderProfile({
            role: data.role || 'rider',
            status: data.status === 'active' ? 'active' : 'offline',
            assignedOrders: Array.isArray(data.assignedOrders) ? data.assignedOrders : [],
          })
          if (import.meta.env.DEV) safeLog('Rider active status', data.status === 'active' ? 'active' : 'offline')
        } catch (e) {
          setPanelError(e?.message || 'Failed to load rider profile.')
        }
      },
      (e) => setPanelError(e?.message || 'Failed to subscribe rider profile.')
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
    if (!isRiderAllowed || !riderId || riderProfile.status !== 'active' || !hasTrackableDelivery) return undefined
    if (!navigator.geolocation) return undefined
    const watchId = navigator.geolocation.watchPosition(
      async (pos) => {
        const now = Date.now()
        if (now - lastGpsPushRef.current < 5000) return
        lastGpsPushRef.current = now
        try {
          await setDoc(
            doc(db, 'riders', riderId),
            {
              location: {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
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
  }, [isRiderAllowed, riderId, riderProfile.status, hasTrackableDelivery])

  useEffect(() => {
    if (!isRiderAllowed || !riderId) return undefined
    if (import.meta.env.DEV) safeLog('auth.uid:', riderId)
    const q = query(
      collection(db, 'orders'),
      where('riderId', '==', riderId)
    )
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rawRows = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
        if (import.meta.env.DEV) safeLog('Fetched orders count', rawRows.length)
        const rows = rawRows.filter((row) => {
          const st = toOrderStatus(row.status)
          if (import.meta.env.DEV) safeLog('order.riderId:', row.riderId)
          return STATUS_FILTER.includes(st)
        })
        if (import.meta.env.DEV) safeLog('Matched rider orders', rows.length)
        rows.forEach(async (row) => {
          const patch = {}
          if (typeof row.riderId === 'undefined') patch.riderId = riderId
          if (!row.customerSnapshot) {
            patch.customerSnapshot = {
              name: row?.customer?.name || '',
              phone: row?.customer?.phone || '',
              address: row?.customer?.address || '',
            }
          }
          if (Object.keys(patch).length > 0) {
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
      (e) => setPanelError(e?.message || 'Failed to subscribe assigned deliveries.')
    )
    return () => unsub()
  }, [isRiderAllowed, riderId])

  useEffect(() => {
    if (!isRiderAllowed || !riderId) return undefined
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    const q = query(
      collection(db, 'orders'),
      where('riderId', '==', riderId),
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
    const priority = { picked_up: 0, assigned: 1, ready: 2 }
    const sorted = [...assignedOrders]
      .filter((o) => toOrderStatus(o.status) !== 'delivered')
      .sort((a, b) => {
        const pa = priority[toOrderStatus(a.status)] ?? 99
        const pb = priority[toOrderStatus(b.status)] ?? 99
        return pa - pb
      })
    return sorted[0] || null
  }, [assignedOrders])

  const earningsToday = completedToday * 7.5
  const dailyGoal = 20
  const goalPct = Math.min(100, Math.round((completedToday / dailyGoal) * 100))

  const setShiftStatus = async (next) => {
    if (!riderId) return
    const riderRef = doc(db, 'riders', riderId)
    const snap = await getDoc(riderRef)
    if (!snap.exists()) {
      await setDoc(riderRef, { role: 'rider', status: next, assignedOrders: [] }, { merge: true })
    } else {
      await updateDoc(riderRef, { role: 'rider', status: next })
    }
    if (import.meta.env.DEV) safeLog('Rider active status', next)
  }

  const markDelivered = async (orderId) => {
    if (!orderId) return
    setBusyOrderId(orderId)
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: 'delivered',
        updatedAt: serverTimestamp(),
        'timestamps.deliveredAt': serverTimestamp(),
      })
    } finally {
      setBusyOrderId('')
    }
  }

  const openMaps = (order) => {
    const address = encodeURIComponent(order?.customer?.address || order?.address || '')
    if (!address) return
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank')
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
    <div style={{ background: 'var(--bg-body)', minHeight: '100vh', maxWidth: '560px', margin: '0 auto', paddingBottom: '24px' }}>
      <header style={{ background: 'var(--green-dark)', padding: '24px', color: 'white', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'var(--gold)', color: 'var(--green-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>
              {(user?.name || 'R').slice(0, 1).toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '18px', fontWeight: 900 }}>{user?.name || 'Rider'}</div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: riderProfile.status === 'active' ? '#22c55e' : '#cbd5e1' }}>
                {riderProfile.status === 'active' ? 'Active shift' : 'Inactive shift'}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShiftStatus(riderProfile.status === 'active' ? 'offline' : 'active')}
            style={{ border: 'none', borderRadius: '12px', padding: '10px 14px', cursor: 'pointer', fontWeight: 900, background: riderProfile.status === 'active' ? '#fee2e2' : '#dcfce7', color: riderProfile.status === 'active' ? '#b91c1c' : '#166534' }}
          >
            {riderProfile.status === 'active' ? 'Set Inactive' : 'Set Active'}
          </button>
        </div>
      </header>

      <main style={{ padding: '20px' }}>
        {panelError ? (
          <div style={{ marginBottom: '12px', background: '#fef2f2', color: '#b91c1c', border: '1px solid #fecaca', borderRadius: '12px', padding: '10px 12px', fontWeight: 700, fontSize: '13px' }}>
            {panelError}
          </div>
        ) : null}
        {riderProfile.status !== 'active' ? (
          <section style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '20px', padding: '18px', marginBottom: '18px' }}>
            <h3 style={{ margin: 0, marginBottom: '8px', fontSize: '16px', fontWeight: 900, color: '#9a3412' }}>Activate shift</h3>
            <div style={{ color: '#7c2d12', fontWeight: 700, fontSize: '14px' }}>
              Your shift is inactive. Set Active to view assigned deliveries.
            </div>
          </section>
        ) : (
        <section style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '20px', padding: '18px', marginBottom: '18px' }}>
          <h3 style={{ margin: 0, marginBottom: '12px', fontSize: '16px', fontWeight: 900 }}>Active Delivery</h3>
          {activeDelivery ? (
            <>
              <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 700 }}>Order #{activeDelivery.id?.slice(-8)?.toUpperCase()}</div>
              <div style={{ marginTop: '8px', display: 'grid', gap: '6px', fontSize: '14px', fontWeight: 700, color: '#0f172a' }}>
                <div>Distance: {activeDelivery.distanceKm ? `${activeDelivery.distanceKm} km` : (activeDelivery.distance || 'N/A')}</div>
                <div>Status: {toOrderStatus(activeDelivery.status) === 'picked_up' ? 'Picked Up' : 'Assigned'}</div>
                <div>Customer: {activeDelivery?.customerSnapshot?.name || activeDelivery?.customer?.name || 'N/A'}</div>
                <div>Phone: {activeDelivery?.customerSnapshot?.phone || activeDelivery?.customer?.phone || 'N/A'}</div>
                <div>Address: {activeDelivery?.customerSnapshot?.address || activeDelivery?.customer?.address || activeDelivery?.address || 'N/A'}</div>
                <div>Items: {(activeDelivery?.items || []).map((i) => `${i.qty}x ${i.name}`).join(', ') || 'N/A'}</div>
              </div>
              <div style={{ marginTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <button onClick={() => openMaps(activeDelivery)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 800, display: 'flex', justifyContent: 'center', gap: '8px' }}><Navigation size={16} /> Open Maps</button>
                <button onClick={() => messageCustomer(activeDelivery)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 800, display: 'flex', justifyContent: 'center', gap: '8px' }}><MessageSquare size={16} /> Message Customer</button>
                <button onClick={() => callCustomer(activeDelivery)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 800, display: 'flex', justifyContent: 'center', gap: '8px' }}><Phone size={16} /> Call Customer</button>
                <button onClick={() => setChatOrderId(activeDelivery.id)} style={{ padding: '12px', borderRadius: '12px', border: '1px solid #cbd5e1', background: 'white', fontWeight: 800, display: 'flex', justifyContent: 'center', gap: '8px' }}><MessageSquare size={16} /> Chat</button>
              </div>
              <button
                type="button"
                disabled={busyOrderId === activeDelivery.id}
                onClick={() => markDelivered(activeDelivery.id)}
                style={{ marginTop: '12px', width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#013220', color: 'white', fontWeight: 900, cursor: busyOrderId === activeDelivery.id ? 'wait' : 'pointer' }}
              >
                {busyOrderId === activeDelivery.id ? 'Updating...' : 'Mark Delivered'}
              </button>
            </>
          ) : (
            <div style={{ color: '#64748b', fontWeight: 700 }}>No active delivery assigned.</div>
          )}
        </section>
        )}

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

        {riderProfile.status === 'active' ? (
        <section style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '20px', padding: '16px' }}>
          <h3 style={{ margin: 0, marginBottom: '12px', fontSize: '16px', fontWeight: 900 }}>Assigned Deliveries</h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '11px', fontWeight: 800, background: '#e2e8f0', padding: '4px 8px', borderRadius: '8px' }}>assigned</span>
            <span style={{ fontSize: '11px', fontWeight: 800, background: '#dbeafe', padding: '4px 8px', borderRadius: '8px' }}>picked_up</span>
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

import { useEffect, useRef } from 'react'
import { subscribeOrders } from '../services/dataService'
import { printCustomerBill } from '../../utils/customerBillPrint'

function playNewOrderChime() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext
    if (!Ctx) return
    const ctx = new Ctx()
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.value = 880
    g.gain.value = 0.06
    o.connect(g)
    g.connect(ctx.destination)
    o.start()
    o.stop(ctx.currentTime + 0.14)
    setTimeout(() => ctx.close?.(), 300)
  } catch {
    /* ignore */
  }
}

function requestNotifyPermission() {
  if (typeof window === 'undefined' || !('Notification' in window)) return
  if (Notification.permission === 'default') {
    Notification.requestPermission().catch(() => {})
  }
}

function desktopNotify(title, body, tag) {
  playNewOrderChime()
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    try {
      const n = new Notification(title, {
        body,
        tag,
        requireInteraction: false,
      })
      n.onclick = () => {
        window.focus()
        n.close()
      }
    } catch {
      /* ignore */
    }
  }
}

/**
 * New PLACED order (any payment rail) → "New order received" + chime.
 * paymentStatus → PAID → "Payment confirmed" (Stripe / PayPal / QR when admin verifies).
 */
export default function AdminOrderNotifications() {
  const initialized = useRef(false)
  const prevPaymentStatusById = useRef(new Map())
  const paidAlerted = useRef(new Set())
  const placedAlerted = useRef(new Set())

  useEffect(() => {
    const t = setTimeout(requestNotifyPermission, 1200)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const unsub = subscribeOrders((orders) => {
      const list = Array.isArray(orders) ? orders : []

      if (!initialized.current) {
        initialized.current = true
        prevPaymentStatusById.current = new Map(
          list.filter((o) => o.id).map((o) => [o.id, o.paymentStatus])
        )
        return
      }

      const prev = prevPaymentStatusById.current

      for (const order of list) {
        if (!order.id) continue
        const oldStatus = prev.get(order.id)
        const isNew = !prev.has(order.id)
        const nowPaid = order.paymentStatus === 'PAID'
        const wasPaid = oldStatus === 'PAID'

        const total = parseFloat(order.total || 0)
        const body = `${order.id} · ${order.customer?.name || 'Customer'} · $${Number.isFinite(total) ? total.toFixed(2) : '0.00'} SGD`
        const short = order.id.length >= 8 ? order.id.slice(-8).toUpperCase() : order.id

        if (nowPaid && !wasPaid) {
          if (paidAlerted.current.has(order.id)) continue
          paidAlerted.current.add(order.id)
          desktopNotify('Payment confirmed', `#${short} · ${body}`, `paid-${order.id}`)
          const method = order.paymentMethod || ''
          if (method === 'stripe' || method === 'paypal') {
            printCustomerBill(order)
          }
          continue
        }

        if (isNew) {
          if (placedAlerted.current.has(order.id)) continue
          placedAlerted.current.add(order.id)
          desktopNotify('New order received', body, `placed-${order.id}`)
          const method = order.paymentMethod || ''
          if (method === 'cod' || method === 'qr') {
            printCustomerBill(order)
          }
        }
      }

      prevPaymentStatusById.current = new Map(
        list.filter((o) => o.id).map((o) => [o.id, o.paymentStatus])
      )
    })

    return () => {
      if (typeof unsub === 'function') unsub()
    }
  }, [])

  return null
}

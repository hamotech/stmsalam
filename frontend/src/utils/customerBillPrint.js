import { shopInfo } from '../data/menuData'

function esc(s) {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatMoney(v) {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n.toFixed(2) : '0.00'
}

function num(v) {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/[^0-9.-]/g, ''))
  return Number.isFinite(n) ? n : 0
}

/** Firestore Timestamp, ISO string, or number ms */
function toJsDate(val) {
  if (val == null) return null
  if (typeof val?.toDate === 'function') {
    try {
      const d = val.toDate()
      return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null
    } catch {
      return null
    }
  }
  if (typeof val === 'object' && typeof val.seconds === 'number') {
    const d = new Date(val.seconds * 1000)
    return !Number.isNaN(d.getTime()) ? d : null
  }
  const d = new Date(val)
  return !Number.isNaN(d.getTime()) ? d : null
}

function formatBillDate(order) {
  const d =
    toJsDate(order.createdAt) ||
    toJsDate(order.updatedAt) ||
    toJsDate(order.timestamps?.createdAt) ||
    new Date()
  return d.toLocaleString('en-SG', { hour12: true })
}

function sumLineItems(items) {
  if (!Array.isArray(items)) return 0
  return items.reduce((sum, i) => {
    const q = num(i.qty)
    const p = num(i.price)
    return sum + q * p
  }, 0)
}

function resolveCustomer(order) {
  const meta = order.metaData && typeof order.metaData === 'object' ? order.metaData : {}
  const metaCust = meta.customer && typeof meta.customer === 'object' ? meta.customer : {}
  const snap = order.customerSnapshot && typeof order.customerSnapshot === 'object' ? order.customerSnapshot : {}
  const direct = order.customer && typeof order.customer === 'object' ? order.customer : {}
  const c = { ...metaCust, ...snap, ...direct }
  return {
    name: (c.name && String(c.name).trim()) || '—',
    phone: (c.phone && String(c.phone).trim()) || '',
    address: (c.address && String(c.address).trim()) || '',
    notes: (c.notes && String(c.notes).trim()) || '',
  }
}

function resolveMode(order) {
  const meta = order.metaData && typeof order.metaData === 'object' ? order.metaData : {}
  const raw = order.mode ?? meta.mode ?? order.orderType ?? meta.orderType
  if (raw == null || raw === '') return '—'
  return String(raw)
}

function formatPayment(order) {
  const raw = order.paymentStatus ?? order.payment_status ?? order.payment ?? ''
  const s = String(raw).trim()
  if (!s) return '—'
  const low = s.toLowerCase()
  if (low === 'paid' || low === 'pa_id') return 'Paid'
  if (low === 'pending_verification') return 'Pending verification'
  if (low === 'pending') return 'Pending'
  return s.replace(/_/g, ' ')
}

function resolveBillTotals(order) {
  const items = Array.isArray(order.items) ? order.items : []
  const linesSum = sumLineItems(items)
  const meta = order.metaData && typeof order.metaData === 'object' ? order.metaData : {}

  let subtotal = num(meta.subtotal ?? order.subtotal)
  let delivery = num(meta.deliveryFee ?? order.deliveryFee)
  let total = num(order.totalAmount ?? order.total)

  if (subtotal <= 0) subtotal = linesSum
  if (total <= 0) total = subtotal + delivery
  if (total <= 0) total = linesSum
  if (delivery <= 0 && total > 0 && subtotal > 0 && Math.abs(total - subtotal) > 0.005) {
    delivery = Math.max(0, total - subtotal)
  }
  if (subtotal <= 0 && total > 0) subtotal = Math.max(0, total - delivery)

  return { subtotal, delivery, total }
}

/**
 * Printable HTML for kitchen / cashier (A4 or thermal via browser print).
 */
export function buildCustomerBillHtml(order) {
  const c = resolveCustomer(order)
  const items = Array.isArray(order.items) ? order.items : []
  const { subtotal, delivery, total } = resolveBillTotals(order)
  const rows = items
    .map(
      (i) => `
    <tr>
      <td style="padding:6px 0;border-bottom:1px solid #eee;">${esc(i.name)}</td>
      <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:center;">${esc(i.qty)}</td>
      <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right;">$${formatMoney(i.price)}</td>
      <td style="padding:6px 0;border-bottom:1px solid #eee;text-align:right;">$${formatMoney(num(i.price) * num(i.qty))}</td>
    </tr>`
    )
    .join('')

  const created = formatBillDate(order)
  const modeLabel = resolveMode(order)
  const paymentLabel = formatPayment(order)

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><title>Bill ${esc(order.id)}</title>
<style>
  body { font-family: system-ui, Segoe UI, sans-serif; max-width: 420px; margin: 24px auto; color: #111; }
  h1 { font-size: 1.25rem; margin: 0 0 4px; }
  .muted { color: #666; font-size: 12px; }
  table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
  th { text-align: left; font-size: 11px; text-transform: uppercase; color: #666; padding-bottom: 8px; }
  .tot { margin-top: 16px; font-size: 14px; }
  .tot strong { float: right; }
</style></head><body>
  <h1>${esc(shopInfo.name)}</h1>
  <div class="muted">${esc(shopInfo.outletName || '')}</div>
  <div class="muted">${esc(shopInfo.outletAddress || shopInfo.address || '')}</div>
  <hr style="margin:16px 0;border:none;border-top:1px solid #ddd;"/>
  <div><strong>Order</strong> ${esc(order.id)}</div>
  <div class="muted">${esc(created)}</div>
  <div style="margin-top:10px;"><strong>Customer</strong></div>
  <div>${esc(c.name || '—')}</div>
  <div class="muted">${esc(c.phone || '')}</div>
  ${c.address ? `<div class="muted">${esc(c.address)}</div>` : ''}
  <div style="margin-top:8px;"><strong>Mode</strong> ${esc(modeLabel)}</div>
  <div><strong>Payment</strong> ${esc(paymentLabel)}</div>
  ${order.notes || c.notes ? `<div style="margin-top:8px;"><strong>Notes</strong> ${esc(order.notes || c.notes)}</div>` : ''}
  <table>
    <thead><tr><th>Item</th><th style="text-align:center;">Qty</th><th style="text-align:right;">Unit</th><th style="text-align:right;">Amt</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="4" style="color:#999;">No line items</td></tr>'}</tbody>
  </table>
  <div class="tot">Subtotal <strong>$${formatMoney(subtotal)}</strong></div>
  <div class="tot">Delivery <strong>$${formatMoney(delivery)}</strong></div>
  <div class="tot" style="font-size:1.1rem;margin-top:8px;">Total <strong>$${formatMoney(total)}</strong></div>
  <p class="muted" style="margin-top:24px;text-align:center;">Thank you — STM Salam</p>
</body></html>`
}

/**
 * Opens print dialog for the given order (uses hidden iframe; works when not blocked as popup).
 */
export function printCustomerBill(order) {
  if (typeof window === 'undefined' || !order) return

  const html = buildCustomerBillHtml(order)
  const iframe = document.createElement('iframe')
  iframe.setAttribute('aria-hidden', 'true')
  Object.assign(iframe.style, {
    position: 'fixed',
    right: '0',
    bottom: '0',
    width: '0',
    height: '0',
    border: 'none',
    opacity: '0',
    pointerEvents: 'none',
  })
  document.body.appendChild(iframe)

  const win = iframe.contentWindow
  if (!win) {
    document.body.removeChild(iframe)
    return
  }

  const doc = win.document
  doc.open()
  doc.write(html)
  doc.close()

  const runPrint = () => {
    try {
      win.focus()
      win.print()
    } catch (e) {
      console.warn('[printCustomerBill]', e)
    } finally {
      setTimeout(() => {
        try {
          document.body.removeChild(iframe)
        } catch (_) { /* noop */ }
      }, 800)
    }
  }

  setTimeout(runPrint, 200)
}

import { shopInfo } from '@/src/config/shopInfo';

/** Loose order shape from Firestore (web checkout + Grab callable orders). */
export type OrderBillInput = {
  id?: string;
  status?: string;
  createdAt?: string | { toDate?: () => Date; seconds?: number };
  updatedAt?: string | { toDate?: () => Date; seconds?: number };
  timestamps?: { createdAt?: unknown };
  customer?: {
    name?: string;
    phone?: string;
    address?: string;
    notes?: string;
  };
  customerSnapshot?: OrderBillInput['customer'];
  metaData?: {
    customer?: OrderBillInput['customer'];
    subtotal?: string | number;
    deliveryFee?: string | number;
    mode?: string;
    orderType?: string;
  };
  items?: { name?: string; qty?: number; price?: number }[];
  subtotal?: string | number;
  deliveryFee?: string | number;
  total?: string | number;
  totalAmount?: string | number;
  mode?: string;
  orderType?: string;
  payment?: string;
  payment_status?: string;
  paymentStatus?: string;
  notes?: string;
};

function esc(s: unknown): string {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function num(v: unknown): number {
  const n = typeof v === 'number' ? v : parseFloat(String(v ?? '').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(n) ? n : 0;
}

function money(v: unknown): string {
  return num(v).toFixed(2);
}

function toJsDate(val: unknown): Date | null {
  if (val == null) return null;
  if (typeof val === 'object' && val !== null && 'toDate' in val && typeof (val as { toDate: () => Date }).toDate === 'function') {
    try {
      const d = (val as { toDate: () => Date }).toDate();
      return d instanceof Date && !Number.isNaN(d.getTime()) ? d : null;
    } catch {
      return null;
    }
  }
  if (typeof val === 'object' && val !== null && 'seconds' in val && typeof (val as { seconds: number }).seconds === 'number') {
    const d = new Date((val as { seconds: number }).seconds * 1000);
    return !Number.isNaN(d.getTime()) ? d : null;
  }
  const d = new Date(val as string | number);
  return !Number.isNaN(d.getTime()) ? d : null;
}

function formatDate(order: OrderBillInput): string {
  const d =
    toJsDate(order.createdAt) ||
    toJsDate(order.updatedAt) ||
    toJsDate(order.timestamps?.createdAt) ||
    new Date();
  return d.toLocaleString('en-SG', { hour12: true });
}

function resolveCustomer(order: OrderBillInput) {
  const meta = order.metaData?.customer ?? {};
  const snap = order.customerSnapshot ?? {};
  const direct = order.customer ?? {};
  const c = { ...meta, ...snap, ...direct };
  return {
    name: (c.name && String(c.name).trim()) || '—',
    phone: (c.phone && String(c.phone).trim()) || '',
    address: (c.address && String(c.address).trim()) || '',
    notes: (c.notes && String(c.notes).trim()) || '',
  };
}

function resolveMode(order: OrderBillInput): string {
  const raw = order.mode ?? order.metaData?.mode ?? order.orderType ?? order.metaData?.orderType;
  if (raw == null || raw === '') return '—';
  return String(raw);
}

function formatPayment(order: OrderBillInput): string {
  const raw = order.paymentStatus ?? order.payment_status ?? order.payment ?? '';
  const s = String(raw).trim();
  if (!s) return '—';
  const low = s.toLowerCase();
  if (low === 'paid') return 'Paid';
  if (low === 'pending_verification') return 'Pending verification';
  if (low === 'pending') return 'Pending';
  return s.replace(/_/g, ' ');
}

function sumLines(items: NonNullable<OrderBillInput['items']>): number {
  return items.reduce((sum, i) => sum + num(i.price) * num(i.qty), 0);
}

function resolveTotals(order: OrderBillInput): { subtotal: number; delivery: number; total: number } {
  const items = Array.isArray(order.items) ? order.items : [];
  const linesSum = sumLines(items);
  const meta = order.metaData ?? {};

  let subtotal = num(meta.subtotal ?? order.subtotal);
  let delivery = num(meta.deliveryFee ?? order.deliveryFee);
  let total = num(order.totalAmount ?? order.total);

  if (subtotal <= 0) subtotal = linesSum;
  if (total <= 0) total = subtotal + delivery;
  if (total <= 0) total = linesSum;
  if (delivery <= 0 && total > 0 && subtotal > 0 && Math.abs(total - subtotal) > 0.005) {
    delivery = Math.max(0, total - subtotal);
  }
  if (subtotal <= 0 && total > 0) subtotal = Math.max(0, total - delivery);

  return { subtotal, delivery, total };
}

/**
 * Printable HTML for PDF generation (expo-print). Mirrors web customer bill content.
 */
export function generateBillHTML(order: OrderBillInput): string {
  const c = resolveCustomer(order);
  const items = Array.isArray(order.items) ? order.items : [];
  const { subtotal, delivery, total } = resolveTotals(order);
  const rows = items
    .map(
      (i) => `
      <tr>
        <td>${esc(i.name)}</td>
        <td style="text-align:center">${esc(i.qty ?? 1)}</td>
        <td style="text-align:right">$${money(i.price)}</td>
        <td style="text-align:right">$${money(num(i.price) * num(i.qty))}</td>
      </tr>`
    )
    .join('');

  const pay = formatPayment(order);
  const notes = order.notes || c.notes || '';
  const modeLabel = resolveMode(order);

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width"/>
<title>Bill ${esc(order.id)}</title>
<style>
  * { box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 24px; color: #0f172a; background: #fff; }
  .logo-wrap { text-align: center; margin-bottom: 16px; }
  .logo { width: 72px; height: 72px; margin: 0 auto 8px; background: linear-gradient(135deg,#013220,#056a48); border-radius: 16px; display: flex; align-items: center; justify-content: center; color: #D4AF37; font-size: 28px; font-weight: 900; }
  .brand { font-size: 22px; font-weight: 900; color: #013220; letter-spacing: -0.5px; }
  .tag { color: #D4AF37; font-weight: 800; font-size: 12px; text-transform: uppercase; letter-spacing: 2px; margin-top: 4px; }
  .muted { color: #64748b; font-size: 12px; line-height: 1.5; }
  h2 { font-size: 14px; margin: 20px 0 8px; color: #013220; border-bottom: 2px solid #D4AF37; padding-bottom: 4px; }
  table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 8px; }
  th { text-align: left; font-size: 10px; text-transform: uppercase; color: #64748b; padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
  td { padding: 10px 0; border-bottom: 1px solid #f1f5f9; }
  .tot { display: flex; justify-content: space-between; margin-top: 10px; font-size: 14px; }
  .tot.grand { font-size: 18px; font-weight: 900; color: #013220; margin-top: 14px; padding-top: 12px; border-top: 2px solid #013220; }
  .footer { text-align: center; margin-top: 28px; font-size: 11px; color: #94a3b8; }
</style></head><body>
  <div class="logo-wrap">
    <div class="logo">STM</div>
    <div class="brand">${esc(shopInfo.name)}</div>
    <div class="tag">Teh Tarik &amp; Kebab</div>
  </div>
  <p class="muted" style="text-align:center">${esc(shopInfo.outletName)}<br/>${esc(shopInfo.outletAddress)}</p>
  <h2>Order</h2>
  <p><strong>${esc(order.id)}</strong></p>
  <p class="muted">${esc(formatDate(order))}</p>
  <h2>Customer</h2>
  <p><strong>${esc(c.name || '—')}</strong></p>
  <p class="muted">${esc(c.phone || '')}</p>
  ${c.address ? `<p class="muted">${esc(c.address)}</p>` : ''}
  <p><strong>Fulfilment</strong> ${esc(modeLabel)}</p>
  <p><strong>Payment</strong> ${esc(pay)}</p>
  ${notes ? `<p class="muted"><strong>Notes</strong> ${esc(notes)}</p>` : ''}
  <h2>Items</h2>
  <table>
    <thead><tr><th>Item</th><th style="text-align:center">Qty</th><th style="text-align:right">Unit</th><th style="text-align:right">Amount</th></tr></thead>
    <tbody>${rows || '<tr><td colspan="4" class="muted">No line items</td></tr>'}</tbody>
  </table>
  <div class="tot"><span>Subtotal</span><span>$${money(subtotal)}</span></div>
  <div class="tot"><span>Delivery fee</span><span>$${money(delivery)}</span></div>
  <div class="tot grand"><span>Total (SGD)</span><span>$${money(total)}</span></div>
  <p class="footer">Thank you — ${esc(shopInfo.name)}</p>
</body></html>`;
}

/**
 * Maps absolute URLs, custom-scheme links, or path+query strings → `AppNavIntent`.
 * Used for analytics / cold-start parsing alongside Expo Router’s own URL → route mapping.
 *
 * Returns `null` for public routes (same policy as `deriveNavIntentFromSegments` heads)
 * and for malformed or incomplete payment links.
 */

import * as Linking from 'expo-linking';
import type { AppNavIntent } from '@/src/navigation/appNavigation.types';

const PUBLIC_HEADS = new Set([
  'login',
  'register',
  'forgot-password',
  'reset-password',
  'modal',
  'index',
]);

function parsePaymentSource(raw: string | null): 'stripe' | 'qr' | 'cod' {
  const s = (raw ?? '').toLowerCase();
  if (s === 'qr' || s === 'cod' || s === 'stripe') return s;
  return 'stripe';
}

function spGet(sp: URLSearchParams, key: string): string {
  return (sp.get(key) ?? '').trim();
}

/**
 * @param input — full `https://…`, `stmmobile://…`, or `/path?a=1` style string
 */
export function deepLinkToIntent(input: string): AppNavIntent | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  let pathname = '';
  const sp = new URLSearchParams();

  if (/^https?:\/\//i.test(trimmed)) {
    try {
      const u = new URL(trimmed);
      pathname = u.pathname || '/';
      u.searchParams.forEach((v, k) => {
        if (v != null && v !== '') sp.set(k, v);
      });
    } catch {
      return null;
    }
  } else if (trimmed.startsWith('/')) {
    const qIndex = trimmed.indexOf('?');
    pathname = qIndex >= 0 ? trimmed.slice(0, qIndex) : trimmed;
    const queryPart = qIndex >= 0 ? trimmed.slice(qIndex + 1) : '';
    new URLSearchParams(queryPart).forEach((v, k) => {
      if (v !== '') sp.set(k, v);
    });
  } else {
    const parsed = Linking.parse(trimmed);
    const rawPath = parsed.path?.replace(/^\//, '') ?? '';
    pathname = rawPath ? `/${rawPath}` : '/';
    const qp = parsed.queryParams ?? {};
    for (const [k, v] of Object.entries(qp)) {
      if (v == null) continue;
      sp.set(k, Array.isArray(v) ? String(v[0] ?? '') : String(v));
    }
  }

  try {
    pathname = decodeURIComponent(pathname.replace(/\/+$/, '') || '/');
  } catch {
    return null;
  }

  if (pathname === '/' || pathname === '') return null;

  const parts = pathname.split('/').filter(Boolean);
  if (!parts.length) return null;

  const head = parts[0];
  if (!head || PUBLIC_HEADS.has(head)) return null;

  /** Expo Router omits `(tabs)` from web URLs — use `/home`, `/menu`, … */
  if (parts.length === 1) {
    const leaf = parts[0];
    if (leaf === 'home') return { kind: 'tabs' };
    if (leaf === 'menu') return { kind: 'tabsMenu' };
    if (leaf === 'cart') return { kind: 'tabs' };
    if (leaf === 'orders') return { kind: 'tabsOrders' };
    if (leaf === 'profile') return { kind: 'tabsProfile' };
  }

  if (head === '(tabs)') {
    const tab = parts[1];
    if (tab === 'orders') return { kind: 'tabsOrders' };
    if (tab === 'menu') return { kind: 'tabsMenu' };
    if (tab === 'profile') return { kind: 'tabsProfile' };
    if (tab === 'home' || tab === 'index') return { kind: 'tabs' };
    return { kind: 'tabs' };
  }

  if (head === 'admin') {
    const sub = parts[1];
    if (sub === 'login' || sub === 'forgot-password' || sub === 'generate-reset-link') {
      return null;
    }
    switch (sub) {
      case 'orders':
      case 'order-management':
        return { kind: 'adminOrders' };
      case 'kitchen':
        return { kind: 'adminKitchen' };
      case 'riders':
        return { kind: 'adminRiders' };
      case 'payments':
        return { kind: 'adminPayments' };
      case 'analytics':
        return { kind: 'adminAnalytics' };
      default:
        return { kind: 'admin' };
    }
  }

  if (head === 'checkout') return { kind: 'checkout' };
  if (head === 'support') return { kind: 'support' };

  if (head === 'menu' && parts[1]) {
    const cat = decodeURIComponent(parts[1]);
    const q = spGet(sp, 'q');
    return q ? { kind: 'tabsMenu', cat, q } : { kind: 'tabsMenu', cat };
  }

  if (head === 'order-tracking' && parts[1]) {
    return { kind: 'orderTracking', orderId: decodeURIComponent(parts[1]) };
  }
  if (head === 'grab-tracking' && parts[1]) {
    return { kind: 'grabTracking', orderId: decodeURIComponent(parts[1]) };
  }
  if (head === 'order' && parts[1]) {
    return { kind: 'orderDetail', orderId: decodeURIComponent(parts[1]) };
  }
  if (head === 'product' && parts[1]) {
    return { kind: 'product', productId: decodeURIComponent(parts[1]) };
  }
  if (head === 'tracking' && parts[1]) {
    return { kind: 'legacyOrderTracking', orderId: decodeURIComponent(parts[1]) };
  }

  if (head === 'grab-stripe-payment') {
    const orderId = spGet(sp, 'orderId') || spGet(sp, 'orderid');
    return { kind: 'grabStripePayment', orderId };
  }

  if (head === 'grab-payment-qr') {
    return {
      kind: 'grabPaymentQr',
      orderId: spGet(sp, 'orderId') || undefined,
      total: spGet(sp, 'total') || undefined,
    };
  }

  if (head === 'order-confirmation') {
    const orderId = spGet(sp, 'orderId');
    const etaIso = spGet(sp, 'etaIso');
    if (!orderId || !etaIso) return null;
    return { kind: 'orderConfirmation', orderId, etaIso };
  }

  if (head === 'payment') {
    const sub = parts[1];
    if (sub === 'checkout-resume') {
      const orderId = spGet(sp, 'orderId');
      const amount = spGet(sp, 'amount');
      const customerName = spGet(sp, 'customerName');
      if (!orderId || amount === '' || !customerName) return null;
      return { kind: 'checkoutResume', orderId, amount, customerName };
    }
    if (sub === 'failed') {
      const orderId = spGet(sp, 'orderId');
      const paymentIntentId = spGet(sp, 'paymentIntentId');
      const total = spGet(sp, 'total');
      const reason = spGet(sp, 'reason');
      if (!orderId || !paymentIntentId || !total) return null;
      return { kind: 'paymentFailed', orderId, paymentIntentId, total, reason: reason || 'unknown' };
    }
    if (sub === 'success') {
      const orderId = spGet(sp, 'orderId');
      const total = spGet(sp, 'total');
      if (!orderId || !total) return null;
      return {
        kind: 'paymentSuccess',
        orderId,
        total,
        source: parsePaymentSource(sp.get('source')),
      };
    }
    if (sub === 'scan-pay') {
      const orderId = spGet(sp, 'orderId');
      const amountRaw = spGet(sp, 'amount');
      const customerName = spGet(sp, 'customerName') || 'Customer';
      const amount = Number(amountRaw);
      if (!orderId || !Number.isFinite(amount)) return null;
      return { kind: 'paymentScanPay', orderId, amount, customerName };
    }
  }

  if (head === 'payment-method') return { kind: 'checkout' };
  if (head === 'profile') return { kind: 'tabsProfile' };

  return null;
}

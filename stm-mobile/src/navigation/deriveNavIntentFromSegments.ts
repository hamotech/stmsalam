/**
 * Maps Expo Router `useSegments()` output to an `AppNavIntent` for RBAC checks.
 * Returns `null` for public routes or routes we cannot classify without query params.
 */

import type { AppNavIntent } from '@/src/navigation/appNavigation.types';

function isTabsGroup(head: string | undefined): boolean {
  return head === '(tabs)';
}

/**
 * @param segments — from `useSegments()` (e.g. `['admin','orders']`, `['(tabs)','orders']`)
 */
const PUBLIC_ROOT_SEGMENTS = new Set([
  'login',
  'register',
  'forgot-password',
  'reset-password',
  'modal',
]);

export function deriveNavIntentFromSegments(segments: readonly string[]): AppNavIntent | null {
  if (!segments.length) return null;

  const head = segments[0];
  if (!head) return null;

  if (head === 'index') return null;
  if (PUBLIC_ROOT_SEGMENTS.has(head)) return null;

  if (isTabsGroup(head)) {
    const tab = segments[1];
    if (tab === 'orders') return { kind: 'tabsOrders' };
    if (tab === 'menu') return { kind: 'tabsMenu' };
    if (tab === 'profile') return { kind: 'tabsProfile' };
    return { kind: 'tabs' };
  }

  if (head === 'admin') {
    const sub = segments[1];
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

  if (head === 'menu' && segments[1]) {
    return { kind: 'tabsMenu', cat: String(segments[1]) };
  }

  if (head === 'order-tracking' && segments[1]) {
    return { kind: 'orderTracking', orderId: String(segments[1]) };
  }

  if (head === 'grab-tracking' && segments[1]) {
    return { kind: 'grabTracking', orderId: String(segments[1]) };
  }

  if (head === 'order' && segments[1]) {
    return { kind: 'orderDetail', orderId: String(segments[1]) };
  }

  if (head === 'product' && segments[1]) {
    return { kind: 'product', productId: String(segments[1]) };
  }

  if (head === 'tracking' && segments[1]) {
    return { kind: 'legacyOrderTracking', orderId: String(segments[1]) };
  }

  if (head === 'grab-stripe-payment') {
    return { kind: 'grabStripePayment', orderId: '' };
  }

  if (head === 'grab-payment-qr') {
    return { kind: 'grabPaymentQr' };
  }

  if (head === 'order-confirmation') {
    return { kind: 'orderConfirmation', orderId: '', etaIso: '' };
  }

  if (head === 'payment') {
    const sub = segments[1];
    if (sub === 'checkout-resume') {
      return { kind: 'checkoutResume', orderId: '', amount: '', customerName: '' };
    }
    if (sub === 'failed') {
      return { kind: 'paymentFailed', orderId: '', paymentIntentId: '', total: '', reason: '' };
    }
    if (sub === 'success') {
      return { kind: 'paymentSuccess', orderId: '', total: '', source: 'stripe' };
    }
    if (sub === 'scan-pay') {
      return { kind: 'paymentScanPay', orderId: '', amount: 0, customerName: '' };
    }
  }

  if (head === 'payment-method') {
    return { kind: 'checkout' };
  }

  if (head === 'profile') {
    return { kind: 'tabsProfile' };
  }

  return null;
}

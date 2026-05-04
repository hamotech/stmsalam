/**
 * Single registry: path builders, RBAC, and optional UI metadata.
 * For programmatic navigation prefer `hrefFromIntent` (object form for dynamic routes).
 * Use `pathFromIntent` only for serialised paths (logs, legacy string consumers).
 */

import type { Href } from 'expo-router';
import type { AppNavIntent, AppNavIntentKind } from '@/src/navigation/appNavigation.types';
import type { AppRole } from '@/src/auth/resolveAppRole';

const ORDER_TRACKING_PATHNAME = '/order-tracking/[orderId]' as const;

/** Canonical expo-router href for `/order-tracking/:orderId`. No string URLs for Router.push/replace. */
function hrefForOrderTracking(orderId: string): Href {
  const id = orderId.trim();
  if (!id) {
    return '/(tabs)';
  }
  return {
    pathname: ORDER_TRACKING_PATHNAME,
    params: { orderId: id },
  };
}

const ALL_ROLES: readonly AppRole[] = ['guest', 'customer', 'admin', 'kitchen'];
const SIGNED_IN: readonly AppRole[] = ['customer', 'admin', 'kitchen'];
/** Checkout, payments, account-specific flows */
const CUSTOMER_OPS: readonly AppRole[] = ['customer', 'admin', 'kitchen'];
const ADMIN_ONLY: readonly AppRole[] = ['admin'];
const ADMIN_OR_KITCHEN: readonly AppRole[] = ['admin', 'kitchen'];

export type NavIntentMeta = {
  title?: string;
  icon?: string;
};

/** Declarative permission row (see `INTENT_ALLOWED_ROLES` for the live matrix). */
export type NavPermission = {
  intentKind: AppNavIntentKind;
  allowedRoles: readonly AppRole[];
};

/**
 * Which roles may navigate to each intent kind.
 * Kitchen inherits customer routes where relevant; admin-only ops stay locked down.
 */
export const INTENT_ALLOWED_ROLES: Record<AppNavIntentKind, readonly AppRole[]> = {
  tabs: ALL_ROLES,
  tabsMenu: ALL_ROLES,
  tabsProfile: ALL_ROLES,
  tabsOrders: SIGNED_IN,
  checkout: CUSTOMER_OPS,
  checkoutResume: CUSTOMER_OPS,
  login: ALL_ROLES,
  register: ALL_ROLES,
  support: ALL_ROLES,
  admin: ADMIN_ONLY,
  adminOrders: ADMIN_ONLY,
  adminKitchen: ADMIN_OR_KITCHEN,
  adminRiders: ADMIN_ONLY,
  adminPayments: ADMIN_ONLY,
  adminAnalytics: ADMIN_ONLY,
  product: ALL_ROLES,
  orderTracking: ALL_ROLES,
  grabTracking: ALL_ROLES,
  orderDetail: SIGNED_IN,
  legacyOrderTracking: SIGNED_IN,
  grabStripePayment: CUSTOMER_OPS,
  grabPaymentQr: CUSTOMER_OPS,
  orderConfirmation: CUSTOMER_OPS,
  paymentFailed: CUSTOMER_OPS,
  paymentSuccess: CUSTOMER_OPS,
  paymentSuccessMinimal: CUSTOMER_OPS,
  paymentScanPay: CUSTOMER_OPS,
};

export const INTENT_METADATA: Partial<Record<AppNavIntentKind, NavIntentMeta>> = {
  tabs: { title: 'Home', icon: 'home' },
  tabsMenu: { title: 'Menu', icon: 'restaurant' },
  tabsProfile: { title: 'Profile', icon: 'person' },
  tabsOrders: { title: 'Orders', icon: 'receipt' },
  checkout: { title: 'Checkout', icon: 'cart' },
  login: { title: 'Sign in', icon: 'log-in' },
  register: { title: 'Register', icon: 'person-add' },
  support: { title: 'Support', icon: 'chatbubbles' },
  admin: { title: 'Admin', icon: 'shield' },
  adminOrders: { title: 'Orders', icon: 'document-text' },
  adminKitchen: { title: 'Kitchen', icon: 'flame' },
  adminRiders: { title: 'Riders', icon: 'bicycle' },
  adminPayments: { title: 'Payments', icon: 'card' },
  adminAnalytics: { title: 'Analytics', icon: 'stats-chart' },
};

function assertNever(x: never): never {
  throw new Error(`Unhandled AppNavIntent: ${JSON.stringify(x)}`);
}

/**
 * Build the expo-router `Href` for an intent.
 * Order tracking always uses `{ pathname, params }` — avoids silent no-ops on web for dynamic routes.
 */
export function hrefFromIntent(intent: AppNavIntent): Href {
  switch (intent.kind) {
    case 'orderTracking':
    case 'legacyOrderTracking':
      return hrefForOrderTracking(intent.orderId);
    default:
      return pathFromIntent(intent);
  }
}

/** Build a serialised path string (query strings for param routes). Not for `router.push` on dynamic segments. */
export function pathFromIntent(intent: AppNavIntent): string {
  switch (intent.kind) {
    case 'tabs':
      return '/(tabs)';
    case 'tabsMenu': {
      const q = new URLSearchParams();
      if (intent.cat) q.set('cat', intent.cat);
      if (intent.q) q.set('q', intent.q);
      const s = q.toString();
      return s ? `/(tabs)/menu?${s}` : '/(tabs)/menu';
    }
    case 'tabsProfile':
      return '/(tabs)/profile';
    case 'tabsOrders':
      return '/(tabs)/orders';
    case 'checkout':
      return '/checkout';
    case 'checkoutResume': {
      const q = new URLSearchParams({
        orderId: intent.orderId,
        amount: String(intent.amount),
        customerName: intent.customerName,
      });
      return `/payment/checkout-resume?${q.toString()}`;
    }
    case 'login':
      return '/login';
    case 'register':
      return '/register';
    case 'support':
      return '/support';
    case 'admin':
      return '/admin';
    case 'adminOrders':
      return '/admin/orders';
    case 'adminKitchen':
      return '/admin/kitchen';
    case 'adminRiders':
      return '/admin/riders';
    case 'adminPayments':
      return '/admin/payments';
    case 'adminAnalytics':
      return '/admin/analytics';
    case 'product':
      return `/product/${encodeURIComponent(intent.productId)}`;
    case 'orderTracking':
    case 'legacyOrderTracking': {
      const id = intent.orderId.trim();
      if (!id) {
        return '/(tabs)';
      }
      return `/order-tracking/${encodeURIComponent(id)}`;
    }
    case 'grabTracking':
      return `/grab-tracking/${encodeURIComponent(intent.orderId)}`;
    case 'orderDetail':
      return `/order/${encodeURIComponent(intent.orderId)}`;
    case 'grabStripePayment': {
      const q = new URLSearchParams({ orderId: intent.orderId });
      return `/grab-stripe-payment?${q.toString()}`;
    }
    case 'grabPaymentQr': {
      const q = new URLSearchParams();
      if (intent.orderId) q.set('orderId', intent.orderId);
      if (intent.total != null && intent.total !== '') q.set('total', intent.total);
      const s = q.toString();
      return s ? `/grab-payment-qr?${s}` : '/grab-payment-qr';
    }
    case 'orderConfirmation': {
      const q = new URLSearchParams({
        orderId: intent.orderId,
        etaIso: intent.etaIso,
      });
      return `/order-confirmation?${q.toString()}`;
    }
    case 'paymentFailed': {
      const q = new URLSearchParams({
        orderId: intent.orderId,
        paymentIntentId: intent.paymentIntentId,
        total: intent.total,
        reason: intent.reason,
      });
      return `/payment/failed?${q.toString()}`;
    }
    case 'paymentSuccess': {
      const q = new URLSearchParams({
        orderId: intent.orderId,
        total: intent.total,
        source: intent.source,
      });
      return `/payment/success?${q.toString()}`;
    }
    case 'paymentSuccessMinimal': {
      const q = new URLSearchParams({ orderId: intent.orderId });
      if (intent.source) {
        q.set('source', intent.source);
      }
      return `/payment/success?${q.toString()}`;
    }
    case 'paymentScanPay': {
      const q = new URLSearchParams({
        orderId: intent.orderId.trim(),
        amount: String(intent.amount),
        customerName: intent.customerName.trim() || 'Customer',
      });
      return `/payment/scan-pay?${q.toString()}`;
    }
    default:
      return assertNever(intent);
  }
}

export function canNavigate(role: AppRole, intent: AppNavIntent): boolean {
  return INTENT_ALLOWED_ROLES[intent.kind].includes(role);
}

/** Safe landing when RBAC denies navigation. */
export function fallbackIntentForRole(role: AppRole): AppNavIntent {
  switch (role) {
    case 'guest':
      return { kind: 'login' };
    case 'customer':
    case 'kitchen':
      return { kind: 'tabs' };
    case 'admin':
      return { kind: 'admin' };
    default:
      return { kind: 'tabs' };
  }
}

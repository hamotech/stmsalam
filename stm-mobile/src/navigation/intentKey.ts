/**
 * Stable, deterministic string identity for `AppNavIntent` values.
 * Used for navigation dedupe — avoids JSON.stringify ordering / shape drift.
 */

import type { AppNavIntent } from '@/src/navigation/appNavigation.types';

function seg(v: string | number | undefined | null): string {
  return encodeURIComponent(v == null ? '' : String(v));
}

function assertNever(_x: never): never {
  throw new Error(`intentKey: unhandled intent shape (update intentKey.ts when AppNavIntent changes)`);
}

/**
 * Canonical key for an intent. Same logical target → same key across app versions
 * as long as this mapping is updated when `AppNavIntent` changes.
 */
export function intentKey(intent: AppNavIntent): string {
  switch (intent.kind) {
    case 'tabs':
      return 'tabs';
    case 'tabsMenu':
      return `tabsMenu|${seg(intent.cat)}|${seg(intent.q)}`;
    case 'tabsProfile':
      return 'tabsProfile';
    case 'tabsOrders':
      return 'tabsOrders';
    case 'checkout':
      return 'checkout';
    case 'checkoutResume':
      return `checkoutResume|${seg(intent.orderId)}|${seg(intent.amount)}|${seg(intent.customerName)}`;
    case 'login':
      return 'login';
    case 'register':
      return 'register';
    case 'support':
      return 'support';
    case 'admin':
      return 'admin';
    case 'adminOrders':
      return 'adminOrders';
    case 'adminKitchen':
      return 'adminKitchen';
    case 'adminRiders':
      return 'adminRiders';
    case 'adminPayments':
      return 'adminPayments';
    case 'adminAnalytics':
      return 'adminAnalytics';
    case 'product':
      return `product|${seg(intent.productId)}`;
    case 'orderTracking':
      return `orderTracking|${seg(intent.orderId)}`;
    case 'grabTracking':
      return `grabTracking|${seg(intent.orderId)}`;
    case 'orderDetail':
      return `orderDetail|${seg(intent.orderId)}`;
    case 'legacyOrderTracking':
      return `legacyOrderTracking|${seg(intent.orderId)}`;
    case 'grabStripePayment':
      return `grabStripePayment|${seg(intent.orderId)}`;
    case 'grabPaymentQr':
      return `grabPaymentQr|${seg(intent.orderId)}|${seg(intent.total)}`;
    case 'orderConfirmation':
      return `orderConfirmation|${seg(intent.orderId)}|${seg(intent.etaIso)}`;
    case 'paymentFailed':
      return `paymentFailed|${seg(intent.orderId)}|${seg(intent.paymentIntentId)}|${seg(intent.total)}|${seg(intent.reason)}`;
    case 'paymentSuccess':
      return `paymentSuccess|${seg(intent.orderId)}|${seg(intent.total)}|${seg(intent.source)}`;
    case 'paymentSuccessMinimal':
      return `paymentSuccessMinimal|${seg(intent.orderId)}|${seg(intent.source)}`;
    case 'paymentScanPay':
      return `paymentScanPay|${seg(intent.orderId)}|${seg(intent.amount)}|${seg(intent.customerName)}`;
    default:
      assertNever(intent);
  }
}

/**
 * Discriminated union of every navigation target in STM.
 * Paths and access control live in `appNavigationRegistry.ts`.
 */

export type AppNavIntent =
  | { kind: 'tabs' }
  | { kind: 'tabsMenu'; cat?: string; q?: string }
  | { kind: 'tabsProfile' }
  | { kind: 'tabsOrders' }
  | { kind: 'checkout' }
  | {
      kind: 'checkoutResume';
      orderId: string;
      amount: string | number;
      customerName: string;
    }
  | { kind: 'login' }
  | { kind: 'register' }
  | { kind: 'support' }
  | { kind: 'admin' }
  | { kind: 'adminOrders' }
  | { kind: 'adminKitchen' }
  | { kind: 'adminRiders' }
  | { kind: 'adminPayments' }
  | { kind: 'adminAnalytics' }
  | { kind: 'product'; productId: string }
  | { kind: 'orderTracking'; orderId: string }
  | { kind: 'grabTracking'; orderId: string }
  | { kind: 'orderDetail'; orderId: string }
  | { kind: 'legacyOrderTracking'; orderId: string }
  | { kind: 'grabStripePayment'; orderId: string }
  | { kind: 'grabPaymentQr'; orderId?: string; total?: string }
  | { kind: 'orderConfirmation'; orderId: string; etaIso: string }
  | {
      kind: 'paymentFailed';
      orderId: string;
      paymentIntentId: string;
      total: string;
      reason: string;
    }
  | { kind: 'paymentSuccess'; orderId: string; total: string; source: 'stripe' | 'qr' | 'cod' }
  | { kind: 'paymentSuccessMinimal'; orderId: string; source?: 'stripe' | 'qr' }
  | { kind: 'paymentScanPay'; orderId: string; amount: number; customerName: string };

export type AppNavIntentKind = AppNavIntent['kind'];

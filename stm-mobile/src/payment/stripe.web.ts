/**
 * Web fallback — @stripe/stripe-react-native is native-only (iOS/Android).
 * Metro picks this file on web so the web bundle never resolves the native
 * Stripe package. For real web card payments, integrate Stripe.js separately.
 */

const WEB_MESSAGE =
  'Card payments via Stripe Payment Sheet run on iOS/Android only. On web, use PayPal or open the app on your phone.';

export async function initPaymentSheet(
  _orderId: string,
  _amount: number
): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: WEB_MESSAGE };
}

export async function presentPaymentSheet(): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: WEB_MESSAGE };
}

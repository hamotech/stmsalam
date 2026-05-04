/**
 * Web: `@stripe/stripe-react-native` is native-only. Use PayPal on web or the mobile app for cards.
 */

export async function initPaymentSheet(
  _orderId: string,
  _amount: number
): Promise<{ ok: boolean; paymentIntentId?: string; error?: string }> {
  return {
    ok: false,
    error:
      'Card checkout uses the in-app payment sheet on iOS/Android. On the web, use PayPal, or open this app on a phone to pay with a card.',
  };
}

export async function presentPaymentSheet(): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: 'Payment Sheet is not available in the web build.' };
}

export async function verifyStripePaymentOnServer(
  _orderId: string,
  _paymentIntentId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  return { ok: false, error: 'Payment verification runs in the iOS/Android app only.' };
}

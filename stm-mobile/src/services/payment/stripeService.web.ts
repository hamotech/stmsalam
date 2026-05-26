/**
 * Web: `@stripe/stripe-react-native` is native-only. Card pay uses Stripe Hosted Checkout
 * (`stripeHostedCheckout.ts`) — this stub remains for any legacy PaymentSheet imports.
 */

export async function initPaymentSheet(
  _orderId: string,
  _amount: number
): Promise<{ ok: boolean; paymentIntentId?: string; error?: string }> {
  return {
    ok: false,
    error:
      'Use Stripe Hosted Checkout (Pay online) — Payment Sheet is only for optional native-only integrations.',
  };
}

export async function presentPaymentSheet(): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: 'Payment Sheet is not available in the web build.' };
}

export async function verifyStripePaymentOnServer(
  _orderId: string,
  _paymentIntentId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  return {
    ok: false,
    error:
      'Stripe Hosted Checkout confirms payment via webhook. Use “Check payment status” on the failed screen, or open Pay online again.',
  };
}

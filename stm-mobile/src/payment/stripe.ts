/**
 * Shared fallback (TypeScript resolution target).
 *
 * Metro prefers `./stripe.native.ts` on iOS/Android and `./stripe.web.ts` on web,
 * so this file is never bundled at runtime. It exists purely so TypeScript and
 * any non-platform-aware tooling can resolve `./stripe` without pulling in the
 * native-only Stripe SDK. Signatures must stay in sync with the platform files.
 */

const UNAVAILABLE =
  'Use Stripe Hosted Checkout via `@/src/services/payment/stripeHostedCheckout` — Payment Sheet stubs only.';

export async function initPaymentSheet(
  _orderId: string,
  _amount: number
): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: UNAVAILABLE };
}

export async function presentPaymentSheet(): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: UNAVAILABLE };
}

export async function verifyStripePaymentOnServer(
  _orderId: string,
  _paymentIntentId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  return { ok: false, error: UNAVAILABLE };
}

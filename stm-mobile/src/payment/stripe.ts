/**
 * Shared fallback (TypeScript resolution target).
 *
 * Metro prefers `./stripe.native.ts` on iOS/Android and `./stripe.web.ts` on web,
 * so this file is never bundled at runtime. It exists purely so TypeScript and
 * any non-platform-aware tooling can resolve `./stripe` without pulling in the
 * native-only Stripe SDK. Signatures must stay in sync with the platform files.
 */

const UNAVAILABLE =
  'Stripe payments are only available on iOS and Android. Use PayPal on web, or open the mobile app.';

export async function initPaymentSheet(
  _orderId: string,
  _amount: number
): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: UNAVAILABLE };
}

export async function presentPaymentSheet(): Promise<{ ok: boolean; error?: string }> {
  return { ok: false, error: UNAVAILABLE };
}

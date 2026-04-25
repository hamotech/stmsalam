/**
 * Platform-neutral entry for Stripe payments.
 * Consumers import from `@/src/payment` only — never from `./stripe.native`
 * or the old `src/services/payment/stripeService` paths.
 *
 * Metro resolves `./stripe` to:
 *   - stripe.web.ts   on web
 *   - stripe.native.ts on iOS/Android
 *   - stripe.ts       as the TypeScript fallback
 */

export { initPaymentSheet, presentPaymentSheet } from './stripe';

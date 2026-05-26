/**
 * Native: Stripe **Hosted Checkout** only (`stripeHostedCheckout.ts`).
 * `@stripe/stripe-react-native` Payment Sheet is not used — same architecture as web.
 */
export {
  initPaymentSheet,
  presentPaymentSheet,
  verifyStripePaymentOnServer,
} from './stripeService.web';

/**
 * Re-export for TypeScript. Metro prefers `stripeService.web` / `stripeService.native` over
 * this file for bundling, so the web build never includes `@stripe/stripe-react-native`.
 */
export {
  initPaymentSheet,
  presentPaymentSheet,
  verifyStripePaymentOnServer,
} from './stripeService.web';

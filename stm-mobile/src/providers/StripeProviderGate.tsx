/**
 * Metro picks `.native` / `.web` at bundle time so web never loads `@stripe/stripe-react-native`.
 * Default export for TypeScript follows the same pattern as `stripeService.ts`.
 */
export { default } from './StripeProviderGate.web';

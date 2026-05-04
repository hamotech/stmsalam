/**
 * Web stub for `@stripe/stripe-react-native` (native-only).
 * Metro maps the real package to this file when platform === 'web'.
 */
const React = require('react');

const PassThrough = ({ children }) => children;
const NullView = () => null;

const noop = () => {};
const noopAsync = async () => undefined;

const stub = {
  StripeProvider: PassThrough,
  StripeContainer: PassThrough,
  CardField: NullView,
  CardForm: NullView,
  AuBECSDebitForm: NullView,
  AddToWalletButton: NullView,
  AddressSheet: NullView,
  PlatformPayButton: NullView,
  initStripe: noop,
  useStripe: () => ({
    retrievePaymentIntent: noopAsync,
    retrieveSetupIntent: noopAsync,
    isPlatformPaySupported: noopAsync,
    createPaymentMethod: noopAsync,
    confirmPayment: noopAsync,
    confirmSetupIntent: noopAsync,
    handleNextAction: noopAsync,
    handleURLCallback: async () => false,
    presentFinancialConnectionsSheet: noopAsync,
    collectBankAccount: noopAsync,
    canAddCardToWallet: noopAsync,
    openApplePaySetup: noopAsync,
    dangerouslyUpdateCardBrand: noop,
  }),
  usePaymentSheet: () => ({
    initPaymentSheet: noopAsync,
    presentPaymentSheet: noopAsync,
    resetPaymentSheetCustomer: noopAsync,
    confirmPaymentSheetPayment: noopAsync,
  }),
  useConfirmPayment: () => ({ confirmPayment: noopAsync, loading: false }),
  useConfirmSetupIntent: () => ({ confirmSetupIntent: noopAsync, loading: false }),
  usePlatformPay: () => ({
    isPlatformPaySupported: noopAsync,
    confirmPlatformPayPayment: noopAsync,
    confirmPlatformPaySetupIntent: noopAsync,
    updatePlatformPaySheet: noopAsync,
    dismissPlatformPay: noopAsync,
  }),
  useFinancialConnectionsSheet: () => ({ present: noopAsync, loading: false }),
};

module.exports = new Proxy(stub, {
  get(target, prop) {
    if (prop === '__esModule') return true;
    if (prop in target) return target[prop];
    if (typeof prop === 'string' && prop.startsWith('use')) {
      return () => ({});
    }
    return NullView;
  },
});

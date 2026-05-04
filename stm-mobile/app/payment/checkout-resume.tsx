/**
 * Payment-only resume (`?orderId` + `amount` + `customerName`) — **`CheckoutScreen` lives only here**.
 * Isolated from `/checkout` so COD → `/order-tracking` never shares a conditional subtree with this flow.
 */

export { default } from '@/src/screens/checkout/CheckoutScreen';

/**
 * app/tracking/[orderId].tsx
 *
 * Dynamic route: /tracking/:orderId
 * Renders the TrackingScreen with live Firestore onSnapshot.
 *
 * Navigated to from:
 *  - HomeScreen (search bar)
 *  - OrdersScreen (OrderCard "Track Order" button)
 */

import TrackingScreen from '@/src/screens/TrackingScreen';
export default TrackingScreen;

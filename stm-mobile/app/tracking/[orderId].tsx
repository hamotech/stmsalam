/**
 * app/tracking/[orderId].tsx — legacy deep link path `/tracking/:orderId`.
 *
 * In-app navigation after checkout should use `/order-tracking/[orderId]` only (`replaceToOrderTrackingScreen`).
 * This route remains for external/bookmark URLs and older links (TrackingScreen).
 */

import TrackingScreen from '@/src/screens/TrackingScreen';
export default TrackingScreen;

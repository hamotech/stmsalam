/**
 * Enterprise Push Notification Architecture Stub
 * Handles triggering FCM payloads based on FSM lifecycle events.
 */

async function sendPushNotification(admin, tokens, payload) {
  if (!tokens || tokens.length === 0) return;
  try {
    const response = await admin.messaging().sendMulticast({
      tokens,
      notification: payload.notification,
      data: payload.data || {},
    });
    console.log(`[FCM] Successfully sent ${response.successCount} messages, failed ${response.failureCount}`);
  } catch (error) {
    console.error('[FCM] Error sending push notification:', error);
  }
}

module.exports = {
  notifyOrderLifecycle: async (admin, orderId, from, to, context) => {
    // Determine audience based on lifecycle change
    if (to === 'preparing') {
      console.log(`[FCM_STUB] Notify customer: Order ${orderId} accepted and preparing.`);
      console.log(`[FCM_STUB] Notify kitchen: New order ${orderId} needs preparation.`);
    } else if (to === 'ready_for_pickup') {
      console.log(`[FCM_STUB] Notify customer: Order ${orderId} is ready for pickup.`);
    } else if (to === 'out_for_delivery') {
      console.log(`[FCM_STUB] Notify customer: Order ${orderId} is out for delivery!`);
    } else if (to === 'delivered') {
      console.log(`[FCM_STUB] Notify customer: Order ${orderId} has been delivered. Enjoy!`);
    }

    // In a full implementation, you would fetch `users/{userId}/fcmTokens` here.
  },
  
  notifyRiderAssignment: async (admin, orderId, assignedRiderId) => {
    console.log(`[FCM_STUB] Notify rider ${assignedRiderId}: You have been assigned to order ${orderId}`);
    // Fetch `users/{assignedRiderId}/fcmTokens` and send payload
  }
};

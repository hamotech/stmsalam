const { onDocumentUpdated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { log, error } = require('./lib/logger.cjs');

exports.sendOrderNotifications = onDocumentUpdated(
  { document: 'orders/{orderId}' },
  async (event) => {
    const before = event.data?.before?.data() || {};
    const after = event.data?.after?.data() || {};
    const orderId = event.params.orderId;

    if (!after || !before) return;

    try {
      // 1. Order Assigned to Driver
      if (after.assignedRiderId && after.assignedRiderId !== before.assignedRiderId) {
        await notifyDriver(after.assignedRiderId, {
          title: 'New Order Assigned',
          body: `You have been assigned order #${orderId.slice(-5)}`,
          data: { orderId, type: 'ASSIGNED' }
        });
      }

      // 2. Driver Accepts Order (status goes to out_for_delivery)
      if (after.status === 'out_for_delivery' && before.status !== 'out_for_delivery') {
        if (after.userId) {
          await notifyCustomer(after.userId, {
            title: 'Order is on the way!',
            body: `Your order #${orderId.slice(-5)} has been picked up and is on its way.`,
            data: { orderId, type: 'OUT_FOR_DELIVERY' }
          });
        }
      }

      // 3. Order Delivered
      if (after.status === 'delivered' && before.status !== 'delivered') {
        if (after.userId) {
          await notifyCustomer(after.userId, {
            title: 'Order Delivered',
            body: `Your order #${orderId.slice(-5)} has been delivered. Enjoy your meal!`,
            data: { orderId, type: 'DELIVERED' }
          });
        }
      }
    } catch (err) {
      error({ service: 'notifications', event: 'error', error: err, payload: { orderId } });
      console.error('Notification error:', err);
    }
  }
);

async function notifyDriver(driverId, payload) {
  const db = admin.firestore();
  const driverDoc = await db.collection('drivers').doc(driverId).get();
  
  if (driverDoc.exists) {
    const data = driverDoc.data();
    if (data.fcmToken) {
      await admin.messaging().send({
        token: data.fcmToken,
        notification: { title: payload.title, body: payload.body },
        data: payload.data
      });
      console.log(`Notification sent to driver ${driverId}`);
    }
  }
}

async function notifyCustomer(userId, payload) {
  const db = admin.firestore();
  const tokensSnap = await db.collection('customer_push_tokens').doc(userId).get();
  
  if (tokensSnap.exists) {
    const data = tokensSnap.data();
    if (data.fcmToken) {
      await admin.messaging().send({
        token: data.fcmToken,
        notification: { title: payload.title, body: payload.body },
        data: payload.data
      });
      console.log(`Notification sent to customer ${userId}`);
    }
  }
}

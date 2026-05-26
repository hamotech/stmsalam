// stmapp/services/notify.js
'use strict';

/**
  * Simulates Firebase Cloud Messaging (FCM) push notification triggers.
  * In production, this imports the Firebase Admin SDK:
  * import admin from 'firebase-admin';
  */
export const sendFCMNotification = async (deviceTokens, payload) => {
  if (!deviceTokens || !deviceTokens.length) {
    console.log(`🔔 [Notification Service] Skipped: No device tokens registered.`);
    return { success: false };
  }

  console.log(`🔔 [Notification Service] Sending Push Notification: "${payload.title}" to ${deviceTokens.length} active device targets.`);
  
  return {
    success: true,
    messageId: `msg_${Math.random().toString(36).substring(2, 12)}`
  };
};

/**
  * Formats professional premium WhatsApp ordering dispatch messages.
  */
export const buildWhatsAppLink = (orderData, outletPhone = '6591915766') => {
  const { id, customer, items, total, mode, payment } = orderData;
  
  const itemsText = items.map(i => `• ${i.name} x${i.qty} ➔ SGD ${(i.price * i.qty).toFixed(2)}`).join('\n');
  const greeting = `*New STM Salam App Order* 🛍️`;
  
  const message = `${greeting}\n\n` +
    `*Order ID:* ${id}\n` +
    `*Customer:* ${customer.name}\n` +
    `*Phone:* ${customer.phone}\n\n` +
    `*Items Ordered:*\n${itemsText}\n\n` +
    `*Delivery Mode:* ${mode.toUpperCase()}\n` +
    `*Payment Method:* ${payment.method.toUpperCase()}\n` +
    `*Total to Pay:* *SGD ${total.toFixed(2)}*\n\n` +
    `${mode === 'delivery' ? `*Address:* ${customer.address}` : `*Pickup Address:* Blk 50A Marine Terrace #01-303, S441050`}\n\n` +
    `Please confirm my order and verify payment. Thank you! 🙏`;

  const encodedMsg = encodeURIComponent(message);
  return `https://wa.me/${outletPhone}?text=${encodedMsg}`;
};

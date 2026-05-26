// stmapp/services/payment.js
'use strict';

/**
  * Mock Stripe payment process simulation.
  * In production, this can be linked with Stripe Node SDK:
  * import Stripe from 'stripe';
  * const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  */
export const processStripePayment = async (amount, cardDetails) => {
  console.log(`💳 [Stripe Service] Processing payment of SGD ${amount.toFixed(2)}`);
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  // Simulating successful card payment authorization
  return {
    success: true,
    transactionId: `ch_stripe_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    status: 'completed',
    gateway: 'stripe'
  };
};

/**
  * Mock PayPal verification helper.
  */
export const verifyPayPalOrder = async (payPalOrderId) => {
  console.log(`🅿️ [PayPal Service] Verifying PayPal payment for order ID: ${payPalOrderId}`);
  
  return {
    success: true,
    transactionId: `txn_paypal_${payPalOrderId}`,
    status: 'completed',
    gateway: 'paypal'
  };
};

/**
  * PayNow SGQR screenshot validation formatter.
  */
export const generatePayNowReference = (orderId, total) => {
  console.log(`📲 [PayNow Service] Generating reference code for order: ${orderId}`);
  
  return {
    refCode: `STM-SGQR-${orderId.split('-')[1]}`,
    instructions: `Please scan our SGQR code and transfer SGD ${total.toFixed(2)}. Input Reference: STM-${orderId.split('-')[1]}`
  };
};

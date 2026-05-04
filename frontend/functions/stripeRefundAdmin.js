/**
 * Admin-initiated Stripe refunds (callable).
 * Stripe keys: Firebase Secret Manager ONLY (defineSecret().value()). No process.env / .env.
 */

const admin = require('firebase-admin');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const Stripe = require('stripe');

const REGION = 'us-central1';
const STRIPE_API_VERSION = '2024-06-20';

const STRIPE_SECRET_KEY = defineSecret('STRIPE_SECRET_KEY');
const STRIPE_WEBHOOK_SECRET = defineSecret('STRIPE_WEBHOOK_SECRET');

function normalizeStripeApiSecret(raw) {
  const str = String(raw || '').trim();
  if (!str) return '';
  const lines = str.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  const hit = lines.find(
    (l) =>
      (l.startsWith('sk_test_') || l.startsWith('sk_live_')) &&
      l.length < 500
  );
  const candidate = hit || lines[0] || '';
  return candidate.trim();
}

function newStripeClientFromTrimmedSecretKey(trimmedKey) {
  const secret = normalizeStripeApiSecret(trimmedKey);
  if (!secret) {
    const err = new Error('Missing STRIPE_SECRET_KEY');
    err.code = 'stripe_config';
    throw err;
  }
  if (!secret.startsWith('sk_')) {
    const err = new Error(
      'Invalid Stripe secret key (must start with sk_); check Secret Manager value.'
    );
    err.code = 'stripe_config';
    throw err;
  }
  if (secret.length > 512) {
    const err = new Error(
      'STRIPE_SECRET_KEY value is too long — re-save Secret Manager with only one sk_test_/sk_live_ line.'
    );
    err.code = 'stripe_config';
    throw err;
  }
  return new Stripe(secret, { apiVersion: STRIPE_API_VERSION });
}

const refundOrderByAdmin = onCall(
  {
    region: REGION,
    invoker: 'public',
    memory: '256MiB',
    timeoutSeconds: 60,
    secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET],
  },
  async (request) => {
    const callerUid = request.auth?.uid;
    if (!callerUid) {
      throw new HttpsError('unauthenticated', 'Authentication required.');
    }
    if (request.auth?.token?.admin !== true) {
      throw new HttpsError('permission-denied', 'Admin role required.');
    }

    const rawOrderId = request.data?.orderId;
    const orderId =
      typeof rawOrderId === 'string' ? rawOrderId.trim() : '';
    if (!orderId) {
      throw new HttpsError('invalid-argument', 'Missing orderId.');
    }

    let apiKey;
    try {
      apiKey = String(STRIPE_SECRET_KEY.value() || '').trim();
      void String(STRIPE_WEBHOOK_SECRET.value() || '').trim();
    } catch (e) {
      console.error('[refundOrderByAdmin]', {
        functionName: 'refundOrderByAdmin',
        orderId,
        paymentIntentId: null,
        refundId: null,
        errorReason: 'stripe_secret_read_failed',
        message: e?.message,
      });
      throw new HttpsError('internal', 'Stripe configuration unavailable.');
    }
    if (!apiKey) {
      console.error('[refundOrderByAdmin]', {
        functionName: 'refundOrderByAdmin',
        orderId,
        paymentIntentId: null,
        refundId: null,
        errorReason: 'missing_STRIPE_SECRET_KEY',
      });
      throw new HttpsError('internal', 'Stripe is not configured.');
    }

    const db = admin.firestore();
    const orderRef = db.collection('orders').doc(orderId);
    const snap = await orderRef.get();
    if (!snap.exists) {
      throw new HttpsError('not-found', 'Order not found.');
    }

    const order = snap.data() || {};

    const existingRs = order.refundStatus;
    if (
      existingRs === 'SUCCESS' ||
      existingRs === 'PENDING' ||
      existingRs === 'PROCESSING'
    ) {
      console.log('[refundOrderByAdmin]', {
        functionName: 'refundOrderByAdmin',
        orderId,
        paymentIntentId: order.paymentIntentId || null,
        refundId: order.refundId || null,
        errorReason: 'already_refunded_or_pending',
        refundStatus: existingRs,
      });
      return {
        success: false,
        alreadyRefunded: true,
        orderId,
        refundStatus: existingRs,
        refundId: order.refundId || null,
      };
    }

    if (order.status !== 'paid') {
      throw new HttpsError(
        'failed-precondition',
        'Order is not paid; cannot refund.'
      );
    }

    const paymentIntentId =
      typeof order.paymentIntentId === 'string'
        ? order.paymentIntentId.trim()
        : '';
    if (!paymentIntentId) {
      throw new HttpsError(
        'invalid-argument',
        'Order has no paymentIntentId for Stripe refund.'
      );
    }

    const stripe = newStripeClientFromTrimmedSecretKey(apiKey);

    let refund;
    try {
      refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
        reason: 'requested_by_customer',
        metadata: { orderId },
      });
    } catch (e) {
      console.error('[refundOrderByAdmin]', {
        functionName: 'refundOrderByAdmin',
        orderId,
        paymentIntentId,
        refundId: null,
        errorReason: e?.code || e?.type || 'stripe_refund_failed',
        message: e?.message,
      });
      throw new HttpsError('internal', 'Stripe refund failed.');
    }

    const refundId = refund.id;
    const stripeRefundStatus = refund.status;

    const refundStatusLabel =
      stripeRefundStatus === 'succeeded'
        ? 'SUCCESS'
        : stripeRefundStatus === 'pending'
          ? 'PENDING'
          : 'PROCESSING';

    const patch = {
      refundId,
      stripeRefundStatus,
      refundStatus: refundStatusLabel,
      refundInitiatedBy: 'admin_callable',
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (stripeRefundStatus === 'succeeded') {
      patch.status = 'refunded';
      patch.refundedAt = admin.firestore.FieldValue.serverTimestamp();
    } else if (stripeRefundStatus === 'pending') {
      patch.status = 'refunded';
    }

    await orderRef.set(patch, { merge: true });

    console.log('[refundOrderByAdmin]', {
      functionName: 'refundOrderByAdmin',
      orderId,
      paymentIntentId,
      refundId,
      stripeRefundStatus,
    });

    return {
      success: true,
      orderId,
      refundId,
      paymentIntentId,
      stripeRefundStatus,
      refundStatus: refundStatusLabel,
    };
  }
);

module.exports = { refundOrderByAdmin };

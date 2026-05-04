/**
 * Stripe Payment Sheet — isolated service (iOS / Android only).
 * Requires a small backend that returns PaymentSheet secrets (never ship secret keys in the app).
 * Configure EXPO_PUBLIC_STRIPE_PAYMENT_SHEET_ENDPOINT and EXPO_PUBLIC_STRIPE_VERIFY_PAYMENT_ENDPOINT.
 */

import {
  initPaymentSheet as stripeInitPaymentSheet,
  presentPaymentSheet as stripePresentPaymentSheet,
} from '@stripe/stripe-react-native';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

async function sleepMs(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** After backend verify, confirm `orders` or mirror `public_tracking` shows PAID (handles mirror lag). */
async function confirmGrabOrderPaid(orderId: string): Promise<boolean> {
  for (let i = 0; i < 20; i++) {
    const t = await getDoc(doc(db, 'public_tracking', orderId));
    if (t.exists()) {
      const ps = String((t.data() as { paymentStatus?: string }).paymentStatus ?? '');
      if (ps === 'PAID') return true;
    }
    const o = await getDoc(doc(db, 'orders', orderId));
    if (o.exists()) {
      const ps = String((o.data() as { paymentStatus?: string }).paymentStatus ?? '');
      if (ps === 'PAID') return true;
    }
    await sleepMs(250);
  }
  return false;
}

type SheetSecrets = {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
  paymentIntentId: string;
};

async function fetchSheetSecrets(
  orderId: string,
  amount: number
): Promise<{ ok: true; secrets: SheetSecrets } | { ok: false; error: string }> {
  const endpoint = process.env.EXPO_PUBLIC_STRIPE_PAYMENT_SHEET_ENDPOINT?.trim();
  if (!endpoint) {
    return {
      ok: false,
      error:
        'Stripe is not configured. Set EXPO_PUBLIC_STRIPE_PAYMENT_SHEET_ENDPOINT to your backend URL that returns client secrets.',
    };
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ orderId, amount }),
    });
    const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
    if (!res.ok || !json) {
      const msg = (json?.error as string) || (json?.message as string) || `HTTP ${res.status}`;
      return { ok: false, error: msg };
    }
    const paymentIntent = json.paymentIntent as string | undefined;
    const ephemeralKey = json.ephemeralKey as string | undefined;
    const customer = json.customer as string | undefined;
    let paymentIntentId = (json.paymentIntentId as string | undefined)?.trim() ?? '';
    if (!paymentIntentId && paymentIntent) {
      const m = /^pi_[a-zA-Z0-9]+/.exec(paymentIntent);
      paymentIntentId = m ? m[0] : '';
    }
    if (!paymentIntent || !ephemeralKey || !customer || !paymentIntentId) {
      return {
        ok: false,
        error:
          'Backend response must include paymentIntent, ephemeralKey, customer, and paymentIntentId (Stripe PaymentSheet).',
      };
    }
    return { ok: true, secrets: { paymentIntent, ephemeralKey, customer, paymentIntentId } };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}

/**
 * Initialise Stripe Payment Sheet for this order/amount.
 * Call {@link verifyStripePaymentOnServer} after {@link presentPaymentSheet} succeeds — do not treat payment as complete until verified.
 */
export async function initPaymentSheet(
  orderId: string,
  amount: number
): Promise<{ ok: boolean; paymentIntentId?: string; error?: string }> {
  const pk = process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY?.trim();
  if (!pk) {
    return {
      ok: false,
      error: 'Stripe publishable key missing (EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY).',
    };
  }

  const secrets = await fetchSheetSecrets(orderId, amount);
  if (!secrets.ok) return { ok: false, error: secrets.error };

  const { error } = await stripeInitPaymentSheet({
    merchantDisplayName: 'STM Salam',
    customerId: secrets.secrets.customer,
    customerEphemeralKeySecret: secrets.secrets.ephemeralKey,
    paymentIntentClientSecret: secrets.secrets.paymentIntent,
    allowsDelayedPaymentMethods: true,
    returnURL: 'stmmobile://stripe-redirect',
  });

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, paymentIntentId: secrets.secrets.paymentIntentId };
}

/**
 * Present the sheet (call after successful {@link initPaymentSheet}).
 */
export async function presentPaymentSheet(): Promise<{ ok: boolean; error?: string }> {
  const { error } = await stripePresentPaymentSheet();
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

/**
 * Server verifies PaymentIntent with Stripe and marks the Firestore order PAID. Required before any success UI.
 */
export async function verifyStripePaymentOnServer(
  orderId: string,
  paymentIntentId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const endpoint = process.env.EXPO_PUBLIC_STRIPE_VERIFY_PAYMENT_ENDPOINT?.trim();
  if (!endpoint) {
    return {
      ok: false,
      error:
        'Payment verify URL missing. Set EXPO_PUBLIC_STRIPE_VERIFY_PAYMENT_ENDPOINT (POST /verify-payment on your backend).',
    };
  }
  const token = process.env.EXPO_PUBLIC_STRIPE_VERIFY_BEARER_TOKEN?.trim();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ orderId, paymentIntentId }),
    });
    const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
    if (!res.ok || !json || json.ok !== true) {
      const msg =
        (json?.error as string) || (json?.message as string) || `Verification failed (${res.status})`;
      return { ok: false, error: msg };
    }
    const ok = await confirmGrabOrderPaid(orderId);
    if (!ok) {
      return {
        ok: false,
        error: 'Could not confirm PAID in Firestore. Check order tracking or try again in a moment.',
      };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

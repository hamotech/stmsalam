/**
 * Native (iOS/Android) Stripe PaymentSheet implementation.
 * This file is ONLY bundled on native targets — Metro resolves `./stripe`
 * to this file when Platform.OS !== 'web'. Never import this path directly
 * from shared code; always go through `src/payment` (the barrel).
 */

import {
  initPaymentSheet as stripeInitPaymentSheet,
  presentPaymentSheet as stripePresentPaymentSheet,
} from '@stripe/stripe-react-native';

type SheetSecrets = {
  paymentIntent: string;
  ephemeralKey: string;
  customer: string;
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
    if (!paymentIntent || !ephemeralKey || !customer) {
      return {
        ok: false,
        error:
          'Backend response must include paymentIntent, ephemeralKey, and customer (Stripe PaymentSheet).',
      };
    }
    return { ok: true, secrets: { paymentIntent, ephemeralKey, customer } };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: msg };
  }
}

export async function initPaymentSheet(
  orderId: string,
  amount: number
): Promise<{ ok: boolean; error?: string }> {
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
  return { ok: true };
}

export async function presentPaymentSheet(): Promise<{ ok: boolean; error?: string }> {
  const { error } = await stripePresentPaymentSheet();
  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

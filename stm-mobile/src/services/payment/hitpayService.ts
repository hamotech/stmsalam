/**
 * HitPay PayNow (embedded QR) — isolated service.
 * Uses EXPO_PUBLIC_HITPAY_API_KEY + EXPO_PUBLIC_HITPAY_API_BASE (sandbox default).
 *
 * Production note: HitPay recommends server-to-server calls; keys in the app bundle
 * are visible. Prefer a backend proxy when hardening security.
 */

const DEFAULT_SANDBOX_BASE = 'https://api.sandbox.hit-pay.com';

function apiBase(): string {
  const b = process.env.EXPO_PUBLIC_HITPAY_API_BASE?.trim();
  return b && b.length > 0 ? b.replace(/\/$/, '') : DEFAULT_SANDBOX_BASE;
}

function apiKey(): string {
  return (
    process.env.EXPO_PUBLIC_HITPAY_API_KEY?.trim() ||
    process.env.EXPO_PUBLIC_HITPAY_BUSINESS_API_KEY?.trim() ||
    ''
  );
}

export type HitPayCreateResult = {
  ok: boolean;
  paymentRequestId?: string;
  /** PayNow EMVCo payload, or sandbox image URL string */
  qrPayload?: string;
  checkoutUrl?: string;
  /** Same resource used by {@link fetchHitPayPaymentStatus} */
  statusUrl?: string;
  amountDisplay?: string;
  error?: string;
};

function pickQrPayload(data: Record<string, unknown>): string | undefined {
  const qd = data.qr_code_data as Record<string, unknown> | undefined;
  const fromNested = qd?.qr_code;
  if (typeof fromNested === 'string' && fromNested.length > 0) return fromNested;
  const direct = data.qr_code;
  if (typeof direct === 'string' && direct.length > 0) return direct;
  return undefined;
}

/**
 * Create a PayNow QR payment request (HitPay).
 */
export async function createPayNowPayment(
  orderId: string,
  amount: number,
  customerName: string
): Promise<HitPayCreateResult> {
  const key = apiKey();
  if (!key) {
    return { ok: false, error: 'HitPay API key missing (EXPO_PUBLIC_HITPAY_API_KEY).' };
  }
  if (!orderId?.trim()) {
    return { ok: false, error: 'orderId is required.' };
  }
  const amt = Number(amount);
  if (!Number.isFinite(amt) || amt < 0.3) {
    return { ok: false, error: 'amount must be a number ≥ 0.30 (HitPay minimum).' };
  }

  const base = apiBase();
  const url = `${base}/v1/payment-requests`;

  const body = {
    amount: amt,
    currency: 'SGD',
    payment_methods: ['paynow_online'],
    generate_qr: true,
    name: customerName?.trim() || undefined,
    reference_number: orderId.trim().slice(0, 255),
    purpose: `STM order ${orderId.trim()}`.slice(0, 255),
  };

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-BUSINESS-API-KEY': key,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let data: Record<string, unknown> = {};
    try {
      data = text ? (JSON.parse(text) as Record<string, unknown>) : {};
    } catch {
      return { ok: false, error: `HitPay: invalid JSON (${res.status})` };
    }

    if (!res.ok) {
      const msg =
        (data.message as string) ||
        (data.error as string) ||
        `HitPay error HTTP ${res.status}`;
      return { ok: false, error: msg };
    }

    const id = data.id as string | undefined;
    if (!id) {
      return { ok: false, error: 'HitPay: missing payment request id in response.' };
    }

    const qrPayload = pickQrPayload(data);
    const checkoutUrl = typeof data.url === 'string' ? data.url : undefined;
    const amountDisplay = typeof data.amount === 'string' ? data.amount : amt.toFixed(2);

    return {
      ok: true,
      paymentRequestId: id,
      qrPayload,
      checkoutUrl,
      statusUrl: `${base}/v1/payment-requests/${id}`,
      amountDisplay,
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, error: `HitPay network error: ${msg}` };
  }
}

export type HitPayPollStatus = 'pending' | 'completed' | 'failed' | 'unknown';

export async function fetchHitPayPaymentStatus(paymentRequestId: string): Promise<{
  status: HitPayPollStatus;
  raw?: string;
}> {
  const key = apiKey();
  if (!key || !paymentRequestId) return { status: 'unknown' };

  const base = apiBase();
  const url = `${base}/v1/payment-requests/${encodeURIComponent(paymentRequestId)}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'X-BUSINESS-API-KEY': key },
    });
    const text = await res.text();
    let data: Record<string, unknown> = {};
    try {
      data = text ? (JSON.parse(text) as Record<string, unknown>) : {};
    } catch {
      return { status: 'unknown', raw: text?.slice(0, 200) };
    }
    if (!res.ok) return { status: 'unknown', raw: (data.message as string) || text };

    const s = String(data.status || '').toLowerCase();
    if (s === 'completed') return { status: 'completed' };
    if (s === 'failed' || s === 'expired' || s === 'canceled' || s === 'inactive') {
      return { status: 'failed', raw: s };
    }
    if (s === 'pending') return { status: 'pending' };
    return { status: 'unknown', raw: s };
  } catch {
    return { status: 'unknown' };
  }
}

/**
 * QR "I have paid" — server writes orders only; mirror + admin PAID follow.
 */

export async function submitQrPaymentClaim(
  orderId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const endpoint = process.env.EXPO_PUBLIC_QR_CLAIM_PAYMENT_ENDPOINT?.trim();
  if (!endpoint) {
    return {
      ok: false,
      error:
        'Payment confirmation service not configured. Set EXPO_PUBLIC_QR_CLAIM_PAYMENT_ENDPOINT.',
    };
  }
  const token =
    process.env.EXPO_PUBLIC_QR_CLAIM_BEARER_TOKEN?.trim() ??
    process.env.EXPO_PUBLIC_STRIPE_VERIFY_BEARER_TOKEN?.trim();
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
      body: JSON.stringify({ orderId }),
    });
    const json = (await res.json().catch(() => null)) as Record<string, unknown> | null;
    if (!res.ok || !json || json.ok !== true) {
      const msg =
        (json?.error as string) || (json?.message as string) || `Request failed (${res.status})`;
      return { ok: false, error: msg };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
}

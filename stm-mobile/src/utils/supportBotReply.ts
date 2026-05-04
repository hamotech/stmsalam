/**
 * Rule-based STM Help bot — instant replies in `support_chats` (senderRole: bot).
 */
export function getSupportBotReply(userText: string): string | null {
  const t = (userText || '').trim().toLowerCase();
  if (!t) return null;

  if (t.includes('order status') || t.includes('track order') || t.includes('where is my order')) {
    return 'You can track your order in the Order Tracking screen.';
  }
  if (t.includes('payment') || t.includes('pay now') || t.includes('stripe')) {
    return 'Payments are processed securely via Stripe, COD, or QR where available.';
  }
  if (t.includes('refund')) {
    return 'Admin will review refund requests shortly.';
  }
  if (/\bhello\b|^hi\b|^hey\b|\bhi!\b/.test(t)) {
    return 'Hi 👋 How can we help you today?';
  }
  return null;
}

export const SUPPORT_BOT_QUICK_PROMPTS = [
  'Order status',
  'Payment',
  'Refund',
  'Hello',
] as const;

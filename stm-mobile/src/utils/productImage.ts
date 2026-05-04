/**
 * Resolve product image URLs from Firestore (often site-relative paths).
 */
const SITE =
  (process.env.EXPO_PUBLIC_SITE_ORIGIN || 'https://stmsalam.sg').replace(/\/$/, '');

export function productImageUrl(raw?: string | null): string | undefined {
  if (!raw || typeof raw !== 'string') return undefined;
  const t = raw.trim();
  if (!t) return undefined;
  if (/^https?:\/\//i.test(t)) return t;
  if (t.startsWith('/')) return `${SITE}${t}`;
  return `${SITE}/${t.replace(/^\//, '')}`;
}

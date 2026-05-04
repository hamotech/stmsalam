/**
 * Extract Firebase Auth email action params from a deep link or universal link.
 * Supports query string and hash fragments (some clients use either).
 *
 * Never log oobCode in analytics (short-lived secret).
 */

export type PasswordResetLinkParams = {
  mode: 'resetPassword';
  oobCode: string;
};

function readParams(search: string): Record<string, string> {
  const q = search.startsWith('?') ? search.slice(1) : search;
  const out: Record<string, string> = {};
  for (const [k, v] of new URLSearchParams(q).entries()) {
    out[k] = v;
  }
  return out;
}

export function parseFirebaseAuthDeepLink(rawUrl: string): PasswordResetLinkParams | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;

  let url: URL;
  try {
    url = new URL(rawUrl);
  } catch {
    return null;
  }

  let mode = '';
  let oobCode = '';

  const merge = (params: Record<string, string>) => {
    const m = params.mode ?? params.oobMode ?? '';
    const o = params.oobCode ?? params.oobcode ?? '';
    if (m) mode = m;
    if (o) oobCode = o;
  };

  merge(readParams(url.search));

  if ((!mode || !oobCode) && url.hash.length > 1) {
    const h = url.hash.startsWith('#') ? url.hash.slice(1) : url.hash;
    merge(Object.fromEntries(new URLSearchParams(h)));
  }

  if (mode !== 'resetPassword' || !oobCode.trim()) return null;

  return { mode: 'resetPassword', oobCode: oobCode.trim() };
}

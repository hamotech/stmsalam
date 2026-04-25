/** Emails that may resolve as admin when Firestore profile is missing (parity with web). */
const BOOTSTRAP_ADMIN_EMAILS = new Set(
  [
    'stmsalam@gmail.com',
    'admin@stmsalam.com',
    'admin@stm.com',
    'haritha.mh77@gmail.com',
  ].map((e) => e.toLowerCase())
);

export function resolveUserRole(email: string | null | undefined, profileRole: string | null | undefined) {
  const r = profileRole === 'admin' ? 'admin' : 'user';
  if (r === 'admin') return 'admin';
  const e = (email || '').trim().toLowerCase();
  if (e && BOOTSTRAP_ADMIN_EMAILS.has(e)) return 'admin';
  return 'user';
}

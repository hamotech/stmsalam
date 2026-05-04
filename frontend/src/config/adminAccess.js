/** Emails that may access /admin when Firestore profile is missing or role is not set yet. */
const BOOTSTRAP_ADMIN_EMAILS = new Set(
  [
    'stmsalam@gmail.com',
    'admin@stmsalam.com',
    'admin@stm.com',
    'haritha.mh77@gmail.com',
  ].map((e) => e.toLowerCase())
);

/** Emails that may access /driver as internal riders. */
const BOOTSTRAP_RIDER_EMAILS = new Set(
  [
    'rider1@stmsalam.com',
    'rider2@stmsalam.com',
    'rider3@stmsalam.com',
  ].map((e) => e.toLowerCase())
);

export function resolveUserRole(email, profileRole) {
  const r = profileRole === 'admin' ? 'admin' : profileRole === 'rider' ? 'rider' : 'user';
  if (r === 'admin' || r === 'rider') return r;
  const e = (email || '').trim().toLowerCase();
  if (e && BOOTSTRAP_ADMIN_EMAILS.has(e)) return 'admin';
  if (e && BOOTSTRAP_RIDER_EMAILS.has(e)) return 'rider';
  return 'user';
}

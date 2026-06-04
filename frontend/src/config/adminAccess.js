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
  // Preserve all known roles; only default to 'customer' for unknown values
  const KNOWN_ROLES = new Set(['admin', 'rider', 'driver', 'customer', 'user']);
  let r = KNOWN_ROLES.has(profileRole) ? profileRole : 'customer';
  if (r === 'user') r = 'customer'; // Migrate legacy 'user' to 'customer'
  if (r === 'admin' || r === 'rider' || r === 'driver') return r;
  const e = (email || '').trim().toLowerCase();
  if (e && BOOTSTRAP_ADMIN_EMAILS.has(e)) return 'admin';
  if (e && BOOTSTRAP_RIDER_EMAILS.has(e)) return 'driver';
  return 'customer';
}

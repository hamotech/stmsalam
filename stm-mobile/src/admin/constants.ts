/**
 * Firestore rules allow `orders` read only for this email (see frontend/firestore.rules isAdmin).
 * Override with EXPO_PUBLIC_FIRESTORE_ORDERS_ADMIN_EMAIL if needed.
 */
const DEFAULT_ORDERS_ADMIN = 'haritha.mh77@gmail.com';

export function getFirestoreOrdersAdminEmail(): string {
  return (process.env.EXPO_PUBLIC_FIRESTORE_ORDERS_ADMIN_EMAIL || DEFAULT_ORDERS_ADMIN)
    .trim()
    .toLowerCase();
}

export function isFirestoreOrdersAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === getFirestoreOrdersAdminEmail();
}

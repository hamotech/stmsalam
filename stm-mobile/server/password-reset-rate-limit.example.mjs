/**
 * Example: server-side throttle for password reset (conceptual).
 *
 * Rule: max 3 `sendPasswordResetEmail` attempts per normalized email per 10 minutes.
 * Implement in a Cloud Function or your API before calling the Admin SDK / proxying to Firebase.
 *
 * Sketch (pseudo-logic):
 *
 *   const key = `pwreset:${email.toLowerCase()}`;
 *   const count = await redis.incr(key);
 *   if (count === 1) await redis.expire(key, 600);
 *   if (count > 3) throw new HttpsError('resource-exhausted', 'Too many attempts. Try later');
 *
 * The mobile app maps Firebase `auth/too-many-requests` to user-facing copy; your backend
 * should return a similar generic message without confirming whether the email exists.
 */

export {};

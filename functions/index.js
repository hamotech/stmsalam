/**
 * Not deployed: repo-root `firebase.json` uses `"source": "frontend/functions"`.
 * Edit `frontend/functions/index.js` for `createGrabOrder` / `syncOrderToPublicTracking`.
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * Legacy stub (only if firebase.json `source` is mistakenly set back to `functions`).
 */
exports.createGrabOrder = functions.https.onCall((data, context) => {
  // AUTH CHECK
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be logged in');
  }

  const uid = context.auth.uid;

  // RETURN TEST RESPONSE FIRST (to confirm deployment works)
  return {
    success: true,
    uid,
    message: 'createGrabOrder is working',
  };
});

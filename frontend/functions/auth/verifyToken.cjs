module.exports = async function verifyFirebaseToken(req) {
  // In callable context, the ID token is already verified and present in req.auth
  if (!req?.auth?.uid) {
    throw new (require('firebase-functions/v2/https').HttpsError)('unauthenticated', 'Missing authentication');
  }
  // Return decoded token (claims are already attached to req.auth.token)
  return req.auth.token;
};

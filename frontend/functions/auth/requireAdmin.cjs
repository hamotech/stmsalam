const verifyFirebaseToken = require('./verifyToken.cjs');
const { HttpsError } = require('firebase-functions/v2/https');

module.exports = async function requireAdmin(req) {
  const token = await verifyFirebaseToken(req);
  if (!token?.admin) {
    throw new HttpsError('permission-denied', 'Admin role required');
  }
  return req.auth.uid;
};

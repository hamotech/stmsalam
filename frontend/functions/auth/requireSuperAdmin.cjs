const verifyFirebaseToken = require('./verifyToken.cjs');
const { HttpsError } = require('firebase-functions/v2/https');

module.exports = async function requireSuperAdmin(req) {
  const token = await verifyFirebaseToken(req);
  if (token?.role !== 'super_admin') {
    throw new HttpsError('permission-denied', 'Super admin role required');
  }
  return req.auth.uid;
};

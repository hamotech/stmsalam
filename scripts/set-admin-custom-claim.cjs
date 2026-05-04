#!/usr/bin/env node
/**
 * Set or clear Firebase Auth custom claim `admin` for one user (Admin SDK only).
 *
 * Usage:
 *   node scripts/set-admin-custom-claim.cjs <uid> true
 *   node scripts/set-admin-custom-claim.cjs <uid> false
 *
 * Prerequisites:
 *   - GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json
 *   - npm install firebase-admin --no-save   (from repo root, or run from a folder that has firebase-admin in node_modules)
 *
 * After changing claims, the user must call getIdToken(true) or sign in again to see updated JWT.
 */

/* eslint-disable @typescript-eslint/no-require-imports */

async function main() {
  const uid = process.argv[2];
  const flag = String(process.argv[3] ?? '').toLowerCase();
  if (!uid || (flag !== 'true' && flag !== 'false')) {
    console.error('Usage: node scripts/set-admin-custom-claim.cjs <uid> true|false');
    process.exit(1);
  }
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
    process.exit(1);
  }
  let admin;
  try {
    admin = require('firebase-admin');
  } catch {
    console.error('Install: npm install firebase-admin --no-save');
    process.exit(1);
  }
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  const adminFlag = flag === 'true';
  await admin.auth().setCustomUserClaims(uid, { admin: adminFlag });
  console.log(`OK: users/${uid} custom claims set to { admin: ${adminFlag} }`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

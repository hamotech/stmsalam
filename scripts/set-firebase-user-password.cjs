#!/usr/bin/env node
/**
 * Set a Firebase Auth user's password (Admin SDK). Use for staff/admin accounts.
 *
 * Password is read ONLY from env — never pass it on the command line (history leaks).
 *
 * Usage (by UID):
 *   set FIREBASE_NEW_PASSWORD=YourStrongSecret
 *   node scripts/set-firebase-user-password.cjs <uid>
 *
 * Usage (by email):
 *   set FIREBASE_NEW_PASSWORD=YourStrongSecret
 *   node scripts/set-firebase-user-password.cjs --email admin@yourdomain.com
 *
 * Unix:
 *   export FIREBASE_NEW_PASSWORD='...'
 *   node scripts/set-firebase-user-password.cjs --email admin@yourdomain.com
 *
 * Prerequisites:
 *   - GOOGLE_APPLICATION_CREDENTIALS=path/to/serviceAccount.json
 *   - Service account needs permission to update users (Firebase Auth Admin).
 *   - npm install firebase-admin --no-save
 *
 * Alternative: Firebase Console → Authentication → Users → select user → reset password / set password.
 */

/* eslint-disable @typescript-eslint/no-require-imports */

const MIN_LENGTH = 8;

function parseArgs() {
  const raw = process.argv.slice(2);
  const emailIdx = raw.indexOf('--email');
  if (emailIdx !== -1 && raw[emailIdx + 1]) {
    return { email: String(raw[emailIdx + 1]).trim().toLowerCase(), uid: null };
  }
  const uid = raw[0] ? String(raw[0]).trim() : null;
  return { email: null, uid };
}

async function main() {
  const { email, uid: uidArg } = parseArgs();
  const password = process.env.FIREBASE_NEW_PASSWORD;

  if (!password || typeof password !== 'string') {
    console.error('Set FIREBASE_NEW_PASSWORD to the new password (env var only).');
    process.exit(1);
  }
  if (password.length < MIN_LENGTH) {
    console.error(`Password must be at least ${MIN_LENGTH} characters.`);
    process.exit(1);
  }
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
    process.exit(1);
  }
  if (!email && !uidArg) {
    console.error('Usage: node scripts/set-firebase-user-password.cjs <uid>');
    console.error('    or: node scripts/set-firebase-user-password.cjs --email user@example.com');
    process.exit(1);
  }

  let adminSdk;
  try {
    adminSdk = require('firebase-admin');
  } catch {
    console.error('Install: npm install firebase-admin --no-save');
    process.exit(1);
  }
  if (!adminSdk.apps.length) {
    adminSdk.initializeApp();
  }

  let uid = uidArg;
  if (email) {
    const record = await adminSdk.auth().getUserByEmail(email);
    uid = record.uid;
    console.log(`Resolved email → uid ${uid}`);
  }

  await adminSdk.auth().updateUser(uid, { password });
  console.log('OK: password updated for this Auth user. They can sign in with the new password immediately.');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});

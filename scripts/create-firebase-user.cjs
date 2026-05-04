#!/usr/bin/env node
/**
 * Create a Firebase Auth user (email/password) + Firestore `users/{uid}` profile (Admin SDK).
 *
 * Password only via env (not argv — avoids shell history leaks).
 *
 * Usage:
 *   set FIREBASE_NEW_PASSWORD=YourStrongSecretAtLeast8Chars
 *   node scripts/create-firebase-user.cjs --email staff@yourdomain.com --role user
 *   node scripts/create-firebase-user.cjs --email admin@yourdomain.com --role admin --name "STM Admin"
 *
 * Unix:
 *   export FIREBASE_NEW_PASSWORD='...'
 *   node scripts/create-firebase-user.cjs --email admin@example.com --role admin
 *
 * Flags:
 *   --email   (required)  Lowercased automatically.
 *   --role    user | admin | rider  (default: user)
 *   --name    display name  (default: part before @ in email)
 *   --phone   optional phone number
 *
 * For admin users, sets custom claim `{ admin: true }` to match Firestore (same as sync script).
 *
 * Prerequisites:
 *   - GOOGLE_APPLICATION_CREDENTIALS=path/to/serviceAccount.json
 *   - npm install firebase-admin --no-save
 */

/* eslint-disable @typescript-eslint/no-require-imports */

const MIN_PASSWORD_LENGTH = 8;
const ALLOWED_ROLES = new Set(['user', 'admin', 'rider']);

function parseArgs() {
  const raw = process.argv.slice(2);
  let email = null;
  let role = 'user';
  let name = null;
  let phone = null;
  for (let i = 0; i < raw.length; i += 1) {
    const a = raw[i];
    if (a === '--email' && raw[i + 1]) {
      email = String(raw[i + 1]).trim().toLowerCase();
      i += 1;
      continue;
    }
    if (a === '--role' && raw[i + 1]) {
      role = String(raw[i + 1]).toLowerCase().trim();
      i += 1;
      continue;
    }
    if (a === '--name' && raw[i + 1]) {
      name = String(raw[i + 1]).trim();
      i += 1;
      continue;
    }
    if (a === '--phone' && raw[i + 1]) {
      phone = String(raw[i + 1]).trim();
      i += 1;
      continue;
    }
  }
  return { email, role, name, phone };
}

function defaultNameFromEmail(email) {
  const local = email.split('@')[0] || 'User';
  return local.charAt(0).toUpperCase() + local.slice(1);
}

async function main() {
  const { email, role, name: nameArg, phone } = parseArgs();
  const password = process.env.FIREBASE_NEW_PASSWORD;

  if (!email) {
    console.error('Usage: node scripts/create-firebase-user.cjs --email you@domain.com [--role user|admin] [--name "Display Name"]');
    console.error('Set FIREBASE_NEW_PASSWORD in the environment (min ' + MIN_PASSWORD_LENGTH + ' chars).');
    process.exit(1);
  }
  if (!ALLOWED_ROLES.has(role)) {
    console.error('--role must be "user" or "admin".');
    process.exit(1);
  }
  if (!password || typeof password !== 'string' || password.length < MIN_PASSWORD_LENGTH) {
    console.error(`Set FIREBASE_NEW_PASSWORD (at least ${MIN_PASSWORD_LENGTH} characters).`);
    process.exit(1);
  }
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
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

  const displayName = nameArg || defaultNameFromEmail(email);

  let userRecord;
  try {
    userRecord = await adminSdk.auth().createUser({
      email,
      password,
      displayName,
      emailVerified: false,
    });
  } catch (e) {
    if (e.code === 'auth/email-already-exists') {
      console.error('That email is already registered. Use set-firebase-user-password.cjs to reset password, or pick another email.');
    }
    throw e;
  }

  const uid = userRecord.uid;
  const db = adminSdk.firestore();
  const createdAt = new Date().toISOString();

  await db
    .collection('users')
    .doc(uid)
    .set(
      {
        email,
        name: displayName,
        role,
        ...(phone ? { phone } : {}),
        ...(role === 'rider' ? { status: 'offline', assignedOrders: [] } : {}),
        createdAt,
      },
      { merge: true }
    );

  const isAdmin = role === 'admin';
  await adminSdk.auth().setCustomUserClaims(uid, { admin: isAdmin });

  console.log('OK: Auth user created.');
  console.log('    uid:   ', uid);
  console.log('    email: ', email);
  console.log('    role:  ', role);
  console.log('    Firestore: users/' + uid);
  console.log('    Custom claim admin:', isAdmin);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});

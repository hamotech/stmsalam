#!/usr/bin/env node
/**
 * Create a Firebase Auth rider user (email/password) + Firestore `users/{uid}` profile (Admin SDK).
 *
 * Password only via env (not argv — avoids shell history leaks).
 *
 * Usage:
 *   set FIREBASE_NEW_PASSWORD=YourStrongSecretAtLeast8Chars
 *   node scripts/create-rider-user.cjs --email rider@stmsalam.com
 *
 * Unix:
 *   export FIREBASE_NEW_PASSWORD='...'
 *   node scripts/create-rider-user.cjs --email rider@stmsalam.com
 *
 * Flags:
 *   --email   (required)  Lowercased automatically.
 *   --name    display name  (default: part before @ in email)
 *   --phone   optional phone number
 *
 * Sets custom claim `{ role: "rider" }`.
 *
 * Prerequisites:
 *   - GOOGLE_APPLICATION_CREDENTIALS=path/to/serviceAccount.json
 *   - npm install firebase-admin --no-save
 */

/* eslint-disable @typescript-eslint/no-require-imports */

const MIN_PASSWORD_LENGTH = 8;

function parseArgs() {
  const raw = process.argv.slice(2);
  let email = null;
  let name = null;
  let phone = null;
  for (let i = 0; i < raw.length; i += 1) {
    const a = raw[i];
    if (a === '--email' && raw[i + 1]) {
      email = String(raw[i + 1]).trim().toLowerCase();
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
  return { email, name, phone };
}

function defaultNameFromEmail(email) {
  const local = email.split('@')[0] || 'Rider';
  return local.charAt(0).toUpperCase() + local.slice(1);
}

async function main() {
  const { email, name: nameArg, phone } = parseArgs();
  const password = process.env.FIREBASE_NEW_PASSWORD;
  const role = 'rider';

  if (!email) {
    console.error('Usage: node scripts/create-rider-user.cjs --email you@domain.com [--name "Display Name"]');
    console.error('Set FIREBASE_NEW_PASSWORD in the environment (min ' + MIN_PASSWORD_LENGTH + ' chars).');
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
      emailVerified: true,
    });
    console.log('✅ Created new Auth user.');
  } catch (e) {
    if (e.code === 'auth/email-already-exists') {
      console.log('⚠️ Email already exists. Fetching existing user record...');
      userRecord = await adminSdk.auth().getUserByEmail(email);
      // Update password just in case
      await adminSdk.auth().updateUser(userRecord.uid, { password });
      console.log('✅ Updated existing Auth user password.');
    } else {
      throw e;
    }
  }

  const uid = userRecord.uid;
  const db = adminSdk.firestore();
  const createdAt = new Date().toISOString();

  console.log('✍️  Writing user document to Firestore...');
  await db
    .collection('users')
    .doc(uid)
    .set(
      {
        uid,
        email,
        name: displayName,
        role,
        ...(phone ? { phone } : {}),
        status: 'offline', 
        assignedOrders: [],
        createdAt,
      },
      { merge: true }
    );
  console.log('✅ Firestore write complete.');

  console.log('🔐 Setting custom claims...');
  // The prompt asks for { role: 'rider' }
  await adminSdk.auth().setCustomUserClaims(uid, { role: 'rider' });
  console.log('✅ Custom claims set successfully.');

  console.log('──────────────────────────────────────');
  console.log('🎉 RIDER ONBOARDING COMPLETE 🎉');
  console.log('    UID:   ', uid);
  console.log('    Email: ', email);
  console.log('    Role:  ', role);
  console.log('    Custom claim: { role: "rider" }');
  console.log('    Firestore: users/' + uid);
  console.log('──────────────────────────────────────');
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});

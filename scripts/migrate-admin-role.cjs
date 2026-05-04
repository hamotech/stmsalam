#!/usr/bin/env node
/**
 * Phase 2 — Data cleanup: set role = "admin" on every `users` doc where isAdmin == true and role != "admin".
 *
 * Prerequisites:
 *   1. Service account with Firestore write (Firebase Console → Project settings → Service accounts).
 *   2. From repo root:
 *        npm install firebase-admin --no-save
 *        set GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\serviceAccount.json   (Windows)
 *        export GOOGLE_APPLICATION_CREDENTIALS=/path/to/serviceAccount.json (Unix)
 *   3. node scripts/migrate-admin-role.cjs
 *
 * After this, set EXPO_PUBLIC_ADMIN_AUTH_STRICT_ROLE_ONLY=true in the Expo app and deploy firestore.rules.
 */

/* eslint-disable @typescript-eslint/no-require-imports */
async function main() {
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    console.error('Set GOOGLE_APPLICATION_CREDENTIALS to your service account JSON path.');
    process.exit(1);
  }
  let admin;
  try {
    admin = require('firebase-admin');
  } catch {
    console.error('Install once: npm install firebase-admin --no-save');
    process.exit(1);
  }
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  const db = admin.firestore();
  const snap = await db.collection('users').where('isAdmin', '==', true).get();
  let updates = 0;
  const ops = [];
  snap.forEach((docSnap) => {
    const d = docSnap.data() || {};
    const role = String(d.role ?? '').toLowerCase().trim();
    if (role !== 'admin') {
      ops.push({ ref: docSnap.ref, id: docSnap.id, from: d.role });
    }
  });
  const BATCH = 400;
  for (let i = 0; i < ops.length; i += BATCH) {
    const batch = db.batch();
    const chunk = ops.slice(i, i + BATCH);
    chunk.forEach(({ ref }) => {
      batch.set(ref, { role: 'admin' }, { merge: true });
    });
    await batch.commit();
    updates += chunk.length;
    console.log(`Committed batch ${Math.floor(i / BATCH) + 1}, +${chunk.length} docs`);
  }
  console.log(`Done. Updated ${updates} user document(s) to role "admin".`);
  if (snap.empty) {
    console.log('No documents matched isAdmin == true.');
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

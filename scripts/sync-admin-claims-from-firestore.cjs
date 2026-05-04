#!/usr/bin/env node
/**
 * Sync Auth custom claim `admin` to match Firestore `users/{uid}.role`:
 *   role == "admin" (case-insensitive) → { admin: true }
 *   otherwise → { admin: false }
 *
 * Paginates all documents in `users`. Skips uids where setCustomUserClaims fails (e.g. deleted Auth user).
 *
 * Usage:
 *   node scripts/sync-admin-claims-from-firestore.cjs
 *
 * Prerequisites: same as scripts/set-admin-custom-claim.cjs
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
    console.error('Install: npm install firebase-admin --no-save');
    process.exit(1);
  }
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  const db = admin.firestore();
  const pageSize = 200;
  let lastDoc = null;
  let processed = 0;
  let errors = 0;

  for (;;) {
    let q = db.collection('users').orderBy(admin.firestore.FieldPath.documentId()).limit(pageSize);
    if (lastDoc) {
      q = q.startAfter(lastDoc);
    }
    const snap = await q.get();
    if (snap.empty) break;

    for (const docSnap of snap.docs) {
      const uid = docSnap.id;
      const data = docSnap.data() || {};
      const role = String(data.role ?? '')
        .toLowerCase()
        .trim();
      const isAdmin = role === 'admin';
      try {
        await admin.auth().setCustomUserClaims(uid, { admin: isAdmin });
        processed += 1;
        if (processed % 50 === 0) {
          console.log(`… ${processed} users synced`);
        }
      } catch (e) {
        errors += 1;
        console.warn(`Skip uid=${uid}: ${e && e.message ? e.message : e}`);
      }
    }

    lastDoc = snap.docs[snap.docs.length - 1];
    if (snap.size < pageSize) break;
  }

  console.log(`Done. Synced ${processed} user(s). Skipped/errors: ${errors}.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

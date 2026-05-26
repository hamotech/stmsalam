/* eslint-disable no-console */
'use strict';

const admin = require('firebase-admin');

function parseArgs(argv) {
  const args = new Set(argv.slice(2));
  return {
    dryRun: !args.has('--apply'),
  };
}

function resolveAvailableFromLegacy(data) {
  if (data && Object.prototype.hasOwnProperty.call(data, 'available')) {
    return data.available;
  }
  if (data && Object.prototype.hasOwnProperty.call(data, 'active')) {
    return data.active !== false;
  }
  return true;
}

async function run() {
  const { dryRun } = parseArgs(process.argv);
  if (!admin.apps.length) {
    admin.initializeApp();
  }
  const db = admin.firestore();
  const snap = await db.collection('products').get();

  let scanned = 0;
  let missingAvailable = 0;
  let updated = 0;
  let batch = db.batch();
  let ops = 0;

  for (const docSnap of snap.docs) {
    scanned += 1;
    const data = docSnap.data() || {};
    if (Object.prototype.hasOwnProperty.call(data, 'available')) {
      continue;
    }
    missingAvailable += 1;
    const available = resolveAvailableFromLegacy(data);
    if (!dryRun) {
      batch.update(docSnap.ref, {
        available,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
      ops += 1;
      updated += 1;
      if (ops >= 400) {
        await batch.commit();
        batch = db.batch();
        ops = 0;
      }
    }
  }

  if (!dryRun && ops > 0) {
    await batch.commit();
  }

  console.log('[migrate-products-available] completed', {
    mode: dryRun ? 'dry-run' : 'apply',
    scanned,
    missingAvailable,
    updated: dryRun ? 0 : updated,
  });
}

run().catch((err) => {
  console.error('[migrate-products-available] failed', err);
  process.exit(1);
});


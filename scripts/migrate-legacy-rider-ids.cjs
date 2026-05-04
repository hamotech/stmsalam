#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
/**
 * Dry-run by default.
 *
 * Usage:
 *   node scripts/migrate-legacy-rider-ids.cjs
 *   node scripts/migrate-legacy-rider-ids.cjs --apply
 *
 * Requires:
 *   GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account.json
 */

const BATCH_SIZE = 500;

function isLikelyUid(value) {
  const v = String(value || '').trim();
  return !!v && v.length >= 20 && !/\s/.test(v);
}

function parseArgs() {
  const args = process.argv.slice(2);
  return {
    apply: args.includes('--apply'),
  };
}

async function main() {
  const { apply } = parseArgs();
  const admin = require('firebase-admin');
  if (!admin.apps.length) admin.initializeApp();
  const db = admin.firestore();

  const [ordersSnap, ridersSnap] = await Promise.all([
    db.collection('orders').get(),
    db.collection('riders').get(),
  ]);

  const riderByCode = new Map();
  const riderByName = new Map();

  ridersSnap.docs.forEach((d) => {
    const uid = d.id;
    const data = d.data() || {};
    const code = String(data.code || '').trim().toLowerCase();
    const name = String(data.name || '').trim().toLowerCase();
    if (code) riderByCode.set(code, uid);
    if (name) riderByName.set(name, uid);
  });

  const updates = [];
  const mismatches = [];

  ordersSnap.docs.forEach((d) => {
    const data = d.data() || {};
    const rawRiderId = String(data.riderId || '').trim();
    if (!rawRiderId) return;
    if (isLikelyUid(rawRiderId) && ridersSnap.docs.some((r) => r.id === rawRiderId)) return;

    const key = rawRiderId.toLowerCase();
    const matchUid = riderByCode.get(key) || riderByName.get(key) || null;
    if (matchUid) {
      updates.push({ ref: d.ref, from: rawRiderId, to: matchUid, orderId: d.id });
    } else {
      mismatches.push({ orderId: d.id, riderId: rawRiderId });
    }
  });

  console.log('[legacy-riderId-migration] dryRun:', !apply);
  console.log('[legacy-riderId-migration] candidateUpdates:', updates.length);
  console.log('[legacy-riderId-migration] unmatched:', mismatches.length);
  if (mismatches.length) {
    console.log('[legacy-riderId-migration] unmatched examples:', mismatches.slice(0, 20));
  }
  console.log('[legacy-riderId-migration] preview:', updates.slice(0, 20));

  if (!apply || updates.length === 0) return;

  for (let i = 0; i < updates.length; i += BATCH_SIZE) {
    const chunk = updates.slice(i, i + BATCH_SIZE);
    const batch = db.batch();
    chunk.forEach((u) => batch.update(u.ref, { riderId: u.to }));
    await batch.commit();
    console.log(`[legacy-riderId-migration] committed batch ${Math.floor(i / BATCH_SIZE) + 1} (${chunk.length} docs)`);
  }
}

main().catch((e) => {
  console.error(e?.message || e);
  process.exit(1);
});

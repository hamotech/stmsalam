#!/usr/bin/env node
/**
 * Generate a Firebase password-reset link (Admin SDK) — e.g. if SMTP delivery failed.
 * Send the URL to the user through a trusted channel; do not log the full link in shared logs.
 *
 * Usage:
 *   node scripts/generate-password-reset-link.cjs --email user@example.com
 *
 * Prerequisites:
 *   - GOOGLE_APPLICATION_CREDENTIALS=path/to/serviceAccount.json
 *   - npm install firebase-admin --no-save
 */

/* eslint-disable @typescript-eslint/no-require-imports */

async function main() {
  const idx = process.argv.indexOf('--email');
  const email =
    idx !== -1 && process.argv[idx + 1] ? String(process.argv[idx + 1]).trim().toLowerCase() : '';

  if (!email) {
    console.error('Usage: node scripts/generate-password-reset-link.cjs --email user@example.com');
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

  const link = await adminSdk.auth().generatePasswordResetLink(email);
  console.log('Password reset link (share securely with the user only):');
  console.log(link);
}

main().catch((e) => {
  console.error(e.message || e);
  process.exit(1);
});

#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TARGET_DIRS = ['frontend/src', 'stm-mobile/src', 'frontend/functions'];
const ALLOWLIST = [
  'frontend/functions/shared/orderTransitionService.cjs',
  'frontend/functions/index.js', // initial creation snapshots only
];
const LIFECYCLE = String.raw`(?:status|paymentStatus|paymentMethod|paymentMode)`;

const OFFENDER_PATTERNS = [
  new RegExp(String.raw`updateDoc\s*\(\s*doc\([^)]*['"]orders['"][^)]*\)\s*,\s*\{[\s\S]{0,320}\b${LIFECYCLE}\s*:`, 'gm'),
  new RegExp(String.raw`setDoc\s*\(\s*doc\([^)]*['"]orders['"][^)]*\)\s*,\s*\{[\s\S]{0,320}\b${LIFECYCLE}\s*:`, 'gm'),
  new RegExp(String.raw`\.collection\(\s*['"]orders['"]\s*\)\.doc\([^)]*\)\.set\s*\(\s*\{[\s\S]{0,320}\b${LIFECYCLE}\s*:`, 'gm'),
  new RegExp(String.raw`\.collection\(\s*['"]orders['"]\s*\)\.doc\([^)]*\)\.update\s*\(\s*\{[\s\S]{0,320}\b${LIFECYCLE}\s*:`, 'gm'),
];

function walk(dir, out = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build', '.expo'].includes(ent.name)) continue;
      walk(p, out);
    } else if (/\.(js|jsx|ts|tsx|cjs|mjs)$/.test(ent.name)) {
      out.push(p);
    }
  }
  return out;
}

const offenders = [];
for (const rel of TARGET_DIRS) {
  const dir = path.join(ROOT, rel);
  if (!fs.existsSync(dir)) continue;
  for (const file of walk(dir)) {
    const relFile = path.relative(ROOT, file).replace(/\\/g, '/');
    if (ALLOWLIST.includes(relFile)) continue;
    const text = fs.readFileSync(file, 'utf8');
    if (OFFENDER_PATTERNS.some((re) => re.test(text))) {
      offenders.push(relFile);
    }
  }
}

if (offenders.length) {
  console.error('🚨 Direct lifecycle write detected (BLOCK THIS)');
  for (const f of offenders) console.error(' - ' + f);
  console.error('Use performOrderTransition(...) instead.');
  process.exit(1);
}

console.log('No direct lifecycle mutation patterns found.');

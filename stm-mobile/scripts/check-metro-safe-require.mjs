/**
 * Dev guard: fail if Metro-incompatible `require(nonLiteral)` appears in app source.
 * Run: npm run check:metro-entry
 *
 * Note: `import()` code-splitting elsewhere is allowed; this script focuses on `require()`.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const IGNORE_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  'build',
  '.expo',
  'android',
  'ios',
  'coverage',
]);

/** Strip // and /* *\/ comments so examples in comments do not false-positive. */
function stripCommentsRoughly(src) {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '');
}

/** require( not followed (after optional ws) by a quote — Metro needs require("literal") */
const DYNAMIC_REQUIRE = /\brequire\s*\(\s*(?!['"])/;

function walk(dir, acc) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (IGNORE_DIRS.has(e.name)) continue;
      walk(full, acc);
    } else if (/\.(js|jsx|ts|tsx|mjs|cjs)$/.test(e.name)) {
      acc.push(full);
    }
  }
}

const files = [];
walk(projectRoot, files);

const problems = [];
for (const file of files) {
  const rel = path.relative(projectRoot, file).replace(/\\/g, '/');
  if (rel === 'scripts/check-metro-safe-require.mjs') continue;

  const raw = fs.readFileSync(file, 'utf8');
  const src = stripCommentsRoughly(raw);
  if (DYNAMIC_REQUIRE.test(src)) {
    problems.push(`${rel}: non-literal require() — Metro needs require("static/path") only`);
  }
}

if (problems.length) {
  console.error('[check-metro-safe-require] Failed:\n');
  for (const p of problems) console.error(' ', p);
  process.exit(1);
}

console.log('[check-metro-safe-require] OK.');

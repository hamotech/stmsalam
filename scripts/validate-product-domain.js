/* eslint-disable no-console */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const ALLOWED_ACTIVE_PATHS = new Set([
  normalize('shared/productDomainGuard.js'),
  normalize('shared/useProductsCore.js'),
  normalize('frontend/functions/scripts/migrate-products-available.js'),
  normalize('frontend/src/admin/pages/Categories.jsx'),
]);
const ALLOWED_PRODUCT_QUERY_PATHS = new Set([
  normalize('shared/useProductsCore.js'),
  normalize('shared/productDomainGuard.js'),
]);

function normalize(p) {
  return p.split(path.sep).join('/');
}

function shouldSkip(rel) {
  const scoped = `/${rel}/`;
  return (
    scoped.includes('/node_modules/') ||
    scoped.includes('/.git/') ||
    scoped.includes('/dist/') ||
    scoped.includes('/build/') ||
    scoped.includes('/.vite/') ||
    rel === '.eslintrc.cjs'
  );
}

function collectFiles(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const abs = path.join(dir, entry.name);
    const rel = normalize(path.relative(ROOT, abs));
    if (shouldSkip(rel)) continue;
    if (entry.isDirectory()) {
      collectFiles(abs, out);
      continue;
    }
    if (/\.(js|jsx|ts|tsx|cjs|mjs)$/.test(entry.name)) out.push({ abs, rel });
  }
  return out;
}

function scan() {
  const files = collectFiles(ROOT);
  const violations = [];

  for (const file of files) {
    const text = fs.readFileSync(file.abs, 'utf8');

    if (!ALLOWED_ACTIVE_PATHS.has(file.rel)) {
      if (/\bproduct\.active\b|\bp\.active\b|\bactive\s*!==\s*false\b/.test(text)) {
        violations.push(`${file.rel}: forbidden legacy active usage`);
      }
    }

    if (!ALLOWED_PRODUCT_QUERY_PATHS.has(file.rel)) {
      if (
        /getDocs\(\s*collection\(\s*db\s*,\s*['"]products['"]\s*\)\s*\)/.test(text) ||
        /query\(\s*collection\(\s*db\s*,\s*['"]products['"]\s*\)/.test(text) ||
        /onSnapshot\(\s*query\(\s*collection\(\s*db\s*,\s*['"]products['"]\s*\)/.test(text)
      ) {
        violations.push(`${file.rel}: direct product query forbidden (use shared/useProductsCore.js)`);
      }
    }

    if (/(Menu|Home|Product|DataContext|menuService)\.(js|jsx|ts|tsx)$/.test(file.rel)) {
      if (/\.filter\(\s*\(\s*p\s*\)\s*=>/.test(text) && /available/.test(text) && !file.rel.includes('shared/useProductsCore.js')) {
        violations.push(`${file.rel}: inline product filtering detected outside shared core`);
      }
    }
  }

  if (violations.length) {
    console.error('[validate-product-domain] violations found:');
    violations.forEach((v) => console.error(` - ${v}`));
    process.exit(1);
  }

  console.log('[validate-product-domain] OK: product domain guardrails enforced.');
}

scan();


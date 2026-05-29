/**
 * Environment validation — run at backend startup.
 * Fails fast in production when critical config is missing.
 */

const REQUIRED_IN_PRODUCTION = [
  'JWT_SECRET',
];

const RECOMMENDED = [
  'NODE_ENV',
  'PORT',
];

const OPTIONAL_INTEGRATIONS = [
  { key: 'SUPABASE_URL', label: 'Supabase persistence' },
  { key: 'SUPABASE_KEY', label: 'Supabase persistence' },
];

const HARDCODED_FALLBACK_SECRET = 'salam123stm';

export function validateEnv() {
  const env = process.env;
  const nodeEnv = (env.NODE_ENV || 'development').toLowerCase();
  const isProduction = nodeEnv === 'production';
  const warnings = [];
  const errors = [];

  // --- Critical checks ---
  if (!env.JWT_SECRET || env.JWT_SECRET.trim() === HARDCODED_FALLBACK_SECRET) {
    const msg = 'JWT_SECRET is missing or using the default fallback. Set a strong secret in production.';
    if (isProduction) {
      errors.push(msg);
    } else {
      warnings.push(msg);
    }
  }

  // --- Recommended checks ---
  if (!env.NODE_ENV) {
    warnings.push('NODE_ENV is not set. Defaulting to "development". Set to "production" in deployed environments.');
  }

  // --- Optional integration checks ---
  for (const { key, label } of OPTIONAL_INTEGRATIONS) {
    if (!env[key]) {
      warnings.push(`${key} not set — ${label} will be disabled.`);
    }
  }

  // --- Report ---
  if (warnings.length > 0) {
    console.warn('⚠️  Environment validation warnings:');
    for (const w of warnings) {
      console.warn(`   ⚠️  ${w}`);
    }
  }

  if (errors.length > 0) {
    console.error('❌ Environment validation FAILED:');
    for (const e of errors) {
      console.error(`   ❌ ${e}`);
    }
    if (isProduction) {
      throw new Error('Backend startup blocked: fix environment configuration before deploying to production.');
    }
  }

  console.log(`✅ Environment validated (${nodeEnv})`);
  return { nodeEnv, isProduction, warnings, errors };
}

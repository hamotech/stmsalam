const admin = require('firebase-admin');
const { HttpsError } = require('firebase-functions/v2/https');
const coreServices = require('./coreServices.cjs');
const orderServices = require('./orderServices.cjs');
const paymentServices = require('./paymentServices.cjs');
const securityServices = require('./securityServices.cjs');

const cache = Object.create(null);
const loading = new Set();
const firstLoadAt = Object.create(null);

const serviceFactories = {
  ...coreServices,
  ...orderServices,
  ...paymentServices,
  ...securityServices,
};

const BOOT_MODE = String(process.env.FUNCTION_BOOT_MODE || 'safe').toLowerCase();
const DEPLOY_MODE = String(process.env.FUNCTIONS_DEPLOY_MODE || '').toLowerCase() === 'true';
const DEBUG = String(process.env.FUNCTION_BOOT_DEBUG || '').toLowerCase() === 'true';
const EXTERNALS = { admin, HttpsError };
const dependencyMap = {
  orderStateMachine: [],
  orderStateGuard: ['orderStateMachine'],
  createOrderService: ['orderStateMachine'],
  orderRebuildService: ['orderStateMachine'],
  orderTransitionService: ['admin', 'orderStateMachine', 'orderStateGuard'],
  rateLimiter: ['admin'],
  idempotencyService: ['admin'],
  appCheckGuard: ['HttpsError'],
};

function logSafe(event, payload) {
  if ((!DEBUG && DEPLOY_MODE) || !DEBUG) return;
  try {
    console.log('[functionBootstrap]', event, payload || {});
  } catch (_) {
    // non-blocking logging only
  }
}

function normalizeServiceName(name) {
  const raw = String(name || '').trim().replace(/\\/g, '/');
  if (!raw) {
    throw new Error('functionBootstrap.getService(name) requires a service path');
  }
  const alias = {
    orderStateMachine: 'shared/orderStateMachine.core.cjs',
    orderStateGuard: 'shared/orderStateGuard.cjs',
    orderTransitionService: 'shared/orderTransitionService.cjs',
    createOrderService: 'shared/createOrderService.cjs',
    orderRebuildService: 'shared/orderRebuildService.cjs',
    rateLimiter: 'shared/rateLimiter.cjs',
    idempotencyService: 'shared/idempotencyService.cjs',
    appCheckGuard: 'shared/security/appCheckGuard.cjs',
  };
  const canonical = alias[raw] || raw;
  if (canonical.includes('..')) {
    throw new Error(`BOOTSTRAP_SERVICE_FAILED: ${raw}`);
  }
  return canonical.startsWith('shared/') ? canonical : canonical;
}

function canonicalToFactoryKey(name) {
  const c = normalizeServiceName(name);
  if (!c.startsWith('shared/')) return c;
  switch (c) {
    case 'shared/orderStateMachine.core.cjs':
      return 'orderStateMachine';
    case 'shared/orderStateGuard.cjs':
      return 'orderStateGuard';
    case 'shared/createOrderService.cjs':
      return 'createOrderService';
    case 'shared/orderRebuildService.cjs':
      return 'orderRebuildService';
    case 'shared/orderTransitionService.cjs':
      return 'orderTransitionService';
    case 'shared/rateLimiter.cjs':
      return 'rateLimiter';
    case 'shared/idempotencyService.cjs':
      return 'idempotencyService';
    case 'shared/security/appCheckGuard.cjs':
      return 'appCheckGuard';
    default:
      throw new Error(`BOOTSTRAP_SERVICE_FAILED: ${c}`);
  }
}

function resolveDependencies(serviceName) {
  const depNames = dependencyMap[serviceName] || [];
  const deps = {};
  for (const depName of depNames) {
    deps[depName] = EXTERNALS[depName] || getService(depName);
  }
  return deps;
}

function buildService(serviceName) {
  const factory = serviceFactories[serviceName];
  if (typeof factory !== 'function') {
    throw new Error(`Unknown service factory: ${serviceName}`);
  }
  const deps = resolveDependencies(serviceName);
  const buildStarted = Date.now();
  const instance = factory(deps);
  if (!instance) {
    throw new Error(`Service load failed: ${serviceName}`);
  }
  if (DEBUG) {
    console.log(`[BOOT] ${serviceName} loaded in ${Date.now() - buildStarted}ms`);
  }
  if (BOOT_MODE === 'strict' && (typeof instance !== 'object' && typeof instance !== 'function')) {
    throw new Error(`Invalid service export for ${serviceName}`);
  }
  return instance;
}

function getService(name) {
  const serviceName = canonicalToFactoryKey(name);

  if (cache[serviceName]) {
    logSafe('cache-hit', { serviceName, loadedAt: firstLoadAt[serviceName] });
    return cache[serviceName];
  }

  if (loading.has(serviceName)) {
    throw new Error(`Circular dependency detected: ${serviceName}`);
  }

  const loadStarted = Date.now();
  loading.add(serviceName);

  try {
    const instance = buildService(serviceName);
    cache[serviceName] = instance;
    firstLoadAt[serviceName] = Date.now();
    logSafe('load', {
      serviceName,
      loadMs: Date.now() - loadStarted,
      firstLoadedAt: firstLoadAt[serviceName],
    });
    return instance;
  } catch (error) {
    const wrapped = new Error(
      `[BOOTSTRAP_ERROR]
service: ${serviceName}
message: ${error?.message || 'unknown_error'}
stack: ${error?.stack || 'no_stack'}`
    );
    logSafe('load-failed', {
      serviceName,
      loadMs: Date.now() - loadStarted,
      error: wrapped.message,
    });
    throw wrapped;
  } finally {
    loading.delete(serviceName);
  }
}

module.exports = { getService };


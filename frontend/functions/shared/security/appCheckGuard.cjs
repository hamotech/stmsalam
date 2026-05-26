/**
 * App Check for HTTPS callables + HTTP handlers.
 *
 * APP_CHECK_ENFORCE:
 *   unset / not "true" → log-only (default): never block on missing App Check
 *   "true"               → strict: restore blocking behavior for production
 *
 * Auth (request.auth, roles, etc.) is unchanged — only App Check attestation is optional here.
 */
module.exports = function createAppCheckGuard({ HttpsError } = {}) {
  if (typeof HttpsError !== 'function') {
    throw new Error('Service dependency violation: use bootstrap injection only');
  }

  function isEmulatorMode() {
    return String(process.env.FUNCTIONS_EMULATOR || '').toLowerCase() === 'true';
  }

  /** Strict only when explicitly enabled. Default: log-only. */
  function isStrictAppCheckEnabled() {
    return String(process.env.APP_CHECK_ENFORCE || '').toLowerCase() === 'true';
  }

  function appCheckMode() {
    return isStrictAppCheckEnabled() ? 'strict' : 'log-only';
  }

  function assertProductionSecurityMode() {
    if (isEmulatorMode()) return;
    if (String(process.env.APP_CHECK_DEV_BYPASS || '').toLowerCase() === 'true') {
      throw new Error(
        'APP_CHECK_DEV_BYPASS is not allowed outside emulator mode. Disable the flag in production.'
      );
    }
  }

  function isAppCheckBypassEnabled() {
    assertProductionSecurityMode();
    return isEmulatorMode();
  }

  function logSecurityEvent(eventType, payload = {}) {
    console.warn({
      event: String(eventType || 'SECURITY_EVENT'),
      timestamp: new Date().toISOString(),
      ...payload,
    });
  }

  /**
   * Callable HTTPS functions (onCall). Call sites unchanged.
   * Log-only: never throw. Strict: throw if request.app missing (unless emulator bypass).
   */
  function enforceCallableAppCheck(request, functionName) {
    const mode = appCheckMode();

    if (!isStrictAppCheckEnabled()) {
      if (request?.app) {
        console.log('[AppCheck] Callable - App Check present', {
          mode,
          functionName,
          ip: request?.rawRequest?.ip || null,
        });
      } else {
        console.warn('[AppCheck] Callable - App Check missing (allowed in dev mode)', {
          mode,
          functionName,
          ip: request?.rawRequest?.ip || null,
        });
      }
      console.log('[AppCheck] mode =', mode);
      return;
    }

    console.log('[AppCheck] mode =', mode);

    if (isAppCheckBypassEnabled()) return;

    if (!request?.app) {
      logSecurityEvent('APP_CHECK_FAILED', {
        functionName,
        ip: request?.rawRequest?.ip || null,
        mode,
      });
      throw new HttpsError('permission-denied', 'App Check failed: unauthorized request');
    }
  }

  /**
   * Raw HTTP Cloud Functions (e.g. Stripe checkout). Call sites unchanged.
   * Log-only: always return true; verify token when present for observability only.
   * Strict: 401 when missing/invalid (unless emulator bypass).
   */
  async function verifyHttpAppCheckOrThrow(admin, req, res, functionName) {
    const mode = appCheckMode();
    const token = String(req.headers['x-firebase-appcheck'] || '').trim();

    if (!isStrictAppCheckEnabled()) {
      console.log('[AppCheck] mode =', mode);

      if (!token) {
        console.warn('[AppCheck] HTTP - header missing (allowed in dev mode)', {
          mode,
          functionName,
          ip: req.ip || null,
        });
        return true;
      }

      try {
        await admin.appCheck().verifyToken(token);
        console.log('[AppCheck] HTTP - header valid', { mode, functionName, ip: req.ip || null });
      } catch (error) {
        console.warn('[AppCheck] HTTP - header invalid (allowed in dev mode)', {
          mode,
          functionName,
          ip: req.ip || null,
          reason: error?.message || String(error),
        });
      }
      return true;
    }

    console.log('[AppCheck] mode =', mode);

    if (isAppCheckBypassEnabled()) return true;

    if (!token) {
      logSecurityEvent('APP_CHECK_FAILED', {
        functionName,
        ip: req.ip || null,
        reason: 'missing_app_check_header',
        mode,
      });
      res.status(401).json({ error: 'App Check failed: unauthorized request' });
      return false;
    }

    try {
      await admin.appCheck().verifyToken(token);
      console.log('[AppCheck] HTTP - header valid', { mode, functionName, ip: req.ip || null });
      return true;
    } catch (error) {
      logSecurityEvent('APP_CHECK_FAILED', {
        functionName,
        ip: req.ip || null,
        reason: error?.message || 'verifyToken_failed',
        mode,
      });
      res.status(401).json({ error: 'App Check failed: unauthorized request' });
      return false;
    }
  }

  return {
    assertProductionSecurityMode,
    isAppCheckBypassEnabled,
    isStrictAppCheckEnabled,
    logSecurityEvent,
    enforceCallableAppCheck,
    verifyHttpAppCheckOrThrow,
  };
};

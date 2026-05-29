/**
 * Global Express error middleware + async route wrapper.
 *
 * - Catches unhandled async route errors
 * - Returns safe JSON (no stack traces in production)
 * - Maps TransitionServiceError codes to HTTP status codes
 */

import logger from './logger.js';

const IS_PRODUCTION = (process.env.NODE_ENV || '').toLowerCase() === 'production';

const TRANSITION_ERROR_STATUS_MAP = {
  INVALID_TRANSITION: 400,
  UNAUTHORIZED: 403,
  LOCKED: 409,
  LOCK_TIMEOUT: 503,
  LOCK_LOST: 500,
  LOCK_STALE: 500,
  TRANSITION_FAILED: 500,
};

/**
 * Wrap an async route handler so rejected promises are forwarded to Express error middleware.
 *
 * Usage: app.get('/path', asyncHandler(async (req, res) => { ... }))
 */
export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Global error handler — register as the LAST middleware.
 *
 * Express identifies error middleware by its 4-argument signature.
 */
// eslint-disable-next-line no-unused-vars
export function globalErrorHandler(err, req, res, _next) {
  const isTransitionError = err?.name === 'TransitionServiceError';
  const errorCode = isTransitionError ? err.code : undefined;
  const httpStatus = (errorCode && TRANSITION_ERROR_STATUS_MAP[errorCode]) || 500;

  logger.error('Unhandled route error', {
    requestId: req.requestId,
    method: req.method,
    path: req.path,
    errorCode: errorCode || undefined,
    message: err?.message || 'Unknown error',
    stack: IS_PRODUCTION ? undefined : err?.stack,
  });

  const responseBody = {
    error: err?.message || 'Internal server error',
    ...(errorCode ? { code: errorCode } : {}),
    requestId: req.requestId,
  };

  // Never leak stack traces in production
  if (!IS_PRODUCTION && err?.stack) {
    responseBody.stack = err.stack;
  }

  if (!res.headersSent) {
    res.status(httpStatus).json(responseBody);
  }
}

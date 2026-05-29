import { randomUUID } from 'crypto';
import logger from './logger.js';

/**
 * Attaches or extracts a correlation X-Request-ID for tracing asynchronous lifecycles.
 */
export function requestTracingMiddleware(req, res, next) {
  const traceId = req.headers['x-request-id'] || req.headers['x-correlation-id'] || randomUUID();
  req.requestId = traceId;
  res.setHeader('X-Request-ID', traceId);
  next();
}

/**
 * Standardized logging of route entry and exit with duration/latency profiling.
 */
export function requestLoggerMiddleware(req, res, next) {
  const start = Date.now();
  const { method, url, ip } = req;

  logger.info(`Incoming request: ${method} ${url}`, {
    requestId: req.requestId,
    method,
    url,
    ip,
  });

  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;
    logger.info(`Response completed: ${method} ${url} status=${res.statusCode} duration=${duration}ms`, {
      requestId: req.requestId,
      method,
      url,
      statusCode: res.statusCode,
      durationMs: duration,
    });
    return originalSend.apply(this, arguments);
  };

  next();
}

/**
 * Enforces API timeout limits to fail-fast under load and prevent thread stagnation.
 */
export function timeoutMiddleware(timeoutMs = 15000) {
  return (req, res, next) => {
    const timer = setTimeout(() => {
      if (!res.headersSent) {
        logger.error(`API Request Timeout: ${req.method} ${req.url} exceeded ${timeoutMs}ms`, {
          requestId: req.requestId,
          method: req.method,
          url: req.url,
        });
        res.status(503).json({
          error: 'Service Unavailable',
          message: 'The request took too long to process and timed out.',
          requestId: req.requestId,
        });
      }
    }, timeoutMs);

    res.on('finish', () => clearTimeout(timer));
    res.on('close', () => clearTimeout(timer));
    next();
  };
}

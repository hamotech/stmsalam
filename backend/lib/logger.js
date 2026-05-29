/**
 * Production-safe logger.
 *
 * - Structured JSON in production (NODE_ENV=production)
 * - Human-readable in development
 * - Debug logs suppressed in production
 * - Zero external dependencies
 */

const IS_PRODUCTION = (process.env.NODE_ENV || '').toLowerCase() === 'production';

function formatPayload(level, message, data) {
  if (IS_PRODUCTION) {
    return JSON.stringify({
      level,
      message,
      ...(data && typeof data === 'object' ? data : {}),
      timestamp: new Date().toISOString(),
    });
  }
  return data ? `[${level.toUpperCase()}] ${message}` : `[${level.toUpperCase()}] ${message}`;
}

const logger = {
  info(message, data) {
    const formatted = formatPayload('info', message, data);
    if (data && !IS_PRODUCTION) {
      console.log(formatted, data);
    } else {
      console.log(formatted);
    }
  },

  warn(message, data) {
    const formatted = formatPayload('warn', message, data);
    if (data && !IS_PRODUCTION) {
      console.warn(formatted, data);
    } else {
      console.warn(formatted);
    }
  },

  error(message, data) {
    const formatted = formatPayload('error', message, data);
    if (data && !IS_PRODUCTION) {
      console.error(formatted, data);
    } else {
      console.error(formatted);
    }
  },

  debug(message, data) {
    if (IS_PRODUCTION) return;
    const formatted = formatPayload('debug', message, data);
    if (data) {
      console.log(formatted, data);
    } else {
      console.log(formatted);
    }
  },
};

export default logger;

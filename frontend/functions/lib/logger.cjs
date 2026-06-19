// logger.cjs
const admin = require('firebase-admin');

// Collection where structured logs are stored. Adjust if you prefer Cloud Logging instead.
const LOG_COLLECTION = 'debugLogs';

/**
 * Structured logger used by Firebase Functions.
 *
 * @param {Object} params
 * @param {'info'|'warn'|'error'} [params.level='info'] Log severity.
 * @param {string} params.service Name of the service/function (e.g. 'onlineCheckout').
 * @param {string} params.event   Short identifier of the event (e.g. 'checkoutStart').
 * @param {Object} params.payload Payload or context to store (will be serialized as JSON).
 * @param {string} [params.requestId] Correlation ID passed through the request flow.
 */
function log({ level = 'info', service = 'unknown', event = '', payload = {}, requestId = '' } = {}) {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    service,
    event,
    requestId,
    payload,
  };

  // Persist to Firestore – fire‑and‑forget, never block the function.
  try {
    const db = admin.firestore();
    db.collection(LOG_COLLECTION).add(entry).catch(err => {
      console.error('Failed to write debug log to Firestore:', err);
    });
  } catch (e) {
    // In unit‑tests or environments where admin isn’t initialized.
    console.error('Logger initialization error:', e);
  }

    // Forward critical errors to Cloud Logging (Google Cloud Logging) when level is error
  if (level === 'error') {
    try {
      const logging = admin.logging();
      const cloudEntry = logging.entry({ severity: 'ERROR', resource: { type: 'cloud_function', labels: { function_name: service } } }, entry);
      logging.write(cloudEntry).catch(err => {
        console.error('Failed to write error to Cloud Logging:', err);
      });
    } catch (e) {
      console.error('Cloud Logging integration error:', e);
    }
  }
  // Also emit a human‑readable line for local debugging / emulator logs.
  console.log(`[${level.toUpperCase()}] [${service}] ${event}`, entry);
}

/**
 * Helper for error logging – records the error stack and message.
 */
function error({ service, event, error, payload = {}, requestId = '' } = {}) {
  const errPayload = {
    ...payload,
    errorMessage: error?.message || String(error),
    errorStack: error?.stack || null,
  };
  log({ level: 'error', service, event, payload: errPayload, requestId });
}

module.exports = { log, error };

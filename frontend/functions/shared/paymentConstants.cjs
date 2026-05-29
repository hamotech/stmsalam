// Shared canonical payment mode definitions
const VALID_PAYMENT_MODES = ['COD', 'SCANNER', 'STRIPE'];

const PAYMENT_MODE = {
  COD: 'COD',
  SCANNER: 'SCANNER',
  STRIPE: 'STRIPE',
};

const aliasMap = {
  // COD aliases
  CASH: 'COD',
  CASHONDELIVERY: 'COD',
  COD: 'COD',
  // SCANNER aliases
  SCANNER: 'SCANNER',
  SCANPAY: 'SCANNER',
  PAYNOW: 'SCANNER',
  QR: 'SCANNER',
  SGQR: 'SCANNER',
  // STRIPE aliases (including legacy ONLINE)
  STRIPE: 'STRIPE',
  ONLINE: 'STRIPE',
  CARD: 'STRIPE',
  // WALLET aliases
// WALLET aliases removed
// BALANCE alias removed
};

/**
 * Normalizes a raw payment identifier to a canonical mode.
 * Throws if the identifier is not recognised.
 */
function normalizePaymentMode(raw) {
  const key = String(raw || '')
    .trim()
    .toUpperCase()
    .replace(/[\s_-]+/g, '');
  const canonical = aliasMap[key];
  if (canonical) return canonical;
  console.warn(`[normalizePaymentMode] Invalid/empty payment mode raw="${raw}". Falling back to COD.`);
  return 'COD';
}

module.exports = {
  VALID_PAYMENT_MODES,
  PAYMENT_MODE,
  aliasMap,
  normalizePaymentMode,
};

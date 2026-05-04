export function safeLog(label, data) {
  try {
    console.log(label, data);
  } catch {
    // no-op: logging must never break runtime
  }
}

export function normalizePhone(rawPhone, defaultCountryCode = '+65') {
  const raw = String(rawPhone || '').trim();
  if (!raw) return '';
  const compact = raw.replace(/\s+/g, '');
  if (compact.startsWith('+')) return compact;
  const digits = compact.replace(/[^\d]/g, '');
  if (!digits) return '';
  if (digits.startsWith('65')) return `+${digits}`;
  return `${defaultCountryCode}${digits}`;
}

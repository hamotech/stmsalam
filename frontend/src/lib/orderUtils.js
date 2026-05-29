export function normalizeLegacyOrder(order) {
  const normalized = { ...order };

  // Normalize paymentMethod
  const rawPm = normalized.paymentMethod ?? normalized.payment_method;
  const rawPMode = normalized.paymentMode ?? normalized.payment_mode;
  
  let paymentMethod = rawPm;
  if (paymentMethod == null || String(paymentMethod).trim() === '' || String(paymentMethod).toUpperCase() === 'NULL') {
    paymentMethod = rawPMode ?? 'COD';
  }
  // Standardize Cash to COD
  if (String(paymentMethod).toUpperCase() === 'CASH') {
    paymentMethod = 'COD';
  }
  normalized.paymentMethod = paymentMethod;

  // Normalize paymentStatus
  let paymentStatus = normalized.paymentStatus ?? normalized.payment_status;
  if (paymentStatus == null || String(paymentStatus).trim() === '' || String(paymentStatus).toUpperCase() === 'NULL') {
    paymentStatus = (paymentMethod === 'COD' || paymentMethod === 'CASH') ? 'COD_PENDING' : 'PENDING';
  }
  
  // Convert COD + PENDING -> COD_PENDING
  if ((paymentMethod === 'COD' || paymentMethod === 'CASH') && paymentStatus === 'PENDING') {
    paymentStatus = 'COD_PENDING';
  }

  normalized.paymentStatus = paymentStatus;

  return normalized;
}


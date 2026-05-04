/**
 * Password-reset funnel — no email, no oobCode, no passwords.
 * Plug in Firebase Analytics / your provider inside `forward` if needed.
 */

export type PasswordResetTelemetryEvent =
  | 'password_reset_requested'
  | 'password_reset_success'
  | 'password_reset_failed'
  | 'password_reset_deep_link_opened'
  | 'password_reset_confirm_success'
  | 'password_reset_confirm_failed';

function forward(
  name: PasswordResetTelemetryEvent,
  params?: { code?: string }
): void {
  // Example: getAnalytics(app); logEvent(analytics, name, params);
  if (__DEV__) {
    const safe = params?.code ? { code: params.code } : undefined;
    console.debug(`[STM:telemetry] ${name}`, safe ?? '');
  }
}

/** Firebase auth error code only (e.g. auth/network-request-failed) — safe for dashboards. */
export function logPasswordResetEvent(
  name: PasswordResetTelemetryEvent,
  params?: { code?: string }
): void {
  const code = params?.code;
  if (code && !/^auth\/[a-z0-9-]+$/.test(code)) {
    forward(name, { code: 'auth/unknown' });
    return;
  }
  forward(name, code ? { code } : undefined);
}

export function logPasswordResetRequested(): void {
  logPasswordResetEvent('password_reset_requested');
}

export function logPasswordResetSendOutcome(success: boolean, errorCode?: string): void {
  if (success) {
    logPasswordResetEvent('password_reset_success');
  } else if (errorCode) {
    logPasswordResetEvent('password_reset_failed', { code: errorCode });
  } else {
    logPasswordResetEvent('password_reset_failed');
  }
}

export function logPasswordResetDeepLinkOpened(): void {
  logPasswordResetEvent('password_reset_deep_link_opened');
}

export function logPasswordResetConfirmOutcome(success: boolean, errorCode?: string): void {
  if (success) {
    logPasswordResetEvent('password_reset_confirm_success');
  } else if (errorCode) {
    logPasswordResetEvent('password_reset_confirm_failed', { code: errorCode });
  } else {
    logPasswordResetEvent('password_reset_confirm_failed');
  }
}

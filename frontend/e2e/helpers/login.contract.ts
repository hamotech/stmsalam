/**
 * Hard contract for login observability (optional caller — does not run unless invoked).
 * Call with a single concatenated browser-console blob from a login attempt session.
 */

const AUTH_FLOW_MARKERS = ['[AUTH_START]', '[AUTH_SUCCESS]', '[AUTH_FAIL]'] as const

/**
 * When a login attempt occurred (`[AUTH_START]` present), every auth-flow line must
 * include `reqId`, and the flow must terminate with success or failure (not hang silently).
 */
export function assertLoginCriticalSignals(logs: string): void {
  const text = typeof logs === 'string' ? logs : ''
  if (!text.includes('[AUTH_START]')) {
    return
  }

  const hasTerminal = text.includes('[AUTH_SUCCESS]') || text.includes('[AUTH_FAIL]')
  if (!hasTerminal) {
    throw new Error('LOGIN REGRESSION DETECTED - AUTH SIGNAL BROKEN')
  }

  for (const line of text.split('\n')) {
    const isAuthFlowLine = AUTH_FLOW_MARKERS.some((m) => line.includes(m))
    if (!isAuthFlowLine) continue
    if (!line.includes('reqId')) {
      throw new Error('LOGIN REGRESSION DETECTED - AUTH SIGNAL BROKEN')
    }
  }
}

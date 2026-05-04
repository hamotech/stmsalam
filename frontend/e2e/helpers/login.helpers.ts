import { expect, type Page } from '@playwright/test'
import { assertLoginCriticalSignals } from './login.contract'

/** Stable selectors — tests fail loudly if product removes data-testids */
export const LOGIN = {
  email: 'login-email-input',
  password: 'login-password-input',
  submit: 'login-submit-button',
  registerTab: 'login-register-button',
  forgot: 'login-forgot-password',
} as const

/** Skip reason surfaced in reports when secrets are absent */
export const SKIP_REAL_AUTH_MESSAGE = 'Skipping real auth tests - missing credentials'

/** Defaults aligned with login redirect + console timing (documented for CI tuning). */
export const E2E_AUTH_NAV_TIMEOUT_MS = 45_000
export const E2E_AUTH_LOG_POLL_TIMEOUT_MS = 45_000

/** POST — Identity Toolkit host + URL path containing `accounts` */
const IDENTITY_TOOLKIT = /identitytoolkit\.googleapis\.com/i
const ACCOUNTS_SEGMENT = /identitytoolkit\.googleapis\.com[^?#]*accounts/i
const ACCOUNTS_RPC_NAME = /accounts:([a-zA-Z0-9]+)/i

export type IdentityToolkitAccountsMetrics = {
  signInWithPassword: number
  lookup: number
  signUp: number
  otherAccounts: number
  totalPosts: number
}

function parseAccountsRpcName(url: string): string | null {
  if (typeof url !== 'string') return null
  const m = url.match(ACCOUNTS_RPC_NAME)
  return m && m[1] ? m[1].toLowerCase() : null
}

export function isIdentityToolkitAccountsPost(url: string, method: string): boolean {
  if (typeof url !== 'string' || url.length === 0) return false
  if (typeof method !== 'string' || method !== 'POST') return false
  if (!IDENTITY_TOOLKIT.test(url)) return false
  return ACCOUNTS_SEGMENT.test(url)
}

/** @deprecated use isIdentityToolkitAccountsPost */
export function isFirebasePasswordSignInUrl(url: string): boolean {
  return isIdentityToolkitAccountsPost(url, 'POST') && parseAccountsRpcName(url) === 'signinwithpassword'
}

/**
 * Final teardown snapshot — exactly once per recorder lifecycle.
 * Violations → LOGIN REGRESSION DETECTED - AUTH SIGNAL BROKEN (login.contract.ts)
 */
function finalizeLoginContract(buffer: string[]): void {
  const blob = buffer.join('\n')
  if (
    typeof blob === 'string' &&
    blob.includes('[AUTH_START]') &&
    (blob.includes('[AUTH_SUCCESS]') || blob.includes('[AUTH_FAIL]'))
  ) {
    assertLoginCriticalSignals(blob)
  }
}

/** After password sign-in RPC observed, forbid lookup/signUp/other accounts POSTs on same page session */
function assertNoUnexpectedAccountsDuringSignIn(m: IdentityToolkitAccountsMetrics): void {
  if (m.signInWithPassword < 1) return
  const unexpected = m.lookup + m.signUp + m.otherAccounts
  if (unexpected > 0 || m.totalPosts !== m.signInWithPassword) {
    throw new Error(
      'LOGIN REGRESSION DETECTED - AUTH SIGNAL BROKEN — unexpected Identity Toolkit accounts:* POST during login flow',
    )
  }
}

export async function expectLoginShell(page: Page): Promise<void> {
  await expect(page.getByTestId(LOGIN.email)).toBeVisible()
  await expect(page.getByTestId(LOGIN.password)).toBeVisible()
  await expect(page.getByTestId(LOGIN.submit)).toBeVisible()
  await expect(page.getByTestId(LOGIN.registerTab)).toBeVisible()
  await expect(page.getByTestId(LOGIN.forgot)).toBeVisible()
}

/**
 * Collects console logs; runs assertLoginCriticalSignals once at teardown (page/context close or detach).
 */
export function attachConsoleRecorder(page: Page) {
  const buffer: string[] = []
  let finalized = false

  const runFinalizeOnce = () => {
    if (finalized) return
    finalized = true
    finalizeLoginContract(buffer)
  }

  const handler = (msg: { type: () => string; text: () => string }) => {
    try {
      const t = msg.type()
      if (t === 'log' || t === 'info' || t === 'error' || t === 'warning' || t === 'debug') {
        const raw = typeof msg.text === 'function' ? msg.text() : ''
        buffer.push(String(raw))
      }
    } catch {
      buffer.push('[stm-e2e:console-capture-error]')
    }
  }

  page.on('console', handler)
  page.once('close', runFinalizeOnce)
  try {
    page.context().once('close', runFinalizeOnce)
  } catch {
    /* no context */
  }

  return {
    lines: () => buffer.slice(),
    text: () => buffer.join('\n'),
    detach: () => {
      runFinalizeOnce()
      try {
        page.off('console', handler)
      } catch {
        /* detached page / closed context */
      }
    },
  }
}

/**
 * Identity Toolkit POST counter (`identitytoolkit.googleapis.com…accounts…`).
 * Classifies signInWithPassword | lookup | signUp | otherAccounts.
 */
export function attachFirebasePasswordSignInCounter(page: Page) {
  const metrics: IdentityToolkitAccountsMetrics = {
    signInWithPassword: 0,
    lookup: 0,
    signUp: 0,
    otherAccounts: 0,
    totalPosts: 0,
  }

  const handler = (req: { method?: () => string; url?: () => string }) => {
    try {
      let method = ''
      try {
        method = typeof req.method === 'function' ? String(req.method()) : ''
      } catch {
        return
      }
      if (!method || method !== 'POST') return

      let u = ''
      try {
        u = typeof req.url === 'function' ? req.url() : ''
      } catch {
        return
      }
      if (typeof u !== 'string' || !u) return
      if (!isIdentityToolkitAccountsPost(u, method)) return

      metrics.totalPosts += 1
      const rpc = parseAccountsRpcName(u)
      if (rpc === 'signinwithpassword') {
        metrics.signInWithPassword += 1
      } else if (rpc === 'lookup') {
        metrics.lookup += 1
      } else if (rpc === 'signup') {
        metrics.signUp += 1
      } else if (rpc) {
        metrics.otherAccounts += 1
      } else {
        metrics.otherAccounts += 1
      }
    } catch {
      /* never throw from listener */
    }
  }

  page.on('request', handler)

  return {
    getCount: () => metrics.signInWithPassword,
    getMetrics: (): Readonly<IdentityToolkitAccountsMetrics> => ({ ...metrics }),
    detach: () => {
      try {
        assertNoUnexpectedAccountsDuringSignIn(metrics)
      } finally {
        try {
          page.off('request', handler)
        } catch {
          /* no-op */
        }
      }
    },
  }
}

/** `[AUTH_*]` lines must carry `reqId` (UUID or fallback `req_*`). */
export function assertAuthLogHasReqId(authLine: string | undefined): void {
  expect(authLine, '[AUTH_*] console line must exist and include reqId').toBeTruthy()
  const line = authLine as string
  expect(line).toMatch(/reqId/)
  expect(line).toMatch(/req_[a-zA-Z0-9_-]+|[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i)
}

export function assertLogsExcludePassword(blob: string, passwordLiteral: string): void {
  if (typeof blob !== 'string') {
    expect(blob).toBeTruthy()
    return
  }
  expect(passwordLiteral.length).toBeGreaterThan(3)
  expect(blob).not.toContain(passwordLiteral)
}

export function findLineContaining(blob: string, needle: string): string | undefined {
  if (typeof blob !== 'string') return undefined
  return blob.split('\n').find((line) => line.includes(needle))
}

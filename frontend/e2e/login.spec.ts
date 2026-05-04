import { expect, test } from '@playwright/test'
import {
  LOGIN,
  SKIP_REAL_AUTH_MESSAGE,
  assertAuthLogHasReqId,
  assertLogsExcludePassword,
  attachConsoleRecorder,
  attachFirebasePasswordSignInCounter,
  expectLoginShell,
  findLineContaining,
} from './helpers/login.helpers'

/**
 * Real Firebase — provide credentials:
 *   STM_E2E_LOGIN_EMAIL
 *   STM_E2E_LOGIN_PASSWORD
 *
 * Dev server must preserve console (vite: console drop only in production build).
 *
 * BASE_URL overrides default http://localhost:3000
 */

const E2E_EMAIL = process.env.STM_E2E_LOGIN_EMAIL ?? ''
const E2E_PASSWORD = process.env.STM_E2E_LOGIN_PASSWORD ?? ''
const WRONG_PASSWORD = `StmSalamWrong_${Date.now()}_e2e`

test.describe('Login Flow', () => {
  test('selectors exist — fail fast if UI regresses', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })
    await expectLoginShell(page)
  })

  test('valid login — navigates away, no auth error banner, console AUTH_SUCCESS + reqId', async ({
    page,
  }) => {
    test.skip(!E2E_EMAIL || !E2E_PASSWORD, SKIP_REAL_AUTH_MESSAGE)

    const recorder = attachConsoleRecorder(page)
    await page.goto('/login', { waitUntil: 'domcontentloaded' })
    await expectLoginShell(page)

    await page.getByTestId(LOGIN.email).fill(E2E_EMAIL)
    await page.getByTestId(LOGIN.password).fill(E2E_PASSWORD)

    await Promise.all([
      page.waitForURL((url) => !url.pathname.endsWith('/login'), { timeout: 45_000 }),
      page.getByTestId(LOGIN.submit).click(),
    ])

    await expect(page.getByText(/invalid account|incorrect password|sign-in failed/i)).toHaveCount(0)

    const blob = recorder.text()
    const successLine = findLineContaining(blob, '[AUTH_SUCCESS]')
    expect(successLine, 'console must include [AUTH_SUCCESS]').toBeTruthy()
    assertAuthLogHasReqId(successLine!)
    assertLogsExcludePassword(blob, E2E_PASSWORD)

    const startLine = findLineContaining(blob, '[AUTH_START]')
    expect(startLine).toBeTruthy()
    assertAuthLogHasReqId(startLine!)
  })

  test('invalid password — error visible, stays on /login, AUTH_FAIL + reqId', async ({ page }) => {
    test.skip(!E2E_EMAIL, SKIP_REAL_AUTH_MESSAGE)

    const recorder = attachConsoleRecorder(page)
    await page.goto('/login', { waitUntil: 'domcontentloaded' })
    await expectLoginShell(page)

    await page.getByTestId(LOGIN.email).fill(E2E_EMAIL)
    await page.getByTestId(LOGIN.password).fill(WRONG_PASSWORD)

    await page.getByTestId(LOGIN.submit).click()

    await expect(page).toHaveURL(/\/login/)
    await expect(
      page.getByRole('alert').filter({ hasText: /invalid account|incorrect password|credentials|try again|locked|network/i }),
    ).toBeVisible()

    await expect(page.getByTestId(LOGIN.submit)).toBeEnabled()

    await expect
      .poll(() => findLineContaining(recorder.text(), '[AUTH_FAIL]') !== undefined)
      .toBe(true)

    const failLine = findLineContaining(recorder.text(), '[AUTH_FAIL]')!
    assertAuthLogHasReqId(failLine)
    assertLogsExcludePassword(recorder.text(), WRONG_PASSWORD)

    const startLine = findLineContaining(recorder.text(), '[AUTH_START]')
    expect(startLine).toBeTruthy()
    assertAuthLogHasReqId(startLine!)
  })

  test('empty form — field validation, no Firebase sign-in request', async ({ page }) => {
    const recorder = attachConsoleRecorder(page)
    const counter = attachFirebasePasswordSignInCounter(page)
    try {
      await page.goto('/login', { waitUntil: 'domcontentloaded' })
      await expectLoginShell(page)

      await page.getByTestId(LOGIN.submit).click()

      await expect(page.locator('#login-email-error')).toContainText(/required|email/i)
      await expect(page.locator('#login-password-error')).toContainText(/required|password/i)
      await expect(page).toHaveURL(/\/login$/)

      await expect.poll(() => counter.getCount()).toBe(0)
      expect(recorder.text()).not.toContain('[AUTH_START]')
    } finally {
      counter.detach()
    }
  })

  test('offline mode — message, no AUTH_START, submit re-enabled', async ({ page, context }) => {
    test.skip(!E2E_EMAIL, SKIP_REAL_AUTH_MESSAGE)

    const recorder = attachConsoleRecorder(page)
    await page.goto('/login', { waitUntil: 'domcontentloaded' })
    await expectLoginShell(page)

    await page.getByTestId(LOGIN.email).fill(E2E_EMAIL)
    await page.getByTestId(LOGIN.password).fill('offline-placeholder-1')

    await context.setOffline(true)
    try {
      await page.getByTestId(LOGIN.submit).click()

      await expect(page.getByRole('alert').filter({ hasText: /No internet connection/i })).toBeVisible()

      expect(recorder.text()).not.toContain('[AUTH_START]')

      await expect(page.getByTestId(LOGIN.submit)).toBeEnabled()
    } finally {
      await context.setOffline(false)
    }
  })

  test('spam click protection — single Firebase password sign-in request', async ({ page }) => {
    test.skip(!E2E_EMAIL, SKIP_REAL_AUTH_MESSAGE)

    const recorder = attachConsoleRecorder(page)
    const counter = attachFirebasePasswordSignInCounter(page)
    try {
      await page.goto('/login', { waitUntil: 'domcontentloaded' })
      await expectLoginShell(page)

      await page.getByTestId(LOGIN.email).fill(E2E_EMAIL)
      await page.getByTestId(LOGIN.password).fill(WRONG_PASSWORD)

      const btn = page.getByTestId(LOGIN.submit)
      await expect(btn).toBeEnabled()

      await Promise.all([
        btn.click(),
        btn.click(),
        btn.click(),
        btn.click(),
        btn.click(),
      ])

      await expect.poll(() => counter.getCount()).toBe(1)

      await expect
        .poll(() => findLineContaining(recorder.text(), '[AUTH_FAIL]') !== undefined)
        .toBe(true)

      await expect(btn).toBeEnabled({ timeout: 45_000 })
    } finally {
      counter.detach()
    }
  })

  test('Enter key from password — submits once like button', async ({ page }) => {
    test.skip(!E2E_EMAIL, SKIP_REAL_AUTH_MESSAGE)

    const counter = attachFirebasePasswordSignInCounter(page)
    try {
      await page.goto('/login', { waitUntil: 'domcontentloaded' })
      await expectLoginShell(page)

      await page.getByTestId(LOGIN.email).fill(E2E_EMAIL)
      const pwd = page.getByTestId(LOGIN.password)
      await pwd.fill(WRONG_PASSWORD)
      await pwd.focus()
      await pwd.press('Enter')

      await expect.poll(() => counter.getCount()).toBe(1)
      await expect(page).toHaveURL(/\/login/)
    } finally {
      counter.detach()
    }
  })

  test('accessibility — aria-invalid, aria-describedby, role=alert on field errors', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })
    await expectLoginShell(page)

    await page.getByTestId(LOGIN.submit).click()

    const emailInput = page.locator('#login-email')
    const passwordInput = page.locator('#login-password')

    await expect(emailInput).toHaveAttribute('aria-invalid', 'true')
    await expect(emailInput).toHaveAttribute('aria-describedby', 'login-email-error')

    await expect(passwordInput).toHaveAttribute('aria-invalid', 'true')
    await expect(passwordInput).toHaveAttribute('aria-describedby', 'login-password-error')

    await expect(page.locator('#login-email-error')).toHaveAttribute('role', 'alert')
    await expect(page.locator('#login-password-error')).toHaveAttribute('role', 'alert')
  })

  test('navigation — Register tab shows registration form (SPA stays on /login)', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })
    await expectLoginShell(page)

    await page.getByTestId(LOGIN.registerTab).click()

    await expect(page).toHaveURL(/\/login/)
    await expect(page.getByRole('heading', { name: /create account/i })).toBeVisible()
    await expect(page.locator('#register-email')).toBeVisible()
  })

  test('navigation — Forgot password remains on /login with inline validation', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })
    await expectLoginShell(page)

    await page.getByTestId(LOGIN.forgot).click()

    await expect(page).toHaveURL(/\/login/)
    await expect(page.getByRole('alert').filter({ hasText: /Enter your email first to receive a reset link/i })).toBeVisible()
  })
})

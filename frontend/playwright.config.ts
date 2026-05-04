import { defineConfig, devices } from '@playwright/test'

/**
 * Base URL configurable via BASE_URL (default http://localhost:3000).
 * CI sets BASE_URL; Playwright `webServer.url` waits until this URL responds (HTTP probe).
 * Local: npm run dev -- --port 3000
 */
const baseURL = process.env.BASE_URL ?? 'http://localhost:3000'
const isCI = !!process.env.CI

export default defineConfig({
  testDir: './e2e',
  globalSetup: './e2e/global-setup.ts',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  /** Single worker in CI reduces Firebase rate-limit flakiness; local uses Playwright default. */
  workers: isCI ? 1 : undefined,
  /** Stop after first failure in CI for faster signal (fail-fast gate). */
  maxFailures: isCI ? 1 : undefined,
  reporter: isCI
    ? [['github'], ['list'], ['html', { open: 'never' }]]
    : [['list'], ['html', { open: 'never' }]],
  timeout: 60_000,
  expect: {
    /** Login redirect + Firebase can exceed 15s under CI load. */
    timeout: isCI ? 20_000 : 15_000,
  },
  use: {
    ...devices['Desktop Chrome'],
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: isCI ? 20_000 : 15_000,
    navigationTimeout: isCI ? 45_000 : 30_000,
  },
  /**
   * Built-in server wait: Playwright polls `url` until it returns a successful status (2xx/3xx).
   * Must match Vite --port 3000 and BASE_URL host.
   */
  webServer: {
    command: 'npm run dev -- --port 3000 --strictPort',
    url: baseURL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
})

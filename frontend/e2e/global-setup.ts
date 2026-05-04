import type { FullConfig } from '@playwright/test'

/**
 * Runs after Playwright starts `webServer` (Vite).
 * Fetch-only gate: deterministic shell markers only (no loose page-text heuristics like product copy).
 */

const FETCH_TIMEOUT_MS = 10_000
const MAX_ATTEMPTS = 30
const DELAY_MS = 1000

function abortSignal(): AbortSignal {
  if (typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function') {
    return AbortSignal.timeout(FETCH_TIMEOUT_MS)
  }
  const c = new AbortController()
  setTimeout(() => c.abort(), FETCH_TIMEOUT_MS)
  return c.signal
}

/** Opening tag only — avoids matching unrelated “root” strings in prose */
const ROOT_MOUNT_OPEN = /<div\s+id\s*=\s*["']root["']\s*>/i
const VITE_MODULE_BOOT = /<script\s+[^>]*type\s*=\s*["']module["']/i

/** Strict `window.APP_READY === true` or boolean assignment (no bare “APP_READY” substring) */
const WINDOW_APP_READY_STRICT =
  /window(?:\s*\.\s*|\[["'])APP_READY(?:["']\])?\s*(?:===|=)\s*(?:true\b)/

const DATA_TEST_APP_READY = /data-testid\s*=\s*["']app-ready["']/i

/**
 * Accept ONE of:
 * - Real SPA shell: `#root` mount + `type="module"` bootstrap (hydration validated later by Playwright tests).
 * - Explicit readiness token in HTML source only if present.
 */
function hasDeterministicAppShell(html: string): boolean {
  if (typeof html !== 'string') return false
  if (ROOT_MOUNT_OPEN.test(html) && VITE_MODULE_BOOT.test(html)) return true
  if (WINDOW_APP_READY_STRICT.test(html)) return true
  if (DATA_TEST_APP_READY.test(html)) return true
  return false
}

async function globalSetup(_config: FullConfig): Promise<void> {
  const base = (process.env.BASE_URL ?? 'http://localhost:3000').replace(/\/$/, '')
  const loginUrl = `${base}/login`

  let lastError: Error | null = null

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await fetch(loginUrl, {
        method: 'GET',
        redirect: 'follow',
        signal: abortSignal(),
      })
      if (!res.ok) {
        lastError = new Error(`HTTP ${res.status} for ${loginUrl}`)
      } else {
        const text = await res.text()
        if (hasDeterministicAppShell(text)) {
          console.log(`[global-setup] Ready (${loginUrl}, attempt ${attempt}/${MAX_ATTEMPTS})`)
          return
        }
        lastError = new Error('HTTP 200 but deterministic shell/readiness markers missing')
      }
    } catch (e) {
      lastError = e instanceof Error ? e : new Error(String(e))
    }
    await new Promise((r) => setTimeout(r, DELAY_MS))
  }

  throw new Error(
    `[GLOBAL_SETUP] APP NOT READY - DETECTED NO RUNTIME MOUNT POINT${lastError?.message ? ` | detail: ${lastError.message}` : ''}`,
  )
}

export default globalSetup

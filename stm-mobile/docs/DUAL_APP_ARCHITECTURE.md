# Dual-app architecture (Expo v1 + `src_v2`)

## Entry flow

1. **`index.js`** — Metro entry only delegates to `bootstrap()` (no branching logic here).
2. **`src/bootstrap/loadApp.ts`** — Decides v1 vs v2 using **`isUseNewApp()`** from `appMode.ts`.
3. **v1 (default)** — `require("expo-router/entry")` (production STM app under `app/`).
4. **v2 (opt-in)** — `require("../../../src_v2/AppV2").default` then `registerRootComponent(AppV2)`.

All `require()` paths **must be string literals**. Metro does not support `require(dynamicPath)`.

## Enabling v2

Set in **`.env`** (see `.env.example`):

```bash
EXPO_PUBLIC_USE_NEW_APP=true
```

Unset or any other value → v1 (Expo Router).

## Isolation rules for `src_v2`

- **Do not import** from **`stm-mobile/app/**`** (Expo Router file-based routes). v2 must not depend on v1 screens or layouts.
- **Avoid** importing from **`stm-mobile/src/**`** except for narrowly defined shared infrastructure. Today there is legacy coupling (e.g. Firestore in `src_v2/data/services/order/index.js`); treat that as **technical debt** and prefer a future shared package (e.g. `packages/firebase-client`) or a duplicated thin init inside `src_v2`.
- Shared **design tokens / pure utilities** may be allowlisted over time; document any new cross-import in this file.

## Verification

- **npm run check:metro-entry** — fails on non-literal `require()` in tracked source.
- **ESLint** — warns on `require()` whose first argument is not a string literal (`no-restricted-syntax`).

## Metro monorepo note

`metro.config.js` adds the **repository root** to **`watchFolders`** so `src_v2` (sibling of `stm-mobile`) resolves reliably.

## Future: separate Expo app (`app-v2`)

To fully isolate bundles in CI:

1. Add a second Expo project (e.g. `stm-mobile-v2/`) with `main` pointing at a tiny `index.js` that only registers `src_v2/AppV2`, **or**
2. Use **EAS Build profiles** with different `entryFile` / env and duplicate `app.config` as needed.

Until then, the env flag + single Metro graph is the supported approach.

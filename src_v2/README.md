# STM `src_v2` (alternate app branch)

## Boundaries

- **Must not** import from **`stm-mobile/app/`** (Expo Router tree).
- Prefer keeping all UI, navigation, and data access under **`src_v2/`**.
- Imports from **`stm-mobile/src/**`** are **discouraged**; existing exceptions should be removed in favor of shared packages or local duplicates.

## Entry

Loaded only when **`EXPO_PUBLIC_USE_NEW_APP=true`** in `stm-mobile` (see `stm-mobile/docs/DUAL_APP_ARCHITECTURE.md`).

The Metro `require` path from the mobile app is a **string literal**: `../../../src_v2/AppV2`.

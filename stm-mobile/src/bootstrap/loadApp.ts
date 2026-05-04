/**
 * Metro-safe app bootstrap: every `require()` uses a string literal path only.
 * Do not use computed paths, variables, or `import()` for the v2 entry — Metro will reject them.
 *
 * v2 lives at repo root `src_v2/` (sibling of `stm-mobile/`). Resolution path is relative to this file.
 */

import { registerRootComponent } from 'expo';
import { isUseNewApp } from './appMode';

export function bootstrap(): void {
  if (!isUseNewApp()) {
    require('expo-router/entry');
    return;
  }

  try {
    const AppV2 = require('../../../src_v2/AppV2').default;
    registerRootComponent(AppV2);
  } catch (err) {
    console.error('[stm-mobile/bootstrap] AppV2 failed to load; falling back to Expo Router.', err);
    require('expo-router/entry');
  }
}

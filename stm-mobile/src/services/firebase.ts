/**
 * src/services/firebase.ts
 * Firebase initialization — STM Mobile customer app.
 *
 * Console registration: project **teh-tarik-app-my-own** (project #239722784519),
 * web app **teh-tarik-web** (app id ending in d4c7a2).
 *
 * All Firebase **identity** below is hardcoded. Do not use EXPO_PUBLIC_FIREBASE_* env vars.
 *
 * App Check site key: **only** `EXPO_PUBLIC_APP_CHECK_RECAPTCHA_SITE_KEY` (Expo `.env`).
 * Web uses **ReCaptchaEnterpriseProvider** only — do not set `FIREBASE_APPCHECK_DEBUG_TOKEN` (avoids `exchangeDebugToken` / mixed mode).
 * Native builds need Play Integrity / App Attest (this file does not init App Check on iOS/Android).
 *
 * Named JS SDK app instance: **stm-mobile** only (not `[DEFAULT]`).
 */

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { FirebaseApp } from 'firebase/app';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  initializeAuth,
  getAuth,
  browserLocalPersistence,
  type Auth,
} from 'firebase/auth';
import { getFunctions } from 'firebase/functions';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, type AppCheck } from 'firebase/app-check';

const APP_NAME = 'stm-mobile';

/**
 * Must match deployed Firestore / Auth / `createGrabOrder` and Cloud Run `createStripeCheckout` Admin project.
 * If `EXPO_PUBLIC_STRIPE_CHECKOUT_URL` points at another GCP deploy, checkout HTTP will 404 while client reads succeed.
 */
export const EXPECTED_FIREBASE_PROJECT_ID = 'teh-tarik-app-my-own';

/** Single region for HTTPS callables — must match `onCall({ region })` in frontend/functions. */
export const CALLABLE_REGION = 'us-central1' as const;

/** `app.options.projectId` — logged as MOBILE_PROJECT_ID during Stripe checkout debug (must equal Cloud Run BACKEND_PROJECT_ID). */
const firebaseConfig = {
  apiKey: 'AIzaSyDpmm-NIEq80-NFg2Y6o9D6Ea4oghYJPhw',
  authDomain: 'teh-tarik-app-my-own.firebaseapp.com',
  projectId: EXPECTED_FIREBASE_PROJECT_ID,
  storageBucket: 'teh-tarik-app-my-own.firebasestorage.app',
  messagingSenderId: '239722784519',
  appId: '1:239722784519:web:ccf12b2ff7f3575bd4c7a2',
} as const;

/* -------------------------------------------------------------------------- */
/* 1) FirebaseApp — must exist before App Check, Auth, Firestore, Functions */
/* -------------------------------------------------------------------------- */

export const app =
  getApps().find((a) => a.name === APP_NAME) || initializeApp(firebaseConfig, APP_NAME);

if (app.options.projectId !== EXPECTED_FIREBASE_PROJECT_ID) {
  throw new Error(
    `[FIREBASE BOOT FAILED] Project mismatch: expected ${EXPECTED_FIREBASE_PROJECT_ID} but got ${app.options.projectId}`
  );
}

/* -------------------------------------------------------------------------- */
/* 2) App Check — once, immediately after `app` (before auth / Firestore / fns) */
/* -------------------------------------------------------------------------- */

/** Single source of truth — no hardcoded fallback (set in `.env` for Expo). */
const APP_CHECK_RECAPTCHA_SITE_KEY =
  process.env.EXPO_PUBLIC_APP_CHECK_RECAPTCHA_SITE_KEY?.trim() ?? '';

export let appCheck: AppCheck | undefined;

let firebaseAppCheckInitDone = false;

/**
 * Initializes App Check at most once. On Web only; JS SDK ReCaptcha Enterprise does not run on native.
 */
function configureFirebaseAppCheckOnce(firebaseApp: FirebaseApp): void {
  if (firebaseAppCheckInitDone) {
    return;
  }

  if (Platform.OS !== 'web') {
    if (__DEV__) {
      console.warn(
        '[App Check] Native (iOS/Android): `ReCaptchaEnterpriseProvider` is not used here. Enforced callables need Play Integrity / App Attest (or another native App Check integration).'
      );
    }
    return;
  }

  if (!APP_CHECK_RECAPTCHA_SITE_KEY) {
    console.warn(
      '[App Check] Missing EXPO_PUBLIC_APP_CHECK_RECAPTCHA_SITE_KEY — not initialized. Enforced Cloud Functions may return permission-denied on Web.'
    );
    return;
  }

  try {
    appCheck = initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaEnterpriseProvider(APP_CHECK_RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true,
    });
    firebaseAppCheckInitDone = true;
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    if (/already-initialized|already been initialized|already registered/i.test(msg)) {
      firebaseAppCheckInitDone = true;
      return;
    }
    console.warn('[App Check] initializeAppCheck failed', e);
  }
}

configureFirebaseAppCheckOnce(app);

console.log('[FIREBASE CONFIG LOCKED]', {
  projectId: EXPECTED_FIREBASE_PROJECT_ID,
  region: CALLABLE_REGION,
  appCheckWeb: Platform.OS === 'web' ? Boolean(appCheck) : false,
});

/* -------------------------------------------------------------------------- */
/* 3) Auth, Firestore, Functions — after App Check */
/* -------------------------------------------------------------------------- */

function firebaseAuthErrorCode(e: unknown): string {
  if (!e || typeof e !== 'object') return '';
  const c = (e as { code?: string }).code;
  return typeof c === 'string' ? c : '';
}

/**
 * iOS/Android: must use the **same** `@firebase/auth` React Native module for
 * `initializeAuth`, `getReactNativePersistence`, and `getAuth` (see `metro.config.js` resolver).
 * Web: standard `browserLocalPersistence`.
 */
function createFirebaseAuth(): Auth {
  if (Platform.OS === 'web') {
    try {
      return initializeAuth(app, { persistence: browserLocalPersistence });
    } catch (e: unknown) {
      if (firebaseAuthErrorCode(e) === 'auth/already-initialized') {
        return getAuth(app);
      }
      throw e;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const nativeAuth = require('@firebase/auth') as {
    initializeAuth: (a: typeof app, deps: { persistence: import('firebase/auth').Persistence }) => Auth;
    getAuth: (a?: typeof app) => Auth;
    getReactNativePersistence: (
      storage: typeof AsyncStorage
    ) => import('firebase/auth').Persistence;
  };

  try {
    return nativeAuth.initializeAuth(app, {
      persistence: nativeAuth.getReactNativePersistence(AsyncStorage),
    });
  } catch (e: unknown) {
    if (firebaseAuthErrorCode(e) === 'auth/already-initialized') {
      return nativeAuth.getAuth(app);
    }
    throw e;
  }
}

export const db = getFirestore(app);
export const auth = createFirebaseAuth();
export const functions = getFunctions(app, CALLABLE_REGION);

export default app;

/**
 * src/services/firebase.ts
 * Firebase initialization — STM Mobile customer app.
 *
 * Console registration: project **teh-tarik-app-my-own** (project #239722784519),
 * web app **teh-tarik-web** (app id ending in d4c7a2).
 *
 * All Firebase **identity** below is hardcoded. Do not use EXPO_PUBLIC_FIREBASE_* env vars.
 *
 * Named JS SDK app instance: **stm-mobile** only (not `[DEFAULT]`).
 */

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import {
  initializeAuth,
  getAuth,
  browserLocalPersistence,
  type Auth,
} from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

const APP_NAME = 'stm-mobile';

/** Must match deployed Firestore / Auth / `createGrabOrder` project. */
export const EXPECTED_FIREBASE_PROJECT_ID = 'teh-tarik-app-my-own';

/** Single region for HTTPS callables — must match `onCall({ region })` in frontend/functions. */
export const CALLABLE_REGION = 'us-central1' as const;

const firebaseConfig = {
  apiKey: 'AIzaSyDpmm-NIEq80-NFg2Y6o9D6Ea4oghYJPhw',
  authDomain: 'teh-tarik-app-my-own.firebaseapp.com',
  projectId: EXPECTED_FIREBASE_PROJECT_ID,
  storageBucket: 'teh-tarik-app-my-own.firebasestorage.app',
  messagingSenderId: '239722784519',
  appId: '1:239722784519:web:ccf12b2ff7f3575bd4c7a2',
} as const;

export const app =
  getApps().find((a) => a.name === APP_NAME) || initializeApp(firebaseConfig, APP_NAME);

if (app.options.projectId !== EXPECTED_FIREBASE_PROJECT_ID) {
  throw new Error(
    `[FIREBASE BOOT FAILED] Project mismatch: expected ${EXPECTED_FIREBASE_PROJECT_ID} but got ${app.options.projectId}`
  );
}

console.log('[FIREBASE CONFIG LOCKED]', {
  projectId: EXPECTED_FIREBASE_PROJECT_ID,
  region: CALLABLE_REGION,
});

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

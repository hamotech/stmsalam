// src/lib/firebase.js
// Firebase initialization for STM Salam App (Vite setup)

import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  getFirestore,
  enableMultiTabIndexedDbPersistence,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions } from "firebase/functions";
import { getMessaging, isSupported } from "firebase/messaging";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// ── Config audit (production-safe: never logs raw secrets) ──────────────────
console.log('[firebase] Config check:', {
  apiKey:            !!firebaseConfig.apiKey,
  authDomain:        !!firebaseConfig.authDomain,
  projectId:         !!firebaseConfig.projectId,
  storageBucket:     !!firebaseConfig.storageBucket,
  messagingSenderId: !!firebaseConfig.messagingSenderId,
  appId:             !!firebaseConfig.appId,
});

if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error(
    'Missing Firebase web config (need at least VITE_FIREBASE_API_KEY and VITE_FIREBASE_PROJECT_ID). ' +
      'Copy frontend/.env.example to frontend/.env.local and fill the VITE_FIREBASE_* values from Firebase Console → Project settings → Your apps.'
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ── Runtime identity – which Firebase project are we talking to? ─────────────
console.log('PROJECT ID:', app.options.projectId);
console.log('AUTH DOMAIN:', app.options.authDomain);
console.log('API KEY (first 8 chars):', String(app.options.apiKey || '').slice(0, 8) + '…');

/**
 * App Check (Vite web)
 *
 * - Production: reCAPTCHA v3 only, no debug token support.
 * - Development: optional debug token via VITE_APPCHECK_DEBUG_TOKEN.
 * - If app is not registered yet in Firebase Console, do not crash app.
 */
const appCheckSiteKey = String(import.meta.env.VITE_RECAPTCHA_V3_SITE_KEY || "").trim();

function initWebAppCheck(firebaseApp) {
  if (!appCheckSiteKey) {
    console.warn("[app-check] VITE_RECAPTCHA_V3_SITE_KEY is missing. App Check not initialized.");
    return null;
  }

  if (import.meta.env.DEV) {
    const debugToken = String(import.meta.env.VITE_APPCHECK_DEBUG_TOKEN || "").trim();
    // Debug token support is strictly dev-only.
    if (debugToken) {
      globalThis.FIREBASE_APPCHECK_DEBUG_TOKEN = debugToken;
      console.info("[app-check] Debug token enabled (DEV only).");
    }
  }

  try {
    return initializeAppCheck(firebaseApp, {
      provider: new ReCaptchaV3Provider(appCheckSiteKey),
      isTokenAutoRefreshEnabled: true,
    });
  } catch (error) {
    // Prevent UI hard-fail if app is not registered yet / setup is incomplete.
    console.warn("[app-check] Initialization skipped. App may be not registered yet.", error);
    return null;
  }
}

export const appCheck = initWebAppCheck(app);

// Services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// ── Emulator – set VITE_USE_FIREBASE_EMULATOR=true in .env.local to enable ──
export const IS_EMULATOR = import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true';
console.log('EMULATOR:', IS_EMULATOR);
import { connectFirestoreEmulator } from "firebase/firestore";
import { connectFunctionsEmulator } from "firebase/functions";

if (IS_EMULATOR) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099');
    console.info('[⚡️] Firebase Auth emulator connected → http://localhost:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
    console.info('[⚡️] Firebase Firestore emulator connected → localhost:8080');
    connectFunctionsEmulator(functions, 'localhost', 5001);
    console.info('[⚡️] Firebase Functions emulator connected → localhost:5001');
  } catch (e) {
    console.warn('[⚡️] Failed to connect emulators:', e);
  }
}

let messagingInstance = null;
isSupported().then((supported) => {
  if (supported) {
    messagingInstance = getMessaging(app);
  }
}).catch(console.warn);

export const getMessagingInstance = () => messagingInstance;

/** Must match `onCall({ region })` in `frontend/functions` (default us-central1). */
export const FUNCTIONS_REGION =
  String(import.meta.env.VITE_FIREBASE_FUNCTIONS_REGION || "us-central1").trim() || "us-central1";
export const functions = getFunctions(app, FUNCTIONS_REGION);
export const FIREBASE_PROJECT_ID = firebaseConfig.projectId || "";

if (import.meta.env.DEV) {
  if (!firebaseConfig.projectId) {
    console.warn("[firebase] VITE_FIREBASE_PROJECT_ID is missing — checkout callables will fail.");
  }
  if (FUNCTIONS_REGION !== "us-central1") {
    console.warn(
      `[firebase] VITE_FIREBASE_FUNCTIONS_REGION=${FUNCTIONS_REGION} — ensure createGrabOrder is deployed in this region.`
    );
  }
  if (FIREBASE_PROJECT_ID) {
    console.info(`[firebase] Checkout callables: project=${FIREBASE_PROJECT_ID} region=${FUNCTIONS_REGION}`);
  }
}

// 🔥 Safer persistence (prevents app crash in unsupported cases)
try {
  enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === "failed-precondition") {
      console.warn("Firestore persistence: multiple tabs open");
    } else if (err.code === "unimplemented") {
      console.warn("Firestore persistence: not supported");
    } else {
      console.warn("Firestore persistence error:", err.code);
    }
  });
} catch (error) {
  console.warn("Persistence setup skipped:", error);
}

export default app;
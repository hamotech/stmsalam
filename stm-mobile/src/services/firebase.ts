/**
 * src/services/firebase.ts
 * Firebase initialization for STM Mobile — Customer App
 *
 * Uses the SAME Firebase project as the web/admin system.
 * Never duplicates Firestore data or auth state.
 *
 * Environment variables must be prefixed with EXPO_PUBLIC_ in .env
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// ── Config ────────────────────────────────────────────────────────────────────
// Expo exposes EXPO_PUBLIC_* vars to the JS bundle at build time.
// Populate these in stm-mobile/.env (see .env.example)
const firebaseConfig = {
  apiKey:            process.env.EXPO_PUBLIC_FIREBASE_API_KEY            ?? '',
  authDomain:        process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN        ?? '',
  projectId:         process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID         ?? 'stm-app-18a53',
  storageBucket:     process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET     ?? '',
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId:             process.env.EXPO_PUBLIC_FIREBASE_APP_ID             ?? '',
};

// Guard against re-initialization in Expo hot-reload cycles
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;

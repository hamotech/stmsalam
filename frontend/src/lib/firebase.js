// src/lib/firebase.js
// Firebase initialization for STM Salam Teh Tarik App
// Replace .env values with your Firebase project config

import { initializeApp } from 'firebase/app';
import { getFirestore, enableMultiTabIndexedDbPersistence } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Validate config on startup
const missingVars = Object.entries(firebaseConfig)
  .filter(([, v]) => !v || v.includes('your_'))
  .map(([k]) => k);

if (missingVars.length > 0) {
  console.warn(
    '[Firebase] Missing or placeholder config vars:',
    missingVars,
    '\nPlease fill in your .env file with real Firebase values.'
  );
}

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Enable multi-tab offline persistence
enableMultiTabIndexedDbPersistence(db).catch((err) => {
  if (err.code === 'failed-precondition') {
    console.warn('Firestore persistence failed: Multiple tabs open (already handled by multi-tab sync)');
  } else if (err.code === 'unimplemented') {
    console.warn('Firestore persistence failed: Browser not supported');
  }
});

export const storage = getStorage(app);
export const auth = getAuth(app);
export default app;

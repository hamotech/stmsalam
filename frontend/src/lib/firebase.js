// src/lib/firebase.js
// Firebase initialization for STM Salam Teh Tarik App (Vite setup)

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  enableMultiTabIndexedDbPersistence,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

console.log("Firebase Config Initialization:", {
  apiKey: !!firebaseConfig.apiKey,
  authDomain: !!firebaseConfig.authDomain,
  projectId: !!firebaseConfig.projectId,
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

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
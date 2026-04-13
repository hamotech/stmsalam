import admin from 'firebase-admin';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const projectId = process.env.FIREBASE_PROJECT_ID || 'stm-app-18a53';
const serviceAccountPath = path.resolve('backend/service-account.json');
let isReady = false;

if (!admin.apps.length) {
  try {
    if (fs.existsSync(serviceAccountPath)) {
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId,
      });
      isReady = true;
      console.log(`✅ Firebase Admin initialized with Service Account for: ${projectId}`);
    } else {
      admin.initializeApp({ projectId });
      console.warn(`⚠️ Firebase Admin initialized WITHOUT Service Account (Project: ${projectId}). Firestore calls may fail without local authentication.`);
    }
  } catch (error) {
    console.error('❌ Firebase Admin init error:', error.message);
  }
}

export const db = admin.firestore();
export const auth = admin.auth();
export const firebaseReady = isReady;
export default admin;

import admin from 'firebase-admin';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const projectId = process.env.FIREBASE_PROJECT_ID || 'stm-app-18a53';
const serviceAccountPath = path.resolve('service-account.json');
let isReady = false;

if (!admin.apps.length) {
  try {
    const saEnv = process.env.FIREBASE_SERVICE_ACCOUNT;
    
    if (saEnv) {
      // 1. Try environment variable (Best for Render)
      const serviceAccount = JSON.parse(saEnv);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId,
      });
      isReady = true;
      console.log(`✅ Firebase Admin initialized via Environment Variable for: ${projectId}`);
    } else if (fs.existsSync(serviceAccountPath)) {
      // 2. Try local file
      const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        projectId: projectId,
      });
      isReady = true;
      console.log(`✅ Firebase Admin initialized via Service Account File for: ${projectId}`);
    } else {
      // 3. Fallback to basic init
      admin.initializeApp({ projectId });
      console.warn(`⚠️ Firebase Admin initialized WITHOUT Service Account permissions.`);
    }
  } catch (error) {
    console.error('❌ Firebase Admin init error:', error.message);
  }
}

export const db = admin.firestore();
export const auth = admin.auth();
export const firebaseReady = isReady;
export default admin;

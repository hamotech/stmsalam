import admin from 'firebase-admin';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const REQUIRED_PROJECT_ID = 'teh-tarik-app-my-own';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const serviceAccountPath = path.resolve(__dirname, '../config/serviceAccountKey.json');

let isReady = false;

if (!admin.apps.length) {
  try {
    let serviceAccount = null;
    const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

    if (serviceAccountEnv) {
      // Render-friendly: keep full service account JSON in env var.
      serviceAccount = JSON.parse(serviceAccountEnv);
    } else if (fs.existsSync(serviceAccountPath)) {
      serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));
    } else {
      throw new Error(
        'Missing Firebase Admin credentials. Set FIREBASE_SERVICE_ACCOUNT_JSON or add backend/config/serviceAccountKey.json'
      );
    }

    const detectedProjectId = serviceAccount.project_id || process.env.FIREBASE_PROJECT_ID;

    if (detectedProjectId !== REQUIRED_PROJECT_ID) {
      throw new Error(
        `Invalid Firebase project. Expected "${REQUIRED_PROJECT_ID}" but got "${detectedProjectId || 'unknown'}".`
      );
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: REQUIRED_PROJECT_ID,
    });

    isReady = true;
    console.log(
      `✅ Firebase Admin initialized with service account for project: ${REQUIRED_PROJECT_ID}`
    );
  } catch (error) {
    console.error('❌ Firebase Admin init error:', error.message);
  }
}

export const db = admin.firestore();
export const auth = admin.auth();
export const firebaseReady = isReady;
export default admin;

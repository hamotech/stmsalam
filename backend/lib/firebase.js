import admin from 'firebase-admin';
import 'dotenv/config';

const projectId = process.env.FIREBASE_PROJECT_ID || 'stm-app-18a53';

// For local development, if you don't have a service account JSON, 
// firebase-admin will try to use Default Credentials.
// Ideally, you should download a service account JSON from Firebase Console 
// and set GOOGLE_APPLICATION_CREDENTIALS="path/to/json" in your .env
if (!admin.apps.length) {
  try {
    admin.initializeApp({
      projectId: projectId,
      // Add other config if needed
    });
    console.log(`✅ Firebase Admin initialized for project: ${projectId}`);
  } catch (error) {
    console.error('❌ Firebase Admin init error:', error.message);
  }
}

export const db = admin.firestore();
export const auth = admin.auth();
export default admin;

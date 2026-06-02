const admin = require('firebase-admin');

if (!admin.apps.length) {
  const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!serviceAccountPath) {
    console.error('ERROR: FIREBASE_SERVICE_ACCOUNT_KEY environment variable is required.');
    process.exit(1);
  }
  const serviceAccount = require(serviceAccountPath);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

async function backfillRiderProfiles() {
  console.log('--- Starting Firebase Auth ↔ Firestore User Sync ---');
  let pageToken;
  let syncedCount = 0;
  let totalScanned = 0;

  try {
    do {
      const listUsersResult = await admin.auth().listUsers(100, pageToken);
      pageToken = listUsersResult.pageToken;
      
      for (const userRecord of listUsersResult.users) {
        totalScanned++;
        const customClaims = userRecord.customClaims || {};
        
        // Target specifically users with the 'rider' claim
        if (customClaims.role === 'rider') {
          const userRef = db.collection('users').doc(userRecord.uid);
          const docSnap = await userRef.get();
          
          const patch = {
            uid: userRecord.uid,
            displayName: userRecord.displayName || 'Unknown Rider',
            email: userRecord.email || '',
            phone: userRecord.phoneNumber || '',
            role: 'rider',
            activeShift: true, // Default to active for dispatch readiness
            updatedAt: admin.firestore.FieldValue.serverTimestamp()
          };

          if (!docSnap.exists) {
            patch.createdAt = admin.firestore.FieldValue.serverTimestamp();
            await userRef.set(patch);
            console.log(`[CREATED] Rider profile for ${userRecord.uid} (${patch.displayName})`);
            syncedCount++;
          } else {
            // Preserve existing fields while merging missing/canonical schema keys
            await userRef.set(patch, { merge: true });
            console.log(`[MERGED] Rider profile for ${userRecord.uid} (${patch.displayName})`);
            syncedCount++;
          }
        }
      }
    } while (pageToken);
    
    console.log('--- Sync Complete ---');
    console.log(`Total Auth users scanned: ${totalScanned}`);
    console.log(`Total Rider profiles synced: ${syncedCount}`);
  } catch (error) {
    console.error('Failed to backfill rider profiles:', error);
    process.exit(1);
  }
}

backfillRiderProfiles().then(() => {
  process.exit(0);
});

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

async function listRiderAccounts() {
  console.log('--- Listing Firebase Auth Rider Accounts ---');
  let pageToken;
  let totalScanned = 0;
  let riderCount = 0;

  try {
    do {
      const listUsersResult = await admin.auth().listUsers(100, pageToken);
      pageToken = listUsersResult.pageToken;
      
      for (const userRecord of listUsersResult.users) {
        totalScanned++;
        const customClaims = userRecord.customClaims || {};
        
        if (customClaims.role === 'rider') {
          riderCount++;
          const userRef = db.collection('users').doc(userRecord.uid);
          const docSnap = await userRef.get();
          
          console.log(`\n[RIDER: ${userRecord.uid}]`);
          console.log(`  Email:       ${userRecord.email || 'N/A'}`);
          console.log(`  DisplayName: ${userRecord.displayName || 'N/A'}`);
          console.log(`  Phone:       ${userRecord.phoneNumber || 'N/A'}`);
          console.log(`  CustomClaim: role=${customClaims.role}`);
          
          if (docSnap.exists) {
            const data = docSnap.data();
            console.log(`  Firestore Profile: YES`);
            console.log(`  activeShift:       ${data.activeShift}`);
            console.log(`  Firestore Name:    ${data.displayName || data.name || 'N/A'}`);
          } else {
            console.log(`  Firestore Profile: MISSING`);
          }
        }
      }
    } while (pageToken);
    
    console.log('\n--- Scan Complete ---');
    console.log(`Total Auth users scanned: ${totalScanned}`);
    console.log(`Total Rider accounts found: ${riderCount}`);
  } catch (error) {
    console.error('Failed to list rider accounts:', error);
    process.exit(1);
  }
}

listRiderAccounts().then(() => {
  process.exit(0);
});

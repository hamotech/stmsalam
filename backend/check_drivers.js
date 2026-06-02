import admin from './lib/firebase.js';

async function checkDrivers() {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection('users').get();
    
    snapshot.docs.forEach(doc => {
      const data = doc.data();
      if (data.email && data.email.includes('global')) {
        console.log(`--- User ID: ${doc.id} ---`);
        console.log(`Email: ${data.email}`);
        console.log(`Role: ${data.role}`);
        console.log(`Active: ${data.activeStatus}`);
        console.log(`Password Hash: ${data.password}`);
      }
    });
  } catch (err) {
    console.error('Error fetching users:', err);
  } finally {
    process.exit(0);
  }
}

checkDrivers();

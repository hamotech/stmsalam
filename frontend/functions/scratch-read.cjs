const admin = require('firebase-admin');
admin.initializeApp();

async function readOrder() {
  const doc = await admin.firestore().collection('orders').doc('oNlW2JcmyXQkkV3x4Q8A').get();
  console.log(JSON.stringify(doc.data(), null, 2));
  process.exit(0);
}
readOrder();

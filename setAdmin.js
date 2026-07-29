const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const uid = 'UPIu6wFr0SbSdyicktY4JrfzjeU2';

async function makeAdmin() {
  try {
    await admin.auth().setCustomUserClaims(uid, { admin: true });
    console.log('Admin claim added to UID:', uid);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

makeAdmin();

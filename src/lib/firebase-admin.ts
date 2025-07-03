// src/lib/firebase-admin.ts
import admin from 'firebase-admin';

// =================================================================
// PENTING: Untuk menggunakan Firestore di backend (Server Actions),
// Anda perlu mengatur kredensial service account.
// 1. Buka Firebase Console > Project Settings > Service accounts.
// 2. Klik "Generate new private key". Ini akan mengunduh file JSON.
// 3. Konversi seluruh isi file JSON tersebut ke format Base64.
//    Anda bisa menggunakan tool online, atau command: base64 -i [file.json]
// 4. Salin string Base64 tersebut ke variabel FIREBASE_SERVICE_ACCOUNT_KEY di file .env
// 5. Isi juga FIREBASE_PROJECT_ID di file .env
// =================================================================

let db: admin.firestore.Firestore;

try {
  if (!process.env.FIREBASE_SERVICE_ACCOUNT_KEY || !process.env.FIREBASE_PROJECT_ID) {
    throw new Error("Kredensial Firebase Admin SDK tidak diatur di file .env");
  }

  if (!admin.apps.length) {
    const serviceAccount = JSON.parse(
      Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, 'base64').toString('utf-8')
    );

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  }
  
  db = admin.firestore();
} catch (error) {
  console.error("Gagal menginisialisasi Firebase Admin SDK:", error);
  // Create a mock db object so the app doesn't crash, but log errors on use.
  const createMockDb = () => new Proxy({}, {
      get(target, prop) {
          if (prop === 'collection') {
              return (collectionPath: string) => ({
                  add: async () => { console.error(`Firestore (add on ${collectionPath}) tidak terinisialisasi.`); return Promise.resolve({ id: 'mock' }); },
                  get: async () => { console.error(`Firestore (get on ${collectionPath}) tidak terinisialisasi.`); return Promise.resolve({ empty: true, docs: [] }); },
                  doc: (docId: string) => ({
                    delete: async () => { console.error(`Firestore (delete on ${collectionPath}/${docId}) tidak terinisialisasi.`); return Promise.resolve(); }
                  })
              });
          }
          return () => {
              console.error(`Fungsi Firestore '${String(prop)}' tidak terinisialisasi.`);
          };
      }
  }) as unknown as admin.firestore.Firestore;
  db = createMockDb();
}

export { db };

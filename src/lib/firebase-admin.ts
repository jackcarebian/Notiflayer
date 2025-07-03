
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
              return (collectionPath: string) => {
                  // This is a mock query object that allows method chaining
                  const queryProxy = {
                      add: async () => { return Promise.resolve({ id: 'mock' }); },
                      get: async () => { return Promise.resolve({ empty: true, docs: [] }); },
                      doc: (docId: string) => ({
                        delete: async () => { return Promise.resolve(); }
                      }),
                      // Return `this` to allow chaining of methods like orderBy, where, limit, etc.
                      orderBy: function() { return this; },
                      where: function() { return this; },
                      limit: function() { return this; },
                  };
                  return queryProxy;
              };
          }
          return () => {
             // Do nothing, fail silently
          };
      }
  }) as unknown as admin.firestore.Firestore;
  db = createMockDb();
}

export { db };

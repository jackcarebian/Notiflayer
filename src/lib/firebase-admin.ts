// src/lib/firebase-admin.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let db: Firestore;

try {
  const requiredEnvVars = [
    'FIREBASE_PROJECT_ID',
    'FIREBASE_CLIENT_EMAIL',
    'FIREBASE_PRIVATE_KEY'
  ];

  const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

  if (missingEnvVars.length > 0) {
    throw new Error(`Kredensial Firebase Admin SDK tidak lengkap di .env. Variabel yang hilang: ${missingEnvVars.join(', ')}`);
  }
  
  const adminConfig = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
  };

  if (!getApps().length) {
    initializeApp({
      credential: cert(adminConfig),
    });
  }
  
  db = getFirestore();
} catch (error) {
  console.error("Gagal menginisialisasi Firebase Admin SDK:", error);
  // Create a mock db object so the app doesn't crash.
  const createMockDb = () => new Proxy({}, {
      get(target, prop) {
          if (prop === 'collection') {
              return () => {
                  const queryProxy = new Proxy({}, {
                    get(target, prop) {
                      if (['add', 'get', 'doc', 'orderBy', 'where', 'limit'].includes(prop as string)) {
                        return async (...args: any[]) => {
                          if (prop === 'get') return Promise.resolve({ empty: true, docs: [] });
                          if (prop === 'add') return Promise.resolve({ id: 'mock' });
                          if (prop === 'doc') return { delete: async () => Promise.resolve() };
                          return queryProxy; // Allow chaining
                        }
                      }
                      return undefined;
                    }
                  });
                  return queryProxy;
              };
          }
          return () => {};
      }
  }) as unknown as Firestore;
  db = createMockDb();
}

export { db };

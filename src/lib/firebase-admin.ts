// src/lib/firebase-admin.ts
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

let db: Firestore;

const hasCredentials = 
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY;

if (hasCredentials) {
    try {
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
      console.log("Firebase Admin SDK initialized successfully.");

    } catch (error) {
        console.error("Firebase Admin SDK initialization failed:", error);
    }
} else {
    console.warn("Firebase Admin credentials not found in .env file. Using a mock database for build purposes.");
    // Create a mock db object so the app doesn't crash during build.
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
                            if (prop === 'doc') return { delete: async () => Promise.resolve(), set: async () => Promise.resolve() };
                            return queryProxy; // Allow chaining
                          }
                        }
                        return undefined;
                      }
                    });
                    return queryProxy;
                };
            }
             if (prop === 'batch') {
                return () => ({
                    set: () => {},
                    commit: async () => Promise.resolve(),
                });
            }
            return () => {};
        }
    }) as unknown as Firestore;
    db = createMockDb();
}

export { db };

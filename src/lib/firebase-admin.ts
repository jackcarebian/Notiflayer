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
    // Create a mock db object so the app doesn't crash during build or dev.
    const createMockDb = () => {
        const createMockQuery = (): any => {
            const queryProxy = new Proxy({}, {
                get(target, prop) {
                    // For chainable methods, return the proxy itself to allow further chaining.
                    if (['orderBy', 'where', 'limit', 'doc'].includes(prop as string)) {
                        return () => queryProxy;
                    }
                    // For terminal methods, return the expected async result.
                    if (prop === 'get') {
                        return async () => Promise.resolve({ empty: true, docs: [] });
                    }
                    if (prop === 'add') {
                        return async () => Promise.resolve({ id: 'mock' });
                    }
                    if (prop === 'delete') {
                         return async () => Promise.resolve();
                    }
                    if (prop === 'set') {
                        return async () => Promise.resolve();
                    }
                    // Default behavior for any other property
                    return () => queryProxy;
                }
            });
            return queryProxy;
        };
        
        const mockDb = new Proxy({}, {
            get(target, prop) {
                if (prop === 'collection') {
                    return () => createMockQuery();
                }
                if (prop === 'batch') {
                    return () => ({
                        set: () => {},
                        commit: async () => Promise.resolve(),
                    });
                }
                return () => {};
            }
        });
        
        return mockDb as unknown as Firestore;
    };
    db = createMockDb();
}

export { db };

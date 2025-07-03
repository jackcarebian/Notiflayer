import { db } from '@/lib/firebase-admin';
import fs from 'fs';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const INPUT_FILE = 'firestore-export.json';

// Function to import data into Firestore Native Mode
async function importData() {
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`Error: Input file "${INPUT_FILE}" not found.`);
    console.error('Please run the export script first.');
    process.exit(1);
  }

  // Verify that the regular firebase-admin credentials are set
  if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_CLIENT_EMAIL || !process.env.FIREBASE_PRIVATE_KEY) {
      console.error('Firestore Native Mode credentials not found in .env file.');
      console.error('Please ensure FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY for your NEW project are set.');
      process.exit(1);
  }

  console.log(`Starting import into project: ${process.env.FIREBASE_PROJECT_ID}...`);
  const fileContent = fs.readFileSync(INPUT_FILE, 'utf-8');
  const dataToImport = JSON.parse(fileContent);

  try {
    for (const collectionName in dataToImport) {
      const documents = dataToImport[collectionName];
      if (documents.length === 0) {
          console.log(`- No documents to import for collection: ${collectionName}. Skipping.`);
          continue;
      }
      
      console.log(`- Importing ${documents.length} documents into collection: ${collectionName}`);
      
      const batch = db.batch();
      
      documents.forEach((doc: any) => {
        const docId = doc._id; // Get the original ID
        const docData = { ...doc };
        delete docData._id; // Remove the temporary _id field

        if (docId) {
          const docRef = db.collection(collectionName).doc(docId);
          batch.set(docRef, docData);
        } else {
            console.warn(`  - Skipping document without _id in ${collectionName}`);
        }
      });
      
      await batch.commit();
      console.log(`  - Successfully committed ${documents.length} documents.`);
    }

    console.log(`\n✅ Import successful!`);
    console.log('You can now run your application connected to the new database.');

  } catch (error) {
    console.error('\n❌ Import failed:');
    console.error(error);
    process.exit(1);
  }
}

importData();

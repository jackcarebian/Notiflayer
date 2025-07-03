import { Datastore } from '@google-cloud/datastore';
import fs from 'fs';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

// Configuration for the Datastore project (the OLD project)
const datastoreConfig = {
  projectId: process.env.DATASTORE_PROJECT_ID,
  credentials: {
    client_email: process.env.DATASTORE_CLIENT_EMAIL,
    private_key: process.env.DATASTORE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  },
};

if (!datastoreConfig.projectId || !datastoreConfig.credentials.client_email || !datastoreConfig.credentials.private_key || datastoreConfig.projectId === 'YOUR_OLD_PROJECT_ID_HERE') {
  console.error('Datastore credentials not found or are placeholders in .env file.');
  console.error('Please add DATASTORE_PROJECT_ID, DATASTORE_CLIENT_EMAIL, and DATASTORE_PRIVATE_KEY for the project you are exporting from.');
  process.exit(1);
}

const datastore = new Datastore(datastoreConfig);

const KINDS_TO_EXPORT = ['members', 'outlets', 'customers'];
const OUTPUT_FILE = 'firestore-export.json';

async function exportData() {
  console.log(`Starting export from project: ${datastoreConfig.projectId}...`);
  const exportData: { [key: string]: any[] } = {};

  try {
    for (const kind of KINDS_TO_EXPORT) {
      console.log(`- Exporting kind: ${kind}`);
      const query = datastore.createQuery(kind);
      const [entities] = await datastore.runQuery(query);
      
      // Process entities to include their ID
      const documents = entities.map(entity => {
        const id = entity[datastore.KEY]?.id || entity[datastore.KEY]?.name;
        if (!id) {
          console.warn(`  - Entity in kind '${kind}' found without an ID. Skipping.`);
          return null;
        }
        return {
          _id: id, // Use a special key for the original ID
          ...entity,
        };
      }).filter(doc => doc !== null);
      
      exportData[kind] = documents;
      console.log(`  - Found ${documents.length} documents.`);
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(exportData, null, 2));
    console.log(`\n✅ Export successful! Data written to ${OUTPUT_FILE}`);
    console.log('You can now switch your .env credentials to your NEW Firestore (Native Mode) project and run the import script.');

  } catch (error) {
    console.error('\n❌ Export failed:');
    console.error(error);
    process.exit(1);
  }
}

exportData();

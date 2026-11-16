import { DataCollectionManager } from '../src/modules/data-collection/manager';
import prisma from '../src/lib/prisma';

async function runWorker() {
  console.log(`[${new Date().toISOString()}] Starting Bharat Rojgar Source Sync Worker...`);

  try {
    const results = await DataCollectionManager.syncAllActiveSources();
    console.log('Worker Sync Results:');
    for (const r of results) {
      console.log(`  • [${r.sourceCode}] Status: ${r.status} | Found: ${r.itemsFound} | New Ingested: ${r.itemsNew}`);
      if (r.errorMessage) {
        console.error(`    Error: ${r.errorMessage}`);
      }
    }
  } catch (err) {
    console.error('Fatal worker error:', err);
  } finally {
    await prisma.$disconnect();
    console.log(`[${new Date().toISOString()}] Sync Worker cycle finished.`);
  }
}

runWorker();

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as fs from 'fs';
import path from 'path';
import * as schema from '../drizzle/schema';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function seed() {
  console.log('🌱 Starting seed process...');

const dataDir = path.join(__dirname, '../../data');

  // Map table names to schema exports
  const tables: Record<string, any> = {
    Organization: schema.organization,
    OrgDetail: schema.orgDetail,
    Project: schema.project,
    Skill: schema.skill,
    ProjectSkill: schema.projectSkill,
  };

  for (const [tableName, tableSchema] of Object.entries(tables)) {
    const filePath = path.join(dataDir, `${tableName}.json`);

    if (fs.existsSync(filePath)) {
      const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

      console.log(`→ Inserting ${content.length} rows into ${tableName}`);
      for (const record of content) {
        try {
          await db.insert(tableSchema).values(record).onConflictDoNothing();
        } catch (err) {
          console.error(`⚠️ Failed inserting into ${tableName}`, err);
        }
      }
    } else {
      console.warn(`⚠️ File not found: ${filePath}`);
    }
  }

  console.log('✅ Seeding complete.');
  await pool.end();
}

seed().catch((err) => {
  console.error('❌ Seed failed', err);
  process.exit(1);
});

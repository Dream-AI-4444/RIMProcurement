// Direct programmatic migration using drizzle-orm
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import * as schema from './shared/schema.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Migration function
async function runMigrations() {
  console.log('Starting database migration process...');
  
  const connectionString = process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/kratom';
  console.log(`Using database: ${connectionString.split('@')[1]}`);
  
  try {
    // Create a PostgreSQL client
    const pool = new pg.Pool({
      connectionString,
      max: 10,
    });
    
    // Connect to the database
    console.log('Connecting to PostgreSQL...');
    await pool.connect().then(client => {
      console.log('Connected to PostgreSQL successfully');
      client.release();
    });
    
    // Setup drizzle with our schema
    const db = drizzle(pool, { schema });
    
    // Define migrations options
    const migrationsFolder = resolve(__dirname, 'migrations');
    console.log(`Using migrations from: ${migrationsFolder}`);
    
    // Run migrations
    console.log('Running migrations...');
    await migrate(db, {
      migrationsFolder,
      migrationsTable: '__drizzle_migrations',
    });
    
    console.log('Migrations completed successfully!');
    
    // Close pool after migrations
    await pool.end();
    
    return true;
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

// Run migrations
runMigrations().then(success => {
  if (success) {
    console.log('Database is now ready for use');
  }
});

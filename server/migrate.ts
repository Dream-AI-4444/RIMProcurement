import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import * as path from "path";
import * as fs from "fs";

// Import directly from the database config to reuse the connection settings
import { config } from "./config";

async function main() {
  console.log("Starting database migration process...");
  
  try {
    // Initialize database connection with error handling
    const pool = new pg.Pool({
      connectionString: config.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
    
    // Test the connection
    await pool.connect()
      .then((client) => {
        console.log("Database connection established successfully");
        client.release();
      })
      .catch((err) => {
        console.error("Failed to connect to database:", err);
        process.exit(1);
      });
    
    // Create drizzle instance
    const db = drizzle(pool);
    
    // Determine migrations path
    const migrationsFolder = path.join(process.cwd(), "migrations");
    
    // Make sure migrations directory exists
    if (!fs.existsSync(migrationsFolder)) {
      console.log(`Creating migrations directory: ${migrationsFolder}`);
      fs.mkdirSync(migrationsFolder, { recursive: true });
    }
    
    console.log(`Using migrations from: ${migrationsFolder}`);
    
    // Run migrations
    await migrate(db, { migrationsFolder });
    
    console.log("Migrations applied successfully");
    
    // Close the pool
    await pool.end();
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

main();

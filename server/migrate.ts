import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";
import { config } from "./config";
import logger from "./logger";

/**
 * Run database migrations
 * This script is used to apply migrations to the database
 */
async function main() {
  logger.info("Starting database migrations...");

  try {
    // Create a PostgreSQL connection
    const connectionString = config.DATABASE_URL;
    const pool = new pg.Pool({
      connectionString: connectionString,
    });

    // Create Drizzle instance
    const db = drizzle(pool);

    // Apply migrations from the migrations folder
    logger.info("Applying migrations...");
    await migrate(db, { migrationsFolder: "migrations" });
    
    logger.info("Migrations completed successfully!");
    
    // Close the PostgreSQL connection
    await pool.end();
    
    process.exit(0);
  } catch (error) {
    logger.error("Migration error:", error);
    process.exit(1);
  }
}

// Run migrations
main();

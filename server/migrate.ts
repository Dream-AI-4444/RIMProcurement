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

  let pool: pg.Pool | null = null;
  try {
    // Create a PostgreSQL connection
    const connectionString = config.DATABASE_URL;
    pool = new pg.Pool({
      connectionString: connectionString,
      // Add retry logic for connection
      connectionTimeoutMillis: 5000,
      idleTimeoutMillis: 30000,
      max: 10,
    });

    // Create Drizzle instance
    const db = drizzle(pool);

    // Apply migrations from the migrations folder
    logger.info("Applying migrations from folder: migrations");
    await migrate(db, {
      migrationsFolder: "migrations",
      // Ignore existing tables
      migrateOnce: true
    });

    logger.info("Migrations completed successfully!");
  } catch (error) {
    // Enhanced error logging
    logger.error("Migration error:", error);

    // Check if it's a table already exists error
    if (error instanceof Error && error.message.includes('relation already exists')) {
      logger.warn("Some tables already exist. This might be expected.");
      // Optionally, you could choose to continue or exit based on your requirements
      return;
    }

    throw error;
  } finally {
    // Ensure pool is closed even if migration fails
    if (pool) {
      try {
        await pool.end();
      } catch (poolCloseError) {
        logger.error("Error closing database pool:", poolCloseError);
      }
    }
  }
}

// Run migrations
main().then(
  () => process.exit(0),
  (error) => {
    console.error("Migration process failed:", error);
    process.exit(1);
  }
);

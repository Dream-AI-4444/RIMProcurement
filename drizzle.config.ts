import { defineConfig } from "drizzle-kit";

// Helper to get database credentials with explicit fallbacks for Docker environment
const getDatabaseCredentials = () => {
  // First check for the special DRIZZLE_DATABASE_URL (explicitly for Drizzle)
  if (process.env.DRIZZLE_DATABASE_URL) {
    console.log("Using DRIZZLE_DATABASE_URL for database connection");
    return {
      url: process.env.DRIZZLE_DATABASE_URL
    };
  }

  // Then check for the standard DATABASE_URL
  if (process.env.DATABASE_URL) {
    console.log("Using DATABASE_URL for database connection");
    return {
      url: process.env.DATABASE_URL
    };
  }

  // Finally check for individual connection parameters with absolute fallbacks
  const host = process.env.DB_HOST || 'postgres';
  const port = parseInt(process.env.DB_PORT || '5432');
  const database = process.env.DB_NAME || 'kratom';
  const user = process.env.DB_USER || 'postgres';
  const password = process.env.DB_PASSWORD || 'postgres';

  console.log(`Using individual parameters for database connection: ${host}:${port}/${database}`);

  return {
    host,
    port,
    database,
    user,
    password,
  };
};

// Log connection attempt
console.log("Initializing Drizzle configuration...");

// Define configuration with explicit database credentials handling
export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: getDatabaseCredentials(),
  verbose: true,
  strict: false,
  // Add migration configuration
  migrations: {
    // Ignore existing table errors
    ignoreExistingTables: true,
    // Optional: track migrations to prevent duplicate runs
    migrationsTrackingTable: 'drizzle_migrations'
  }
});

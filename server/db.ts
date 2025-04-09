import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";
import { config } from "./config";

// Initialize database connection with error handling
const pool = new pg.Pool({
  connectionString: config.DATABASE_URL,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 5000, // How long to wait for a connection to be established
});

// Listen for connection errors
pool.on('error', (err) => {
  console.error('Unexpected error on idle database client', err);
  process.exit(-1);
});

// Test the connection on startup
pool.connect()
  .then((client) => {
    console.log('Database connection established successfully');
    client.release();
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });

// Create drizzle instance with our schema
export const db = drizzle(pool, { schema });

// Helper function to check database health
export async function checkDatabaseHealth() {
  try {
    const result = await db.execute(schema.sql`SELECT 1`);
    return { healthy: true, result };
  } catch (error) {
    console.error('Database health check failed:', error);
    return { healthy: false, error };
  }
}

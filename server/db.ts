import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "drizzle-orm";
import pg from "pg";
import * as schema from "@shared/schema";
import { config } from "./config";

// Initialize database connection with error handling
const createPool = () => {
  // Check if DATABASE_URL is provided
  if (config.DATABASE_URL) {
    return new pg.Pool({
      connectionString: config.DATABASE_URL,
      max: 20, // Maximum number of clients in the pool
      idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
      connectionTimeoutMillis: 5000, // How long to wait for a connection to be established
    });
  } 
  
  // Fallback to individual parameters if DATABASE_URL is not provided
  // This addresses the error: "Either connection 'url' or 'host', 'database' are required"
  return new pg.Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'kratom',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000,
  });
};

const pool = createPool();

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
    const result = await db.execute(sql`SELECT 1`);
    return { healthy: true, result };
  } catch (error) {
    console.error('Database health check failed:', error);
    return { healthy: false, error };
  }
}
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

// Initialize database connection
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// Create drizzle instance with our schema
export const db = drizzle(pool, { schema });
import { defineConfig } from "drizzle-kit";

// Set a default DATABASE_URL if not provided
const DATABASE_URL = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/kratom";

export default defineConfig({
  schema: "./shared/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: DATABASE_URL,
  },
  // Configure the migrations table name and schema
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
  // Enable verbose output for debugging
  verbose: true,
});

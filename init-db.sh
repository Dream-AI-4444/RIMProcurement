#!/bin/bash
set -e

echo "This script will initialize the database for the Kratom application."
echo "Make sure your PostgreSQL database is running and accessible."

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
  # Use default if not provided
  export DATABASE_URL="postgres://postgres:postgres@localhost:5432/kratom"
  echo "Using default DATABASE_URL: $DATABASE_URL"
else
  echo "Using provided DATABASE_URL"
fi

# Create directory for migrations if it doesn't exist
mkdir -p migrations

# Generate migrations from schema using drizzle-kit
echo "Generating migrations..."
npx drizzle-kit generate --dialect=postgresql

# Apply migrations using TypeScript migration
echo "Applying migrations to database..."
npx tsx server/migrate.ts

echo "Database initialization complete!"

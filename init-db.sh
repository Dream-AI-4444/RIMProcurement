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

# Apply migrations to database using the package.json script directly
echo "Running database migrations..."
pnpm db:push --dialect postgresql

echo "Database initialization complete!"

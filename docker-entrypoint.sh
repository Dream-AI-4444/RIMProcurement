#!/bin/sh
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -p 5432 -U postgres; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done
echo "PostgreSQL is up - executing command"

# Generate migrations directory if it doesn't exist
echo "Setting up migrations..."
mkdir -p migrations

# Generate schema migrations
echo "Generating migrations..."
pnpm drizzle-kit generate:pg --schema=./shared/schema.ts --out=./migrations

# Apply migrations to database
echo "Applying migrations to database..."
pnpm db:push

# Start the application
echo "Starting the application..."
exec "$@"

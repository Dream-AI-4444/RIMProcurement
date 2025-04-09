#!/bin/sh
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -p 5432 -U postgres; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done
echo "PostgreSQL is up - executing command"

# Setting up migrations directory
echo "Setting up migrations directory..."
mkdir -p migrations

# Run TypeScript-based migration
echo "Running database migrations using TypeScript..."
# Use tsx to run the TypeScript migration file directly
tsx server/migrate.ts

# Start the application
echo "Starting the application..."
exec "$@"

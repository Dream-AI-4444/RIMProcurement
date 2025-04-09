#!/bin/sh
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -p 5432 -U postgres; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done
echo "PostgreSQL is up - executing command"

# Create migrations directory if it doesn't exist
mkdir -p migrations

# Run database setup
echo "Setting up database..."
pnpm drizzle-kit push --dialect postgresql

# Start the application
echo "Starting the application..."
exec "$@"

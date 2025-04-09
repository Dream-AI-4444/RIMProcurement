#!/bin/sh
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -p 5432 -U postgres; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done
echo "PostgreSQL is up - executing command"

# Setting up migrations
echo "Setting up migrations..."
mkdir -p migrations

# Apply migrations using the programmatic approach (more reliable in Docker)
echo "Applying migrations to database..."
node db-migrate.js

# Start the application
echo "Starting the application..."
exec "$@"

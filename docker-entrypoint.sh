#!/bin/sh
set -e

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
while ! pg_isready -h postgres -p 5432 -U postgres; do
  sleep 1
done

# Run database migrations if needed
echo "Running database migrations..."
pnpm db:push

# Start the application
echo "Starting the application..."
exec "$@"

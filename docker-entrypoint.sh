#!/bin/sh
set -e

# Default migration script path
: ${MIGRATION_SCRIPT:=pnpm migrate}

# Wait for PostgreSQL to be ready
echo "Waiting for PostgreSQL to be ready..."
until pg_isready -h postgres -p 5432 -U postgres -d kratom; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done
echo "PostgreSQL is up - executing command"

# Set environment variables with explicit defaults if not set
: ${DB_HOST:=postgres}
: ${DB_PORT:=5432}
: ${DB_NAME:=kratom}
: ${DB_USER:=postgres}
: ${DB_PASSWORD:=postgres}

# Generate database URL using the script to ensure correct formatting
if [ -z "$DATABASE_URL" ]; then
  export DATABASE_URL="postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
  echo "Set DATABASE_URL to $DATABASE_URL"
fi

# Print database connection info for debugging (hide password)
echo "Database connection info:"
echo "DATABASE_URL format: postgres://username:******@hostname:port/database"
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_NAME: $DB_NAME"
echo "DB_USER: $DB_USER"

# Run database migrations using pnpm
echo "Running database migrations with command: $MIGRATION_SCRIPT"
if ! $MIGRATION_SCRIPT; then
  echo "Database migration failed"
  exit 1
fi

# Start the application
echo "Starting the application..."
exec "$@"

#!/bin/bash
set -e

echo "This script will initialize the database for the Kratom application."
echo "Make sure your PostgreSQL database is running and accessible."

# Check database connection parameters with explicit defaults
if [ -z "$DATABASE_URL" ] && [ -z "$DB_HOST" ]; then
  # Use default DATABASE_URL if no connection parameters are provided
  export DATABASE_URL="postgres://postgres:postgres@localhost:5432/kratom"
  export DRIZZLE_DATABASE_URL="$DATABASE_URL"
  echo "Using default DATABASE_URL: $DATABASE_URL"
elif [ -n "$DATABASE_URL" ]; then
  # Ensure DRIZZLE_DATABASE_URL is set if DATABASE_URL is provided
  export DRIZZLE_DATABASE_URL="${DRIZZLE_DATABASE_URL:-$DATABASE_URL}"
  echo "Using provided DATABASE_URL"
else
  # Use individual connection parameters with explicit defaults
  export DB_HOST=${DB_HOST:-localhost}
  export DB_PORT=${DB_PORT:-5432}
  export DB_NAME=${DB_NAME:-kratom}
  export DB_USER=${DB_USER:-postgres}
  export DB_PASSWORD=${DB_PASSWORD:-postgres}
  
  # Also create a DATABASE_URL for tools that need it
  export DATABASE_URL="postgres://$DB_USER:$DB_PASSWORD@$DB_HOST:$DB_PORT/$DB_NAME"
  export DRIZZLE_DATABASE_URL="$DATABASE_URL"
  
  echo "Using individual database connection parameters:"
  echo "  DB_HOST: $DB_HOST"
  echo "  DB_PORT: $DB_PORT"
  echo "  DB_NAME: $DB_NAME"
  echo "  DB_USER: $DB_USER"
  echo "  DATABASE_URL constructed as: $DATABASE_URL"
fi

# Create directory for migrations if it doesn't exist
mkdir -p migrations

# Apply migrations to database using drizzle-kit with explicit URL
echo "Running database migrations..."
pnpm db:push --dialect postgresql --url="$DRIZZLE_DATABASE_URL"

echo "Database initialization complete!"

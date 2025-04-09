#!/bin/bash
set -e

# Generate migrations from the schema
echo "Generating database migrations..."
npx drizzle-kit generate --dialect=postgresql

# Apply migrations using TypeScript migration
echo "Applying migrations to the database..."
npx tsx server/migrate.ts

echo "Database setup complete!"

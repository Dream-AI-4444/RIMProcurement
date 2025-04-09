#!/bin/bash
set -e

# Generate migrations from the schema
echo "Generating database migrations..."
pnpm drizzle-kit generate --schema=./shared/schema.ts --out=./migrations --dialect=postgresql

# Push schema changes to the database
echo "Applying migrations to the database..."
pnpm db:push

echo "Database setup complete!"

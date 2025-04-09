#!/bin/bash
set -e

# Generate migrations from the schema
echo "Generating database migrations..."
pnpm drizzle-kit generate

# Push schema changes to the database
echo "Applying migrations to the database..."
pnpm db:push

echo "Database setup complete!"

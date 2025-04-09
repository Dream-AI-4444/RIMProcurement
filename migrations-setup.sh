#!/bin/bash
set -e

# Generate migrations from the schema
echo "Generating database migrations..."
npx drizzle-kit generate --dialect=postgresql

# Push schema changes to the database
echo "Applying migrations to the database..."
node db-migrate.js

echo "Database setup complete!"

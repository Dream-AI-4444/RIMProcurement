#!/bin/bash
set -e

echo "===== Database Migration Helper ====="

# Create migrations directory if it doesn't exist
mkdir -p migrations

# First, try pushing the schema directly
echo "Attempting to push schema directly..."
pnpm db:push

# If push fails, try generating and applying migrations
if [ $? -ne 0 ]; then
  echo "Direct push failed, falling back to migration generation..."
  
  # Generate migrations with proper dialect
  echo "Generating migrations..."
  npx drizzle-kit generate --dialect=postgresql
  
  # Apply the migrations
  echo "Applying migrations..."
  pnpm db:push
fi

echo "Migration process completed!"

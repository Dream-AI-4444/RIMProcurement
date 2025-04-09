FROM node:20-alpine

# Install pnpm, PostgreSQL client, and curl for health checks
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    apk add --no-cache postgresql-client bash curl

# Set working directory
WORKDIR /app

# Copy package.json and related files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application
COPY . .

# Copy critical files explicitly to ensure they're available
COPY drizzle.config.ts ./
COPY shared/schema.ts ./shared/
COPY docker-entrypoint.sh ./

# Make the entrypoint script executable
RUN chmod +x /app/docker-entrypoint.sh

# Ensure migrations directory exists and is writable
RUN mkdir -p /app/migrations && chmod 777 /app/migrations

# Build the application
RUN pnpm build

# Add health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:5000/health || exit 1

# Expose the application port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production

# Use our entrypoint script
ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Start the application (this becomes the command passed to the entrypoint)
CMD ["node", "dist/index.js"]
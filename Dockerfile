FROM node:20-alpine

# Install pnpm and PostgreSQL client (for health checks)
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    apk add --no-cache postgresql-client

# Set working directory
WORKDIR /app

# Copy package.json and related files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy the rest of the application
COPY . .

# Make the entrypoint script executable
RUN chmod +x /app/docker-entrypoint.sh

# Install dependencies
RUN pnpm install

# Build the application
RUN pnpm build

# Expose the application port
EXPOSE 5000

# Set environment variables
ENV NODE_ENV=production

# Use our entrypoint script
ENTRYPOINT ["/app/docker-entrypoint.sh"]

# Start the application (this becomes the command passed to the entrypoint)
CMD ["node", "dist/index.js"]

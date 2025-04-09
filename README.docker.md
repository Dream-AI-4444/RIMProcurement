# Docker Setup for Kratom Project

This document provides instructions for running the Kratom project using Docker and Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

### Starting the Application

To start both the PostgreSQL database and the application:

```bash
docker-compose up -d
```

This will:
1. Build the application image
2. Start a PostgreSQL container
3. Run database migrations
4. Start the application on port 5000

You can access the application at http://localhost:5000

### Viewing Logs

To view logs from both services:

```bash
docker-compose logs -f
```

To view logs from a specific service:

```bash
docker-compose logs -f app
# or
docker-compose logs -f postgres
```

### Stopping the Application

To stop all services:

```bash
docker-compose down
```

To stop and remove all data (including the database volume):

```bash
docker-compose down -v
```

## Configuration

### Environment Variables

The following environment variables can be configured in the `docker-compose.yml` file:

#### PostgreSQL Service
- `POSTGRES_USER`: Database username (default: `postgres`)
- `POSTGRES_PASSWORD`: Database password (default: `postgres`)
- `POSTGRES_DB`: Database name (default: `kratom`)

#### Application Service
- `NODE_ENV`: Node environment (default: `production`)
- `DATABASE_URL`: PostgreSQL connection string

## Development Workflow

For development, you might want to run just the database and develop the application locally:

```bash
# Start only the PostgreSQL service
docker-compose up -d postgres

# Run the application in development mode locally
DATABASE_URL=postgres://postgres:postgres@localhost:5432/kratom pnpm dev
```

## Troubleshooting

### Database Connection Issues

If the application cannot connect to the database:

1. Check that the PostgreSQL container is running:
   ```bash
   docker-compose ps
   ```

2. Verify the database is accessible:
   ```bash
   docker-compose exec postgres psql -U postgres -d kratom -c "SELECT 1"
   ```

3. Ensure the `DATABASE_URL` environment variable in `docker-compose.yml` matches your PostgreSQL configuration.

### Application Issues

If the application fails to start:

1. Check the logs:
   ```bash
   docker-compose logs app
   ```

2. Ensure the build process completed successfully:
   ```bash
   docker-compose build --no-cache app
   ```

3. Try restarting the service:
   ```bash
   docker-compose restart app
   ```

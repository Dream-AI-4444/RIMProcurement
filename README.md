# Kratom Wholesale Platform

A comprehensive web application for connecting Kratom wholesale buyers with suppliers in the United States, featuring an interactive quiz that provides personalized product recommendations.

## 🌿 Overview

This platform helps wholesale buyers navigate the Kratom market by analyzing their business needs and preferences, then providing tailored recommendations. The application features a multi-step quiz that collects information about market segment, business type, volume requirements, priorities, and quality factors.

## 🚀 Features

- **Interactive Quiz**: Multi-step quiz to collect business requirements
- **Personalized Recommendations**: Tailored product suggestions based on quiz responses
- **User Accounts**: Secure authentication and profile management
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Analytics Dashboard**: Track and analyze user submissions and preferences
- **Blockchain Integration**: Support for blockchain-powered supply chain features
- **Enhanced Security**: Rate limiting and secure headers
- **Flexible Database Connection**: Support for both connection string and individual parameters

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **Payment Processing**: Stripe
- **Logging**: Structured logging with configurable levels
- **Error Handling**: Comprehensive error handling and reporting
- **Security**: Helmet for secure headers, rate limiting for API protection

## 📋 Prerequisites

- Node.js (v20+)
- PostgreSQL (v14+)
- pnpm

## 🔧 Installation

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Required (choose either DATABASE_URL or individual parameters)
NODE_ENV=development

# Option 1: Database connection string
DATABASE_URL=postgres://username:password@localhost:5432/kratom

# Option 2: Individual database connection parameters
DB_HOST=localhost
DB_PORT=5432
DB_NAME=kratom
DB_USER=postgres
DB_PASSWORD=postgres

# Optional with defaults
PORT=5000
SESSION_SECRET=replace_this_with_a_long_secure_random_string_in_production
LOG_LEVEL=info
```

### Database Setup

Before running the application, make sure to initialize the database schema:

```bash
# Generate and apply database schema
./init-db.sh
```

Alternatively, you can run the following commands manually:

```bash
# Generate migrations
pnpm db:generate

# Apply migrations
pnpm db:push
```

### Standard Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kratom
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables as described above.

4. Initialize the database:
   ```bash
   ./init-db.sh
   ```

5. Start the development server:
   ```bash
   pnpm dev
   ```

### Docker Installation

> **Note**: The Docker setup automatically handles database initialization.

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd kratom
   ```

2. Start the application using Docker Compose:
   ```bash
   # For development (with hot reloading)
   pnpm docker:dev
   
   # For production
   pnpm docker:prod
   ```

3. The application will be available at http://localhost:5000

4. To stop the containers:
   ```bash
   pnpm docker:down
   ```

## 🧪 Development

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the production application
- `pnpm start` - Start the production application
- `pnpm check` - Type-check the application
- `pnpm db:push` - Apply database schema changes
- `pnpm db:generate` - Generate database migrations
- `pnpm db:studio` - Launch Drizzle Studio for database management
- `pnpm migrate:dev` - Apply migrations in development
- `pnpm docker:dev` - Start development containers
- `pnpm docker:prod` - Start production containers
- `pnpm docker:down` - Stop Docker containers

### Logging Levels

The application supports multiple logging levels:

- **error**: Only logs critical errors
- **warn**: Logs warnings and errors
- **info**: Logs general application information (default)
- **debug**: Verbose logging for debugging

To change the logging level, set the `LOG_LEVEL` environment variable.

### Health Check Endpoint

The application includes a health check endpoint at `/health` that reports the status of all services.

```bash
curl http://localhost:5000/health
```

### Database Management

You can use Drizzle Studio to manage your database:

```bash
pnpm db:studio
```

### Troubleshooting

If you encounter database connection issues:

1. Check that your database server is running and accessible
2. Verify your connection parameters (either DATABASE_URL or individual parameters)
3. Make sure your database is properly initialized using the instructions in the Database Setup section
4. For Docker installations, ensure the entrypoint script is running correctly
5. You can manually fix by running `./init-db.sh` or applying migrations directly

## 📁 Project Structure

```
kratom/
├── client/             # React frontend
│   ├── src/            # Source code
│   │   ├── components/ # UI components
│   │   ├── hooks/      # Custom React hooks
│   │   ├── lib/        # Utilities and helpers
│   │   ├── pages/      # Page components
│   │   ├── App.tsx     # Main application component
│   │   └── main.tsx    # Entry point
├── server/             # Express backend
│   ├── config.ts       # Environment configuration
│   ├── db.ts           # Database configuration
│   ├── index.ts        # Server entry point
│   ├── logger.ts       # Logging service
│   ├── migrate.ts      # Database migration script
│   ├── routes.ts       # API route definitions
│   ├── storage.ts      # Data storage logic
│   └── vite.ts         # Vite integration for serving the frontend
├── shared/             # Shared code between frontend and backend
│   └── schema.ts       # Database schema and type definitions
├── migrations/         # Database migration files
├── docker-compose.yml  # Docker configuration for development
├── docker-compose.prod.yml # Docker configuration for production
├── Dockerfile          # Docker build instructions
├── init-db.sh          # Database initialization script
└── package.json        # Project dependencies and scripts
```

## 📊 Database Schema

The application uses PostgreSQL with Drizzle ORM. The main tables include:

- **users**: User authentication information
- **quiz_submissions**: Stores quiz responses and product recommendations
  - Includes fields for quality factors and blockchain preferences

## 🔒 Security Features

The application implements several security features:

- **Helmet**: Secure HTTP headers to protect against common web vulnerabilities
- **Rate Limiting**: Protection against brute force attacks and abuse
- **Input Validation**: Strict schema validation for all API inputs using Zod
- **Environment Validation**: Validation of all environment variables at startup
- **Error Handling**: Comprehensive error handling with appropriate error responses

## 🚢 Deployment

### Server Requirements

- Node.js (v20+)
- PostgreSQL (v14+)
- 1GB RAM (minimum)
- 10GB Disk Space

### Deployment Options

1. **Docker Deployment**:
   - Use the provided Docker Compose configuration for production
   - Suitable for most hosting environments

2. **Manual Deployment**:
   - Set up Node.js and PostgreSQL
   - Run build and start scripts
   - Configure as a system service

## 📊 Monitoring and Operations

### Health Checks

The application provides a `/health` endpoint that reports the status of all connected services. This can be used for monitoring and alerting.

### Logging

The application uses structured logging with configurable levels. In production, you can set the `LOG_LEVEL` to `info` or `warn` to reduce log volume.

### Graceful Shutdown

The application implements graceful shutdown handlers for SIGTERM and SIGINT signals. This ensures that the application can be safely stopped without losing any active connections.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

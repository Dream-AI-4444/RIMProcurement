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

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Shadcn UI
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **Payment Processing**: Stripe
- **Logging**: Structured logging with configurable levels
- **Error Handling**: Comprehensive error handling and reporting

## 📋 Prerequisites

- Node.js (v18+)
- PostgreSQL (v14+)
- pnpm

## 🔧 Installation

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
NODE_ENV=development
DATABASE_URL=postgres://username:password@localhost:5432/kratom
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
# Set your database connection string
export DATABASE_URL="postgres://username:password@localhost:5432/kratom"

# Generate migrations
pnpm drizzle-kit generate

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
   docker-compose up -d
   ```

3. The application will be available at http://localhost:5000

## 🧪 Development

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

### Troubleshooting

If you encounter a `relation "quiz_submissions" does not exist` error:

1. Make sure your database is properly initialized using the instructions in the Database Setup section
2. For Docker installations, ensure the entrypoint script is running correctly
3. You can manually fix by running `./init-db.sh` or applying migrations directly

### Development Workflow

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Access the application at http://localhost:5000

### Building for Production

```bash
pnpm build
```

### Running in Production

```bash
pnpm start
```

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
│   ├── routes.ts       # API route definitions
│   ├── storage.ts      # Data storage logic
│   └── vite.ts         # Vite integration for serving the frontend
├── shared/             # Shared code between frontend and backend
│   └── schema.ts       # Database schema and type definitions
├── migrations/         # Database migration files
├── docker-compose.yml  # Docker configuration
├── Dockerfile          # Docker build instructions
├── init-db.sh          # Database initialization script
└── package.json        # Project dependencies and scripts
```

## 📊 Database Schema

The application uses PostgreSQL with Drizzle ORM. The main tables include:

- **users**: User authentication information
- **quiz_submissions**: Stores quiz responses and product recommendations
  - Now includes fields for quality factors and blockchain preferences

## 🔒 Authentication

The application uses Passport.js with local strategy for authentication. User passwords are hashed for security.

## 🚢 Deployment

### Server Requirements

- Node.js (v18+)
- PostgreSQL (v14+)
- 1GB RAM (minimum)
- 10GB Disk Space

### Deployment Options

1. **Docker Deployment**:
   - Use the provided Docker Compose configuration
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

## 📧 Contact

For questions or support, please contact [your-email@example.com](mailto:your-email@example.com).
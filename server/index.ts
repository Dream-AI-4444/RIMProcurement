import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic } from "./vite";
import { config } from "./config";
import logger from "./logger";

// Create express application
const app = express();

// Configure middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Enable trust proxy if behind a load balancer or proxy
app.set('trust proxy', 1);

// Request timing and logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  // Log after request completion
  res.on("finish", () => {
    const duration = Date.now() - start;
    logger.request(req, res.statusCode, duration);
  });

  next();
});

// Process shutdown handler
const gracefulShutdown = () => {
  logger.info("Shutting down gracefully...");
  // Add any cleanup operations here
  
  // Exit with success code
  process.exit(0);
};

// Handle process termination signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught Exception:', error);
  // Attempt graceful shutdown
  gracefulShutdown();
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Don't exit, just log for now
});

(async () => {
  try {
    logger.info(`Starting Kratom Wholesale application in ${config.NODE_ENV} mode`);
    
    const server = await registerRoutes(app);

    // Global error handler
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      logger.error(`Error: ${status} - ${message}`, err.stack);
      
      res.status(status).json({ 
        message,
        // Only include stack trace in development
        ...(config.NODE_ENV === 'development' ? { stack: err.stack } : {})
      });
    });

    // Serve frontend application
    if (config.NODE_ENV === "development") {
      await setupVite(app, server);
      logger.info("Vite development server configured");
    } else {
      serveStatic(app);
      logger.info("Static assets configured for production");
    }

    // Start server
    const port = config.PORT;
    server.listen({
      port,
      host: "0.0.0.0", // Enable connections from any IP
    }, () => {
      logger.info(`Server running on port ${port} in ${config.NODE_ENV} mode`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
})();
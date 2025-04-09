import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { db, checkDatabaseHealth } from "./db";
import logger from "./logger";

// Middleware for request validation
const validateRequest = (schema: z.ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        logger.warn(`Validation error: ${JSON.stringify(error.errors)}`);
        return res.status(400).json({
          success: false,
          message: "Invalid request data",
          errors: error.errors
        });
      }
      next(error);
    }
  };
};

// Request logging middleware
const logRequest = (req: Request, _res: Response, next: NextFunction) => {
  logger.debug(`Request: ${req.method} ${req.path}`);
  next();
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Apply global middleware
  app.use(logRequest);

  // Health check endpoint for monitoring
  app.get("/health", async (_req: Request, res: Response) => {
    const dbHealth = await checkDatabaseHealth();
    
    if (dbHealth.healthy) {
      res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        services: {
          database: "up"
        },
        version: process.env.npm_package_version || 'unknown'
      });
    } else {
      logger.error("Health check failed:", dbHealth.error);
      res.status(503).json({
        status: "error",
        timestamp: new Date().toISOString(),
        services: {
          database: "down"
        },
        message: "Service is not healthy"
      });
    }
  });

  // Quiz submission endpoint with validation
  app.post(
    "/api/quiz/submit", 
    validateRequest(insertQuizSubmissionSchema.omit({ submittedAt: true })),
    async (req: Request, res: Response) => {
      try {
        // Add submission timestamp
        const submission = insertQuizSubmissionSchema.parse({
          ...req.body,
          submittedAt: new Date().toISOString(),
        });

        logger.info(`Processing quiz submission for ${submission.email}`);

        // Store the submission
        const result = await storage.submitQuiz(submission);
        
        logger.info(`Quiz submission saved successfully for ${submission.email}`);
        res.status(201).json({
          success: true,
          data: result,
          message: "Quiz submission saved successfully"
        });
      } catch (error) {
        if (error instanceof z.ZodError) {
          logger.warn(`Quiz submission validation error: ${JSON.stringify(error.errors)}`);
          return res.status(400).json({
            success: false,
            message: "Invalid quiz data",
            errors: error.errors
          });
        }
        
        logger.error("Error saving quiz submission:", error);
        res.status(500).json({
          success: false,
          message: "Failed to save quiz submission"
        });
      }
    }
  );

  // Get previous submissions for a user
  app.get("/api/quiz/submissions/:email", async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      if (!email) {
        logger.warn("Missing email parameter in submissions request");
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }

      logger.info(`Fetching submissions for email: ${email}`);
      const submissions = await storage.getSubmissionsByEmail(email);
      
      logger.debug(`Found ${submissions.length} submissions for ${email}`);
      res.status(200).json({
        success: true,
        data: submissions
      });
    } catch (error) {
      logger.error("Error fetching quiz submissions:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch quiz submissions"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
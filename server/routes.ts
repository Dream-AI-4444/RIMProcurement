import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizSubmissionSchema } from "@shared/schema";
import { z } from "zod";
import { db } from "./db";
import { sql } from "drizzle-orm";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Health check endpoint for monitoring
  app.get("/health", async (_req: Request, res: Response) => {
    try {
      // Check database connection
      await db.execute(sql`SELECT 1`);
      
      res.status(200).json({
        status: "ok",
        timestamp: new Date().toISOString(),
        services: {
          database: "up"
        }
      });
    } catch (error) {
      console.error("Health check failed:", error);
      res.status(500).json({
        status: "error",
        timestamp: new Date().toISOString(),
        services: {
          database: "down"
        },
        message: "Service is not healthy"
      });
    }
  });

  // Quiz submission endpoint
  app.post("/api/quiz/submit", async (req: Request, res: Response) => {
    try {
      // Validate request body
      const submission = insertQuizSubmissionSchema.parse({
        ...req.body,
        submittedAt: new Date().toISOString(),
      });

      // Store the submission
      const result = await storage.submitQuiz(submission);
      
      res.status(201).json({
        success: true,
        data: result,
        message: "Quiz submission saved successfully"
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Invalid quiz data",
          errors: error.errors
        });
      }
      
      console.error("Error saving quiz submission:", error);
      res.status(500).json({
        success: false,
        message: "Failed to save quiz submission"
      });
    }
  });

  // Get previous submissions for a user
  app.get("/api/quiz/submissions/:email", async (req: Request, res: Response) => {
    try {
      const email = req.params.email;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email is required"
        });
      }

      const submissions = await storage.getSubmissionsByEmail(email);
      
      res.status(200).json({
        success: true,
        data: submissions
      });
    } catch (error) {
      console.error("Error fetching quiz submissions:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch quiz submissions"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

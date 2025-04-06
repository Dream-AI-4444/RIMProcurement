import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const quizSubmissions = pgTable("quiz_submissions", {
  id: serial("id").primaryKey(),
  market: text("market").notNull(),
  business: text("business").notNull(),
  volume: text("volume").notNull(),
  priority: text("priority").notNull(),
  products: text("products").notNull(),
  quality: text("quality"),  // Added field for quality factors
  blockchain: text("blockchain"),  // Added field for blockchain preferences
  name: text("name").notNull(),
  company: text("company").notNull(),
  email: text("email").notNull(),
  estimatedVolume: text("estimated_volume").notNull(),
  recommendations: jsonb("recommendations").notNull(),
  submittedAt: text("submitted_at").notNull(),
});

export const insertQuizSubmissionSchema = createInsertSchema(quizSubmissions).omit({
  id: true,
}).extend({
  // Make the new fields optional with default values to handle older submissions
  quality: z.string().optional().default('all'),
  blockchain: z.string().optional().default('all')
});

export type InsertQuizSubmission = z.infer<typeof insertQuizSubmissionSchema>;
export type QuizSubmission = typeof quizSubmissions.$inferSelect;

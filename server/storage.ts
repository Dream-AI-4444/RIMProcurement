import { quizSubmissions, type QuizSubmission, type InsertQuizSubmission, users, type User, type InsertUser } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  submitQuiz(submission: InsertQuizSubmission): Promise<QuizSubmission>;
  getSubmissionsByEmail(email: string): Promise<QuizSubmission[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async submitQuiz(insertSubmission: InsertQuizSubmission): Promise<QuizSubmission> {
    const [quizSubmission] = await db
      .insert(quizSubmissions)
      .values(insertSubmission)
      .returning();
    return quizSubmission;
  }

  async getSubmissionsByEmail(email: string): Promise<QuizSubmission[]> {
    return db
      .select()
      .from(quizSubmissions)
      .where(eq(quizSubmissions.email, email));
  }
}

export const storage = new DatabaseStorage();

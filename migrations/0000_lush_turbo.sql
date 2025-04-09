CREATE TABLE "quiz_submissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"market" text NOT NULL,
	"business" text NOT NULL,
	"volume" text NOT NULL,
	"priority" text NOT NULL,
	"products" text NOT NULL,
	"quality" text,
	"blockchain" text,
	"name" text NOT NULL,
	"company" text NOT NULL,
	"email" text NOT NULL,
	"estimated_volume" text NOT NULL,
	"recommendations" jsonb NOT NULL,
	"submitted_at" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);

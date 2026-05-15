CREATE TABLE "rate_limit" (
	"key" varchar(255) PRIMARY KEY NOT NULL,
	"count" integer DEFAULT 1 NOT NULL,
	"window_started_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "subscribers" RENAME COLUMN "confirmation_token" TO "confirmation_token_hash";--> statement-breakpoint
ALTER TABLE "subscribers" ADD COLUMN "confirmation_token_expires_at" timestamp;
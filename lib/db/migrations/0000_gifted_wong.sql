CREATE TABLE "subscribers" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(254) NOT NULL,
	"status" varchar(20) DEFAULT 'pending' NOT NULL,
	"confirmation_token" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"confirmed_at" timestamp,
	CONSTRAINT "subscribers_email_unique" UNIQUE("email")
);

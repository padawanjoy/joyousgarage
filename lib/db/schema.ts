import { pgTable, serial, varchar, text, timestamp, integer } from "drizzle-orm/pg-core";

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 254 }).notNull().unique(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  confirmationTokenHash: text("confirmation_token_hash"),
  confirmationTokenExpiresAt: timestamp("confirmation_token_expires_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  confirmedAt: timestamp("confirmed_at"),
});

export const rateLimit = pgTable("rate_limit", {
  key: varchar("key", { length: 255 }).primaryKey(),
  count: integer("count").notNull().default(1),
  windowStartedAt: timestamp("window_started_at").notNull().defaultNow(),
});

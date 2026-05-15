import { eq } from "drizzle-orm";
import { db } from "./db";
import { rateLimit } from "./db/schema";

const WINDOW_MS = 60 * 60 * 1000;

export async function checkAndIncrementRateLimit(
  key: string,
  limit: number,
): Promise<boolean> {
  const now = new Date();
  const windowStart = new Date(now.getTime() - WINDOW_MS);

  const existing = await db
    .select()
    .from(rateLimit)
    .where(eq(rateLimit.key, key));

  if (existing.length === 0) {
    await db.insert(rateLimit).values({ key, count: 1, windowStartedAt: now });
    return true;
  }

  const record = existing[0];

  if (record.windowStartedAt < windowStart) {
    await db
      .update(rateLimit)
      .set({ count: 1, windowStartedAt: now })
      .where(eq(rateLimit.key, key));
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  await db
    .update(rateLimit)
    .set({ count: record.count + 1 })
    .where(eq(rateLimit.key, key));
  return true;
}

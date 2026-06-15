import { and, eq, lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { rateLimit, subscribers } from "@/lib/db/schema";

const RATE_LIMIT_KEEP_MS = 24 * 60 * 60 * 1000;

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const now = new Date();

  const deletedPending = await db
    .delete(subscribers)
    .where(
      and(
        eq(subscribers.status, "pending"),
        lt(subscribers.confirmationTokenExpiresAt, now),
      ),
    )
    .returning({ id: subscribers.id });

  const rateCutoff = new Date(now.getTime() - RATE_LIMIT_KEEP_MS);
  const deletedRate = await db
    .delete(rateLimit)
    .where(lt(rateLimit.windowStartedAt, rateCutoff))
    .returning({ key: rateLimit.key });

  console.log(
    `[/api/cron/cleanup] pending=${deletedPending.length} rate_limit=${deletedRate.length}`,
  );

  return NextResponse.json({
    ok: true,
    deleted: {
      pending: deletedPending.length,
      rateLimit: deletedRate.length,
    },
  });
}

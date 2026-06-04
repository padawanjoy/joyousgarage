import { createHash } from "node:crypto";
import { and, eq, gt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";
import { checkAndIncrementRateLimit } from "@/lib/rate-limit";

const CONFIRM_IP_RATE_LIMIT = 60;

function fail(status = 400) {
  return NextResponse.json({ ok: false }, { status });
}

export async function POST(req: NextRequest) {
  let body: { token?: string };
  try {
    body = await req.json();
  } catch (err) {
    console.warn("[/api/confirm] body parse failed:", err);
    return fail();
  }

  const token = body.token;
  if (!token || !/^[a-f0-9]{64}$/.test(token)) {
    console.warn("[/api/confirm] invalid token format");
    return fail();
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const ipOk = await checkAndIncrementRateLimit(
    `confirm-ip:${ip}`,
    CONFIRM_IP_RATE_LIMIT,
  );
  if (!ipOk) {
    console.warn(`[/api/confirm] IP rate limit exceeded: ${ip}`);
    return fail(429);
  }

  const hash = createHash("sha256").update(token).digest("hex");
  const now = new Date();

  const updated = await db
    .update(subscribers)
    .set({
      status: "confirmed",
      confirmedAt: now,
      confirmationTokenHash: null,
      confirmationTokenExpiresAt: null,
    })
    .where(
      and(
        eq(subscribers.confirmationTokenHash, hash),
        eq(subscribers.status, "pending"),
        gt(subscribers.confirmationTokenExpiresAt, now),
      ),
    )
    .returning({ id: subscribers.id });

  if (updated.length === 0) {
    console.warn("[/api/confirm] no matching pending row for token");
    return fail();
  }

  return NextResponse.json({ ok: true });
}

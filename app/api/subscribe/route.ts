import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";
import { checkAndIncrementRateLimit } from "@/lib/rate-limit";
import { SITE } from "@/lib/site-config";

const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;
const RESEND_GRACE_MS = 5 * 60 * 1000;
const EMAIL_RATE_LIMIT = 5;
const IP_RATE_LIMIT = 10;
const FROM_ADDRESS = "Padawan Joy <hello@joyousgarage.com>";

function genericResponse() {
  return NextResponse.json({
    message: "확인 메일을 보냈어요. 받은편지함과 스팸함을 확인해 주세요.",
  });
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function generateToken() {
  const raw = randomBytes(32).toString("hex");
  const hash = createHash("sha256").update(raw).digest("hex");
  return { raw, hash };
}

async function sendConfirmationEmail(email: string, rawToken: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY not set");
    return;
  }

  const url = `${SITE.url}/confirm/${rawToken}`;
  const html = `<p>${SITE.name} 뉴스레터 가입을 확정해 주세요.</p>
<p><a href="${url}">가입 확정하기</a></p>
<p style="color:#888;font-size:13px">본인이 요청하지 않았다면 이 메일은 무시하셔도 됩니다.</p>`;
  const text = `${SITE.name} 뉴스레터 가입을 확정해 주세요.

${url}

본인이 요청하지 않았다면 이 메일은 무시하셔도 됩니다.`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: FROM_ADDRESS,
      to: [email],
      subject: `${SITE.name} 뉴스레터 가입을 확정해 주세요`,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Resend API error:", res.status, await res.text());
  }
}

export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch (err) {
    console.warn("[/api/subscribe] body parse failed:", err);
    return genericResponse();
  }

  const email = body.email?.toLowerCase().trim();
  if (!email || !isValidEmail(email)) {
    console.warn("[/api/subscribe] invalid email format");
    return genericResponse();
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  const ipOk = await checkAndIncrementRateLimit(`ip:${ip}`, IP_RATE_LIMIT);
  if (!ipOk) {
    console.warn(`[/api/subscribe] IP rate limit exceeded: ${ip}`);
    return genericResponse();
  }

  const emailOk = await checkAndIncrementRateLimit(
    `email:${email}`,
    EMAIL_RATE_LIMIT,
  );
  if (!emailOk) {
    console.warn(`[/api/subscribe] email rate limit exceeded: ${email}`);
    return genericResponse();
  }

  const existing = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.email, email));
  const now = new Date();

  if (existing.length > 0) {
    const sub = existing[0];

    if (sub.status === "confirmed") {
      return genericResponse();
    }

    if (sub.status === "pending" && sub.confirmationTokenExpiresAt) {
      const sentAt = new Date(
        sub.confirmationTokenExpiresAt.getTime() - TOKEN_EXPIRY_MS,
      );
      const sinceSent = now.getTime() - sentAt.getTime();

      if (sinceSent < RESEND_GRACE_MS) {
        return genericResponse();
      }

      const { raw, hash } = generateToken();
      await db
        .update(subscribers)
        .set({
          confirmationTokenHash: hash,
          confirmationTokenExpiresAt: new Date(now.getTime() + TOKEN_EXPIRY_MS),
        })
        .where(eq(subscribers.email, email));

      await sendConfirmationEmail(email, raw);
      return genericResponse();
    }
  }

  const { raw, hash } = generateToken();
  await db.insert(subscribers).values({
    email,
    confirmationTokenHash: hash,
    confirmationTokenExpiresAt: new Date(now.getTime() + TOKEN_EXPIRY_MS),
  });

  await sendConfirmationEmail(email, raw);
  return genericResponse();
}

import { createHash } from "node:crypto";
import Link from "next/link";
import type { Metadata } from "next";
import { eq } from "drizzle-orm";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ConfirmForm } from "@/components/confirm-form";
import { db } from "@/lib/db";
import { subscribers } from "@/lib/db/schema";

export const metadata: Metadata = {
  title: "가입 확정",
  description: "뉴스레터 가입을 확정합니다.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type Outcome =
  | { kind: "valid"; maskedEmail: string }
  | { kind: "invalid" }
  | { kind: "expired" }
  | { kind: "already" };

function maskEmail(email: string): string {
  const at = email.indexOf("@");
  if (at <= 0) return email;
  const head = email.slice(0, at);
  const domain = email.slice(at);
  const first = head[0] ?? "";
  return `${first}${"*".repeat(Math.max(1, head.length - 1))}${domain}`;
}

async function checkToken(rawToken: string): Promise<Outcome> {
  if (!/^[a-f0-9]{64}$/.test(rawToken)) {
    return { kind: "invalid" };
  }

  const hash = createHash("sha256").update(rawToken).digest("hex");
  const rows = await db
    .select()
    .from(subscribers)
    .where(eq(subscribers.confirmationTokenHash, hash));

  if (rows.length === 0) {
    return { kind: "invalid" };
  }

  const sub = rows[0];

  if (sub.status === "confirmed") {
    return { kind: "already" };
  }

  if (
    !sub.confirmationTokenExpiresAt ||
    sub.confirmationTokenExpiresAt.getTime() < Date.now()
  ) {
    return { kind: "expired" };
  }

  return { kind: "valid", maskedEmail: maskEmail(sub.email) };
}

export default async function ConfirmPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const outcome = await checkToken(token);

  return (
    <>
      <Header />
      <main className="not-found-page">
        <section className="not-found-content">
          {outcome.kind === "valid" && (
            <>
              <div className="section-eyebrow">한 걸음 남았어요</div>
              <h1 className="section-title">
                가입을 <em>확정</em>해 주세요.
              </h1>
              <p className="page-lead">
                <strong>{outcome.maskedEmail}</strong> 주소로 받으신 메일에서
                넘어오셨다면, 아래 버튼을 눌러 가입을 마무리해 주세요.
              </p>
              <ConfirmForm token={token} />
            </>
          )}

          {outcome.kind === "expired" && (
            <>
              <div className="section-eyebrow">확인 링크 만료</div>
              <h1 className="section-title">
                링크가 <em>만료</em>됐어요.
              </h1>
              <p className="page-lead">
                확인 메일 링크는 발송 후 24시간 동안만 유효해요. 다시 가입을
                시도해 주시면 새 확인 메일을 보내드릴게요.
              </p>
              <div className="not-found-actions">
                <Link href="/#newsletter" className="not-found-link">
                  다시 가입하기 →
                </Link>
              </div>
            </>
          )}

          {(outcome.kind === "invalid" || outcome.kind === "already") && (
            <>
              <div className="section-eyebrow">유효하지 않은 링크</div>
              <h1 className="section-title">
                이 링크는 <em>사용할 수 없어요</em>.
              </h1>
              <p className="page-lead">
                메일에서 받은 링크가 맞는지 다시 한 번 확인해 주세요. 이미
                가입이 끝났거나, 링크가 한 번 사용됐을 수 있어요.
              </p>
              <div className="not-found-actions">
                <Link href="/" className="not-found-link">
                  ← 홈으로
                </Link>
                <Link href="/#newsletter" className="not-found-link">
                  구독 페이지 →
                </Link>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

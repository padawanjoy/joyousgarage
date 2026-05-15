"use client";

import { useState } from "react";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "submitting") return;

    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        setState({ kind: "error", message: "잠시 후 다시 시도해 주세요." });
        return;
      }
      setState({ kind: "success" });
      setEmail("");
    } catch {
      setState({ kind: "error", message: "잠시 후 다시 시도해 주세요." });
    }
  }

  const submitting = state.kind === "submitting";

  return (
    <div className="cta" id="newsletter">
      <div className="cta-copy">
        <h3>
          Builder&apos;s <em>letter</em>.
        </h3>
        <p>지금은 가입만 받고 있어요. 첫 발송 준비되는 대로 이메일로 알려드릴게요.</p>
      </div>
      <div className="cta-form-area">
        {state.kind === "success" ? (
          <div className="cta-success" role="status">
            <span className="cta-success-icon" aria-hidden="true">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span className="cta-success-text">
              <strong>확인 메일을 보냈어요</strong>
              <small>메일이 안 보이면 스팸함도 확인해 주세요</small>
            </span>
          </div>
        ) : (
          <>
            <form className="cta-form" onSubmit={handleSubmit}>
              <input
                type="email"
                required
                placeholder="이메일 주소"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting}
                aria-label="이메일 주소"
              />
              <button type="submit" disabled={submitting}>
                {submitting ? "보내는 중..." : "구독하기"}
              </button>
            </form>
            <div className="cta-form-foot">
              {state.kind === "error" && (
                <span className="cta-error" role="alert">
                  {state.message}
                </span>
              )}
              <a className="cta-rss-link" href="/rss.xml">
                RSS로도 받을 수 있어요
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

type State =
  | { kind: "idle" }
  | { kind: "submitting" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function ConfirmForm({ token }: { token: string }) {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "submitting") return;

    setState({ kind: "submitting" });
    try {
      const res = await fetch("/api/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!res.ok) {
        setState({ kind: "error", message: "잠시 후 다시 시도해 주세요." });
        return;
      }
      setState({ kind: "success" });
    } catch {
      setState({ kind: "error", message: "잠시 후 다시 시도해 주세요." });
    }
  }

  if (state.kind === "success") {
    return (
      <div className="confirm-success" role="status">
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
          <strong>가입이 확정됐어요</strong>
          <small>첫 발송 준비되는 대로 메일로 알려드릴게요</small>
        </span>
      </div>
    );
  }

  const submitting = state.kind === "submitting";

  return (
    <form className="confirm-form" onSubmit={handleSubmit}>
      <button type="submit" disabled={submitting}>
        {submitting ? "확정하는 중..." : "가입 확정하기"}
      </button>
      {state.kind === "error" && (
        <span className="cta-error" role="alert">
          {state.message}
        </span>
      )}
    </form>
  );
}

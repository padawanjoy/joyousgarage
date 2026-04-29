"use client";

import { useRef, useState, type ComponentProps } from "react";

export function CodeBlock(props: ComponentProps<"pre">) {
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  async function copy() {
    const code = preRef.current?.querySelector("code")?.textContent ?? "";
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* noop */
    }
  }

  return (
    <div className="pre-wrap">
      <pre ref={preRef} {...props} />
      <button
        type="button"
        className={`code-copy ${copied ? "copied" : ""}`}
        onClick={copy}
        aria-label="Copy code to clipboard"
      >
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

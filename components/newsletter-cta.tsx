export function NewsletterCTA() {
  return (
    <div className="cta" id="newsletter">
      <div className="cta-copy">
        <h3>
          Builder&apos;s <em>letter</em>.
        </h3>
        <p>
          곧 시작합니다 — 자체 인프라 위에 직접 만들고 있어요. 구축 과정은 글로 남길 예정입니다. 그동안 새 글은 RSS로 받아보세요.
        </p>
      </div>
      <div className="cta-form">
        <a className="cta-rss-btn" href="/rss.xml" aria-label="Subscribe via RSS">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1.2" fill="currentColor" />
          </svg>
          RSS로 받기
        </a>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Uses",
  description: "지금 매일 쓰는 도구들 — 하드웨어, 에디터, 터미널, 일상 앱.",
};

interface Item {
  name: string;
  note: string;
  href?: string;
}

interface UsesSection {
  heading: string;
  items: Item[];
}

const SECTIONS: UsesSection[] = [
  {
    heading: "Hardware",
    items: [
      { name: "MacBook Pro 16\" M4 Max", note: "메인 머신" },
      { name: "MacBook Pro 16\" M1 Max", note: "백업 · 외부 작업용" },
      { name: "MacBook Air M4", note: "이동용 — 가볍게" },
      { name: "Mac Studio M1 Ultra", note: "데스크톱 — 빌드·렌더" },
      { name: "Mac mini M4", note: "홈 서버 / 테스트 머신" },
      { name: "Mac mini M1", note: "서브 노드" },
      { name: "Studio Display", note: "27인치 — 코드 + 미리보기 분할" },
      { name: "Keychron K3 Pro", note: "Low-profile 갈축. 무선." },
      { name: "Magic Trackpad", note: "마우스 안 씀" },
    ],
  },
  {
    heading: "Editor & Terminal",
    items: [
      { name: "Cursor", note: "메인 에디터. AI 보조 코딩." },
      { name: "Claude Code", note: "터미널에서 AI 페어." },
      { name: "Codex", note: "OpenAI 코딩 에이전트" },
      { name: "Antigravity", note: "Google 에이전트 IDE — 백그라운드 작업" },
      { name: "iTerm2", note: "Zsh + Starship prompt" },
      { name: "Warp", note: "가끔 사용" },
    ],
  },
  {
    heading: "Browser & Daily",
    items: [
      { name: "Arc", note: "메인 브라우저" },
      { name: "Raycast", note: "Spotlight 대체" },
      { name: "1Password", note: "암호 + 시크릿 매니저" },
      { name: "Notion", note: "장기 메모·기획" },
      { name: "Obsidian", note: "로컬 노트·지식 그래프" },
      { name: "CleanShot X", note: "스크린샷 + 녹화" },
    ],
  },
  {
    heading: "Dev Stack",
    items: [
      { name: "Next.js 15", note: "이 사이트 포함, 메인 풀스택", href: "https://nextjs.org" },
      { name: "TypeScript", note: "기본값" },
      { name: "Vercel", note: "호스팅·배포" },
      { name: "Supabase", note: "Postgres + Auth + Storage" },
      { name: "Firebase", note: "Realtime DB · Auth 필요할 때" },
      { name: "React Native + Expo", note: "모바일" },
    ],
  },
  {
    heading: "Design",
    items: [
      { name: "Figma", note: "와이어·목업" },
      { name: "Photoshop", note: "래스터 이미지 편집" },
      { name: "Illustrator", note: "벡터 그래픽·아이콘" },
      { name: "Excalidraw", note: "다이어그램·아이디어" },
      { name: "ColorSlurp", note: "컬러 픽" },
    ],
  },
  {
    heading: "Services",
    items: [
      { name: "GitHub", note: "코드 + Issue + PR" },
      { name: "Linear", note: "이슈 트래킹 (개인 프로젝트)" },
      { name: "Cloudflare", note: "DNS + 일부 정적 자산" },
    ],
  },
];

export default function UsesPage() {
  return (
    <>
      <Header />
      <main className="uses-page">
        <header className="page-header">
          <div className="section-eyebrow">Uses</div>
          <h1 className="section-title">
            Tools <em>I reach for</em>.
          </h1>
          <p className="page-lead">최근 자주 쓰는 도구와 작업 환경.</p>
          <p className="page-meta">Last updated · 2026.04</p>
        </header>

        <div className="uses-toc">
          {SECTIONS.map((s) => (
            <a key={s.heading} href={`#${s.heading.toLowerCase().replace(/\s+/g, "-")}`}>
              {s.heading}
            </a>
          ))}
        </div>

        {SECTIONS.map((section) => (
          <section
            key={section.heading}
            className="uses-section"
            id={section.heading.toLowerCase().replace(/\s+/g, "-")}
          >
            <h2 className="uses-section-title">{section.heading}</h2>
            <ul className="uses-list">
              {section.items.map((item) => (
                <li key={item.name}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className="uses-name">
                      {item.name}
                    </a>
                  ) : (
                    <span className="uses-name">{item.name}</span>
                  )}
                  <span className="uses-note">{item.note}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}

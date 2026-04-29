# JoyousGarage

joyousgarage.com — 개발자의 작업 노트.

## 시작하기

```bash
npm install
npm run dev
```

브라우저: http://localhost:3000

## 빌드 / 검증

```bash
npm run build
npm run typecheck
npm run lint
```

## 글쓰기

`content/writing/<slug>.mdx` 추가:

```markdown
---
title: "글 제목"
date: "2026-04-28"
category: "Essay"
description: "한 줄 요약."
tags: ["tag1", "tag2"]
---

본문...
```

`category`는 `Tutorial | Essay | Deep Dive | Note` 중 하나.

## 디렉토리

- `app/` — Next.js App Router
- `components/` — UI 컴포넌트
- `lib/` — 데이터 / 유틸
- `content/writing/` — MDX 포스트
- `public/` — 정적 자산

## 스택

Next.js 15 · React 19 · TypeScript · MDX · Vercel

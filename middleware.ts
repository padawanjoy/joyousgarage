import { NextResponse } from "next/server";

// 구 Tistory URL을 받으면 HTTP 410 Gone으로 응답해 검색 색인에서 빠르게 제거되도록 한다.
// 404보다 410이 deindex 신호가 강하다.
export function middleware() {
  return new NextResponse("Gone", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export const config = {
  matcher: [
    "/entry/:path*",
    "/m",
    "/m/:path*",
    "/guestbook",
    "/guestbook/:path*",
    "/category/:path*",
    "/tag/:path*",
    "/notice/:path*",
  ],
};

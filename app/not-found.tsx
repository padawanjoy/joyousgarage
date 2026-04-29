import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Page not found",
  description: "찾으려는 페이지가 없습니다.",
};

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found-page">
        <section className="not-found-content">
          <div className="section-eyebrow">404</div>
          <h1 className="section-title">
            Page <em>not found</em>.
          </h1>
          <p className="page-lead">
            주소가 잘못되었거나, 글이 옮겨졌거나, 아직 만들어지지 않은 페이지일 수 있습니다.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="not-found-link">
              ← 홈으로
            </Link>
            <Link href="/writing" className="not-found-link">
              All writing →
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

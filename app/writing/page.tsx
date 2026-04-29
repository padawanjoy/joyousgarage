import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import { formatPostDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "코드, 도구, 그 사이의 노트.",
};

interface Props {
  searchParams: Promise<{ tag?: string }>;
}

export default async function WritingIndex({ searchParams }: Props) {
  const { tag } = await searchParams;
  const all = getAllPosts();
  const posts = tag ? all.filter((p) => p.tags?.includes(tag)) : all;

  const grouped = new Map<number, typeof posts>();
  for (const post of posts) {
    const year = new Date(post.date).getFullYear();
    if (!grouped.has(year)) grouped.set(year, []);
    grouped.get(year)!.push(post);
  }
  const years = Array.from(grouped.keys()).sort((a, b) => b - a);

  return (
    <>
      <Header />
      <main className="writing-page">
        <header className="page-header">
          <div className="section-eyebrow">Writing</div>
          <h1 className="section-title">
            Recent <em>writing</em>.
          </h1>
          {tag ? (
            <p className="page-lead writing-filter">
              <span>Filtered by</span>{" "}
              <span className="writing-filter-tag">#{tag}</span>
              <Link href="/writing" className="writing-filter-clear" aria-label="필터 지우기">
                ×
              </Link>
            </p>
          ) : (
            <p className="page-lead">코드, 도구, 그 사이의 노트.</p>
          )}
          <p className="page-meta">
            {posts.length} {tag ? `match${posts.length === 1 ? "" : "es"}` : "posts"}
            {!tag && all.length > 0 && ` · since ${new Date(all[all.length - 1].date).getFullYear()}`}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="writing-empty">
            {tag ? `#${tag} 태그가 붙은 글이 아직 없습니다.` : "아직 발행된 글이 없습니다."}
          </p>
        ) : (
          years.map((year) => (
            <section key={year} className="writing-year">
              <h2 className="writing-year-label">{year}</h2>
              <div className="posts">
                {grouped.get(year)!.map((post) => (
                  <PostCard
                    key={post.slug}
                    post={{
                      href: `/writing/${post.slug}`,
                      category: post.category,
                      date: formatPostDate(post.date),
                      readingMinutes: post.readingMinutes,
                      title: post.title,
                      description: post.description,
                    }}
                  />
                ))}
              </div>
            </section>
          ))
        )}
      </main>
      <Footer />
    </>
  );
}

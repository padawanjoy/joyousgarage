import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostCard } from "@/components/post-card";
import { formatPostDate, getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Writing",
  description: "코드, 도구, 그 사이의 노트.",
};

export default function WritingIndex() {
  const posts = getAllPosts();
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
          <p className="page-lead">코드, 도구, 그 사이의 노트.</p>
          <p className="page-meta">{posts.length} posts · since 2026</p>
        </header>

        {posts.length === 0 ? (
          <p className="writing-empty">아직 발행된 글이 없습니다.</p>
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

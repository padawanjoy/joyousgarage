import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Greeting } from "@/components/greeting";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { NewsletterCTA } from "@/components/newsletter-cta";
import { formatPostDate, getAllPosts } from "@/lib/posts";
import { PROJECTS } from "@/lib/projects";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Header />
      <Hero />
      <Greeting />

      <main>
        <section className="section" id="writing">
          <div className="section-header">
            <div>
              <div className="section-eyebrow">01 — 최근 글</div>
              <h2 className="section-title">
                Latest <em>writing</em>
              </h2>
            </div>
            <Link className="section-link" href="/writing">
              All posts →
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <p className="muted">곧 첫 글이 올라옵니다.</p>
          ) : (
            <div className="posts">
              {recentPosts.map((p) => (
                <PostCard
                  key={p.slug}
                  post={{
                    href: `/writing/${p.slug}`,
                    category: p.category,
                    date: formatPostDate(p.date),
                    readingMinutes: p.readingMinutes,
                    title: p.title,
                    description: p.description,
                  }}
                />
              ))}
            </div>
          )}
        </section>

        {PROJECTS.length > 0 && (
          <section className="section" id="projects">
            <div className="section-header">
              <div>
                <div className="section-eyebrow">02 — 작업실</div>
                <h2 className="section-title">
                  Currently <em>building</em>
                </h2>
              </div>
              <Link className="section-link" href="/projects">
                All projects →
              </Link>
            </div>
            <div className="project-grid">
              {PROJECTS.slice(0, 3).map((p) => (
                <ProjectCard
                  key={p.slug}
                  project={{
                    href: `/projects#${p.slug}`,
                    stack: p.stack.slice(0, 3),
                    title: p.title,
                    description: p.description,
                  }}
                />
              ))}
            </div>
          </section>
        )}

        <NewsletterCTA />
      </main>

      <Footer />
    </>
  );
}

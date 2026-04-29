import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PROJECTS, type Project } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "지금 만들고 있는 작업들의 기록.",
};

function StatusBadge({ status }: { status: Project["status"] }) {
  return (
    <span className={`status status-${status.replace(" ", "-").toLowerCase()}`}>
      {status}
    </span>
  );
}

function ProjectLinks({ links }: { links?: Project["links"] }) {
  if (!links) return null;
  return (
    <div className="project-links">
      {links.github && (
        <a href={links.github} target="_blank" rel="noreferrer">
          GitHub →
        </a>
      )}
      {links.live && (
        <a href={links.live} target="_blank" rel="noreferrer">
          Live →
        </a>
      )}
      {links.article && <Link href={links.article}>Article →</Link>}
    </div>
  );
}

export default function ProjectsPage() {
  const featured = PROJECTS.find((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);
  const isEmpty = PROJECTS.length === 0;

  return (
    <>
      <Header />
      <main className="projects-page">
        <header className="page-header">
          <div className="section-eyebrow">Projects</div>
          <h1 className="section-title">
            Currently <em>building</em>.
          </h1>
          <p className="page-lead">지금 만들고 있는 작업들의 기록.</p>
        </header>

        {isEmpty ? (
          <div className="page-empty">
            <p className="page-empty-line">아직 공개된 작업이 없습니다.</p>
            <p className="page-empty-sub">곧 첫 작업을 추가합니다.</p>
          </div>
        ) : (
          <>
            {featured && (
              <article className="project-featured">
                <div className="project-featured-meta">
                  <StatusBadge status={featured.status} />
                  <span className="project-since">since {featured.startedAt}</span>
                </div>
                <h2 className="project-featured-title">{featured.title}</h2>
                <p className="project-featured-desc">
                  {featured.longDescription ?? featured.description}
                </p>
                <div className="stack">
                  {featured.stack.map((s) => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
                <ProjectLinks links={featured.links} />
              </article>
            )}

            {others.length > 0 && (
              <section className="project-detail-grid">
                {others.map((p) => (
                  <article key={p.slug} className="project-detail-card">
                    <div className="project-card-meta">
                      <StatusBadge status={p.status} />
                      <span className="project-since">since {p.startedAt}</span>
                    </div>
                    <h3>{p.title}</h3>
                    <p>{p.longDescription ?? p.description}</p>
                    <div className="stack">
                      {p.stack.map((s) => (
                        <span key={s} className="chip">
                          {s}
                        </span>
                      ))}
                    </div>
                    <ProjectLinks links={p.links} />
                  </article>
                ))}
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SERIES } from "@/lib/series";
import { getPostsInSeries, formatPostDate } from "@/lib/posts";
import { SITE } from "@/lib/site-config";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(SERIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const series = SERIES[slug];
  if (!series) return {};
  return {
    title: series.name,
    description: series.description,
    alternates: { canonical: `/series/${slug}` },
    openGraph: {
      title: series.name,
      description: series.description,
      url: `${SITE.url}/series/${slug}`,
      type: "website",
    },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const series = SERIES[slug];
  if (!series) notFound();

  const posts = getPostsInSeries(slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWorkSeries",
    name: series.name,
    description: series.description,
    url: `${SITE.url}/series/${slug}`,
    inLanguage: SITE.language,
    author: {
      "@type": "Person",
      name: SITE.author.name,
      url: `${SITE.url}/about`,
    },
    hasPart: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE.url}/writing/${p.slug}`,
      datePublished: p.date,
      position: p.seriesOrder,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="series-page">
        <header className="page-header">
          <div className="section-eyebrow">Series</div>
          <h1 className="section-title">{series.name}</h1>
          <p className="page-lead">{series.intro ?? series.description}</p>
        </header>

        <section className="series-section">
          <h2 className="series-heading">발행된 글</h2>
          {posts.length === 0 ? (
            <p className="muted">아직 글이 없습니다.</p>
          ) : (
            <ol className="series-list">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link href={`/writing/${post.slug}`} className="series-item">
                    <span className="series-num">
                      {String(post.seriesOrder).padStart(2, "0")}
                    </span>
                    <span className="series-item-body">
                      <span className="series-item-title">{post.title}</span>
                      <span className="series-item-meta">
                        {formatPostDate(post.date)} · {post.readingMinutes} min
                      </span>
                      <span className="series-item-desc">{post.description}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          )}
        </section>

        <nav className="post-back">
          <Link href="/writing">← All posts</Link>
        </nav>
      </main>
      <Footer />
    </>
  );
}

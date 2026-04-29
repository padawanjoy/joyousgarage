import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { mdxComponents } from "@/lib/mdx-components";
import {
  formatPostDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
} from "@/lib/posts";
import { SITE } from "@/lib/site-config";
import { ShareButtons } from "@/components/share-buttons";
import { AdSlot } from "@/components/ad-slot";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [
          [
            rehypePrettyCode,
            {
              theme: "github-dark",
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.url + "/about",
      sameAs: [
        SITE.author.github,
        SITE.author.threads,
        SITE.author.x,
      ],
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/writing/${post.slug}`,
    },
    image: `${SITE.url}/writing/${post.slug}/opengraph-image`,
    keywords: post.tags?.join(", "),
    articleSection: post.category,
    inLanguage: SITE.language,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="post-main">
        <article className="post-article">
          <header className="post-header">
            <div className="post-meta-large">
              <span className="pill">{post.category}</span>
              <span className="sep">·</span>
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span className="sep">·</span>
              <span>{post.readingMinutes} min</span>
            </div>
            <h1 className="post-title">{post.title}</h1>
            <p className="post-lead">{post.description}</p>
          </header>

          <div className="prose">{content}</div>

          {post.tags && post.tags.length > 0 && (
            <footer className="post-tags">
              {post.tags.map((t) => (
                <span key={t} className="chip">#{t}</span>
              ))}
            </footer>
          )}

          <AdSlot slot="9118372920" />

          <ShareButtons
            url={`${SITE.url}/writing/${post.slug}`}
            title={post.title}
          />

          <PostNav slug={post.slug} />

          <nav className="post-back">
            <Link href="/writing">← All posts</Link>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}

function PostNav({ slug }: { slug: string }) {
  const { prev, next } = getAdjacentPosts(slug);
  if (!prev && !next) return null;
  return (
    <nav className="post-nav" aria-label="Post navigation">
      {prev ? (
        <Link href={`/writing/${prev.slug}`} className="post-nav-link prev">
          <span className="post-nav-direction">← 이전 글</span>
          <span className="post-nav-title">{prev.title}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link href={`/writing/${next.slug}`} className="post-nav-link next">
          <span className="post-nav-direction">다음 글 →</span>
          <span className="post-nav-title">{next.title}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}

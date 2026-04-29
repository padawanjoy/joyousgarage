import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

export { formatPostDate } from "./post-utils";

export type PostCategory = "Tutorial" | "Essay" | "Deep Dive" | "Note";

export interface PostFrontmatter {
  title: string;
  date: string;
  category: PostCategory;
  description: string;
  tags?: string[];
  draft?: boolean;
  series?: string;        // series slug (matches keys in lib/series.ts)
  seriesOrder?: number;   // 1-based ordering within the series
}

export interface Post extends PostFrontmatter {
  slug: string;
  content: string;         // raw MDX (frontmatter stripped)
  readingMinutes: number;
}

const POSTS_DIR = path.join(process.cwd(), "content", "writing");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: Post[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf-8");
    const { data, content } = matter(raw);

    const fm = data as PostFrontmatter;
    if (fm.draft && process.env.NODE_ENV === "production") continue;

    const minutes = Math.max(1, Math.ceil(readingTime(content).minutes));

    posts.push({
      ...fm,
      slug,
      content,
      readingMinutes: minutes,
    });
  }

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
  return posts;
}

export function getPostBySlug(slug: string): Post | null {
  return getAllPosts().find((p) => p.slug === slug) ?? null;
}

export function getAdjacentPosts(slug: string): {
  prev: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const idx = posts.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    next: idx > 0 ? posts[idx - 1] : null,
    prev: idx < posts.length - 1 ? posts[idx + 1] : null,
  };
}

export function getPostsInSeries(seriesSlug: string): Post[] {
  return getAllPosts()
    .filter((p) => p.series === seriesSlug)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}


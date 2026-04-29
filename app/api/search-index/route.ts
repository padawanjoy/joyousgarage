import { getAllPosts } from "@/lib/posts";
import type { SearchIndexEntry } from "@/lib/post-utils";

export const dynamic = "force-static";

export async function GET() {
  const posts = getAllPosts();
  const index: SearchIndexEntry[] = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    description: p.description,
    category: p.category,
    tags: p.tags ?? [],
    date: p.date,
  }));
  return Response.json(index, {
    headers: {
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site-config";
import { getAllPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllPosts();

  const staticUrls: MetadataRoute.Sitemap = [
    { url: SITE.url,                lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${SITE.url}/writing`,   lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${SITE.url}/projects`,  lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/uses`,      lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE.url}/about`,     lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];

  const postUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE.url}/writing/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticUrls, ...postUrls];
}

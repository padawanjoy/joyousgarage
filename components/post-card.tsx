import Link from "next/link";

export interface PostCardData {
  href: string;
  category: string;
  date: string;        // pre-formatted (e.g., "2026.04.20")
  readingMinutes: number;
  title: string;
  description: string;
}

export function PostCard({ post }: { post: PostCardData }) {
  return (
    <Link href={post.href} className="post-card">
      <div className="post-meta">
        <span className="pill">{post.category}</span>
        <span className="sep">·</span>
        <span>{post.date}</span>
        <span className="sep">·</span>
        <span>{post.readingMinutes} min</span>
      </div>
      <h3>{post.title}</h3>
      <p>{post.description}</p>
    </Link>
  );
}

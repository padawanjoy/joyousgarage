import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site-config";
import { formatPostDate, getPostBySlug } from "@/lib/posts";

export const alt = "JoyousGarage post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostOGImage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 64,
            background: "#EFF2F9",
            color: "#4A5560",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          {SITE.name}
        </div>
      ),
      { ...size },
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "linear-gradient(135deg, #EFF2F9 0%, #E4EBF1 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#4A5560",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 999,
              background: "#F08081",
              boxShadow: "0 0 0 7px rgba(240, 128, 129, 0.18)",
            }}
          />
          <div
            style={{
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#4A5560",
              display: "flex",
            }}
          >
            <span>Joyous</span>
            <span style={{ color: "#6E7F8D", fontWeight: 400, marginLeft: 2 }}>
              Garage
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: "90%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 18,
              fontFamily: "ui-monospace, monospace",
              color: "#DB6970",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 500,
              padding: "8px 18px",
              background: "#EFF2F9",
              borderRadius: 999,
              alignSelf: "flex-start",
              boxShadow:
                "inset -2px -2px 5px rgba(250, 251, 255, 0.7), inset 3px 3px 6px rgba(22, 27, 29, 0.12)",
            }}
          >
            {post.category}
          </div>

          <div
            style={{
              fontSize: post.title.length > 30 ? 64 : 80,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: "#1F2A36",
            }}
          >
            {post.title}
          </div>

          {post.description && (
            <div
              style={{
                fontSize: 28,
                fontWeight: 300,
                lineHeight: 1.4,
                color: "#6E7F8D",
                maxWidth: "85%",
              }}
            >
              {post.description.slice(0, 110)}
              {post.description.length > 110 ? "…" : ""}
            </div>
          )}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#6E7F8D",
            fontFamily: "ui-monospace, 'SF Mono', monospace",
            letterSpacing: "0.06em",
          }}
        >
          <span>
            {formatPostDate(post.date)} · {post.readingMinutes} min read
          </span>
          <span>{SITE.author.name}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site-config";

export const alt = SITE.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 999,
              background: "#F08081",
              boxShadow: "0 0 0 10px rgba(240, 128, 129, 0.18)",
            }}
          />
          <div
            style={{
              fontSize: 32,
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
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 92,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "#1F2A36",
            }}
          >
            Notes from a garage
          </div>
          <div
            style={{
              fontSize: 50,
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#6E7F8D",
            }}
          >
            where code becomes craft.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#6E7F8D",
            fontFamily: "ui-monospace, 'SF Mono', monospace",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>{SITE.shortDescription}</span>
          <span>joyousgarage.com</span>
        </div>
      </div>
    ),
    { ...size },
  );
}

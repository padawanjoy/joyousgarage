import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },
  async redirects() {
    return [
      // Tistory 시절 사용하던 /rss 경로를 새 /rss.xml로 영구 이전.
      { source: "/rss", destination: "/rss.xml", permanent: true },
    ];
  },
};

export default config;

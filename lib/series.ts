export interface Series {
  slug: string;
  name: string;
  description: string;
  intro?: string;
}

export const SERIES: Record<string, Series> = {
  newsletter: {
    slug: "newsletter",
    name: "Building My Own Newsletter",
    description:
      "외부 서비스 대신 Vercel + Resend + Neon으로 뉴스레터 인프라를 직접 짓는 시리즈.",
    intro: "뉴스레터 직접 구현하기 시리즈 모아보기",
  },
};

export function getSeries(slug: string): Series | undefined {
  return SERIES[slug];
}

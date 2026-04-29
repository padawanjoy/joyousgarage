export type ProjectStatus = "Active" | "In progress" | "Idle" | "Archived";

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  stack: string[];
  status: ProjectStatus;
  startedAt: string;
  links?: {
    github?: string;
    live?: string;
    article?: string;
  };
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    slug: "self-hosted-newsletter",
    title: "Self-Hosted Newsletter",
    description:
      "외부 서비스 대신 Vercel + Resend + Neon으로 직접 짓는 뉴스레터 인프라.",
    stack: ["Next.js", "Resend", "Neon", "Vercel Functions"],
    status: "In progress",
    startedAt: "2026-04",
    links: {
      article: "/series/newsletter",
    },
    featured: true,
  },
];

export function getFeaturedProject(): Project | undefined {
  return PROJECTS.find((p) => p.featured);
}

export function getNonFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => !p.featured);
}

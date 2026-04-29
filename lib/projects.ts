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

export const PROJECTS: Project[] = [];

export function getFeaturedProject(): Project | undefined {
  return PROJECTS.find((p) => p.featured);
}

export function getNonFeaturedProjects(): Project[] {
  return PROJECTS.filter((p) => !p.featured);
}

import Link from "next/link";

export interface ProjectCardData {
  href: string;
  stack: string[];
  title: string;
  description: string;
}

export function ProjectCard({ project }: { project: ProjectCardData }) {
  return (
    <Link href={project.href} className="project-card">
      <div className="stack">
        {project.stack.map((s) => (
          <span key={s} className="chip">
            {s}
          </span>
        ))}
      </div>
      <h4>{project.title}</h4>
      <p>{project.description}</p>
    </Link>
  );
}

import type { Project } from "../data/projects";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-lg">
      <h3 className="mb-3 text-xl font-semibold text-slate-900">
        {project.title}
      </h3>

      <p className="mb-5 flex-1 leading-7 text-slate-600">
        {project.description}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
          >
            {technology}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-cyan-600 transition hover:text-cyan-500"
        >
          GitHub →
        </a>

        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-slate-700 transition hover:text-cyan-600"
          >
            Live-Demo →
          </a>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
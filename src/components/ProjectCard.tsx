import type { Project } from "../data/projects";
import Button from "./Button";

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900 dark:hover:border-cyan-700">
      <div className="aspect-video overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-800">
        {project.image ? (
          <img
            src={project.image}
            alt={`Vorschau des Projekts ${project.title}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-slate-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900">
            <span className="font-mono text-sm text-slate-400 dark:text-slate-500">
              {"<project-preview />"}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">

        <h3 className="font-mono mt-3 text-xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
          {project.title}
        </h3>

        <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-slate-400">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={project.github} size="small" external>
            GitHub
          </Button>

          {project.demo && (
            <Button
              href={project.demo}
              variant="secondary"
              size="small"
              external
            >
              Live-Demo
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
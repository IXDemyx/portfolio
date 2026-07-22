import { FaGithub } from "react-icons/fa";
import type { Project } from "../data/projects";
import type { Language } from "../App";
import projectsSection from "../data/projectsSection";
import Button from "./Button";

interface ProjectCardProps {
  project: Project;
  language: Language;
}

function ProjectCard({
  project,
  language,
}: ProjectCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-(--accent-border) hover:shadow-xl dark:border-(--accent-border) dark:bg-(--bg-secondary) dark:hover:border-(--accent)">
      <div className="aspect-video overflow-hidden border-b border-slate-200 bg-slate-100 dark:border-(--accent-soft) dark:bg-(--bg-card)">
        {project.image ? (
          <img
            src={project.image}
            alt={`${project.title[language]} preview`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-linear-to-br from-slate-50 to-cyan-50 dark:from-slate-800 dark:to-slate-900">
            <span className="font-mono text-sm text-(--text-secondary) dark:text-slate-500">
              {"<project-preview />"}
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-7">
        <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-950 dark:text-slate-100">
          {project.title[language]}
        </h3>

        <p className="mt-3 flex-1 leading-7 text-slate-600 dark:text-(--text-secondary)">
          {project.description[language]}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs text-slate-700 dark:border-(--accent-border) dark:bg-(--bg-card) dark:text-(--accent)"
            >
              {technology}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            href={project.github}
            size="small"
            external
          >
            <span className="flex items-center gap-2">
              <FaGithub aria-hidden="true" />
              {projectsSection.githubButton[language]}
            </span>
          </Button>

          {project.demo && (
            <Button
              href={project.demo}
              variant="secondary"
              size="small"
              external
            >
              {projectsSection.demoButton[language]}
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export default ProjectCard;
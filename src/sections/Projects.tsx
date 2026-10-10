import projects from "../data/projects";
import projectsSection from "../data/projectsSection";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import { FaGithub } from "react-icons/fa";
import profile from "../data/profile";
import type { Language } from "../App";

interface ProjectsProps {
  language: Language;
}

function Projects({ language }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="border-y border-slate-200/70 bg-transparent px-6 py-24 dark:border-(--accent-soft)"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            subtitle={projectsSection.subtitle[language]}
            title={projectsSection.title[language]}
            description={projectsSection.description[language]}
          />
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal
              key={project.id}
              delay={Math.min(index * 0.06, 0.3)}
            >
              <ProjectCard
                project={project}
                language={language}
              />
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-10 text-center">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-medium text-slate-600 transition hover:text-(--accent) dark:text-(--text-secondary) dark:hover:text-(--accent)"
            >
              <FaGithub aria-hidden="true" />
              {projectsSection.moreOnGithub[language]}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

export default Projects;
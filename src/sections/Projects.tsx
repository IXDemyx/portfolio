import projects from "../data/projects";
import projectsSection from "../data/projectsSection";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import Reveal from "../components/Reveal";
import type { Language } from "../App";

interface ProjectsProps {
  language: Language;
}

function Projects({ language }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="border-y border-slate-200/70 bg-slate-50/70 px-6 py-28 dark:border-slate-800/70 dark:bg-slate-900/35"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            subtitle={projectsSection.subtitle[language]}
            title={projectsSection.title[language]}
            description={projectsSection.description[language]}
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  );
}

export default Projects;
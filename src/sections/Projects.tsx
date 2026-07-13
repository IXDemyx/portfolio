import projects from "../data/projects";

function Projects() {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-500">
            Projekte
          </p>

          <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">
            Einige meiner Arbeiten
          </h2>

          <p className="mt-4 text-lg text-slate-600">
            Eine Auswahl an Projekten, an denen ich gearbeitet habe.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.title}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <h3 className="mb-3 text-xl font-semibold">
                {project.title}
              </h3>

              <p className="mb-4 text-slate-600">
                {project.description}
              </p>

              <div className="mb-6 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-slate-100 px-3 py-1 text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-cyan-600 hover:text-cyan-500"
              >
                GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
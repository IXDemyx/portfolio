import profile from "../data/profile";

function Skills() {
  return (
    <section id="skills" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-500">
            Skills
          </p>

          <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">
            Technologien, mit denen ich arbeite
          </h2>

          <p className="mt-4 text-lg leading-8 text-slate-600">
            Eine Auswahl der Technologien und Werkzeuge, die ich für meine
            Projekte verwende.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((skill) => (
            <div
              key={skill}
              className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-cyan-400 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-slate-900">
                {skill}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
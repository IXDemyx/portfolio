function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 px-6 py-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-500">
            Über mich
          </p>

          <h2 className="mb-6 text-3xl font-bold text-slate-950 sm:text-4xl">
            Softwareentwicklung mit Interesse an modernen Technologien
          </h2>

          <div className="space-y-4 text-lg leading-8 text-slate-600">
            <p>
              Ich beschäftige mich mit Webentwicklung und Softwareentwicklung
              und arbeite gerne mit modernen Technologien wie React, Vue.js,
              Python und Java.
            </p>

            <p>
              Mir ist wichtig, Anwendungen verständlich, zuverlässig und sauber
              aufzubauen. Dabei möchte ich mich kontinuierlich weiterentwickeln
              und neue Technologien kennenlernen.
            </p>

            <p>
              Dieses Portfolio dient dazu, meine Projekte, Fähigkeiten und meine
              Entwicklung als Programmierer zu präsentieren.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
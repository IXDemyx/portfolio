import SectionHeading from "../components/SectionHeading";

function About() {
  return (
    <section id="about" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-4xl">
          <SectionHeading
            subtitle="Über mich"
            title="Softwareentwicklung mit Interesse an modernen Technologien"
          />

          <div className="space-y-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
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
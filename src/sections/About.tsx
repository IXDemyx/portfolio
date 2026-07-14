import AboutGraphic from "../components/AboutGraphic";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";

function About() {
  return (
    <section
      id="about"
      className="border-y border-slate-200/70 bg-slate-50/70 px-6 py-28 dark:border-slate-800/70 dark:bg-slate-900/35"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <Reveal>
          <div>
            <SectionHeading
              subtitle="Über mich"
              title="Softwareentwicklung mit Interesse an modernen Technologien"
            />

            <div className="space-y-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
              <p>
                Ich beschäftige mich mit Webentwicklung und
                Softwareentwicklung und arbeite gerne mit modernen
                Technologien.
              </p>

              <p>
                Mir ist wichtig, Anwendungen verständlich, zuverlässig und
                sauber aufzubauen. Dabei möchte ich mich kontinuierlich
                weiterentwickeln und neue Technologien kennenlernen.
              </p>

              <p>
                Dieses Portfolio dient dazu, meine Projekte, Fähigkeiten und
                meine Entwicklung als Programmierer zu präsentieren.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <AboutGraphic />
        </Reveal>
      </div>
    </section>
  );
}

export default About;
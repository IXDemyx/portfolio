import AboutGraphic from "../components/AboutGraphic";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import about from "../data/about";
import type { Language } from "../App";

interface AboutProps {
  language: Language;
}

function About({ language }: AboutProps) {
  return (
    <section
      id="about"
      className="border-y border-slate-200/70 bg-transparent px-6 py-28 dark:border-(--accent-soft)"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <Reveal>
          <div>
            <SectionHeading
              subtitle={about.subtitle[language]}
              title={about.title[language]}
            />

            <div className="space-y-4 text-lg leading-8 text-slate-600 dark:text-(--text-secondary)">
              {about.paragraphs[language].map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
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
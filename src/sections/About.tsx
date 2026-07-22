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

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {about.stats.map((stat, index) => (
                <div key={stat.label.en} className="h-full">
                  <Reveal delay={index * 0.1}>
                    <div className="group flex min-h-28 flex-col justify-between rounded-2xl border border-(--accent-border) bg-(--bg-secondary) p-4 transition duration-300 hover:-translate-y-1 hover:border-(--accent)">
                      <p className="text-2xl font-bold text-(--accent)">
                        {stat.value}
                      </p>
                      <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-(--text-secondary)">
                        {stat.label[language]}
                      </p>
                    </div>
                  </Reveal>
                </div>
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

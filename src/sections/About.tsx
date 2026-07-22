import AboutGraphic from "../components/AboutGraphic";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import about from "../data/about";
import type { Language } from "../App";
import AnimatedCounter from "../components/AnimatedCounter";

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
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {about.stats.map((stat, index) => (
                <Reveal
                  key={stat.label.en}
                  delay={index * 0.08}
                  className="h-full"
                >
                  <div className="group flex h-full min-h-28 flex-col justify-between rounded-2xl border border-(--accent-border) bg-(--bg-secondary) p-4 transition duration-300 hover:-translate-y-1 hover:border-(--accent)">
                    <p className="text-3xl font-bold text-(--accent)">
                      {typeof stat.value === "number" ? (
                        <AnimatedCounter
                          value={stat.value}
                          suffix={stat.suffix ?? ""}
                        />
                      ) : (
                        stat.value
                      )}
                    </p>

                    <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-(--text-secondary)">
                      {stat.label[language]}
                    </p>
                  </div>
                </Reveal>
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

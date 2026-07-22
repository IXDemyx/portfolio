import timeline from "../data/timeline";
import type { Language } from "../App";
import Reveal from "./Reveal";

interface TimelineProps {
  language: Language;
}

function Timeline({ language }: TimelineProps) {
  return (
    <section id="experience" className="mx-auto max-w-5xl px-6 py-24">
      <Reveal className="mb-16 text-center">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-(--accent)">
          {timeline.label[language]}
        </p>

        <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-(--text-primary) sm:text-4xl">
          {timeline.title[language]}
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-(--text-secondary)">
          {timeline.subtitle[language]}
        </p>
      </Reveal>

      <div className="relative">
        {/* Linie */}
        <div className="absolute top-2 left-2 h-full w-0.5 -translate-x-1/2 bg-slate-200 dark:bg-(--accent-border) md:left-1/2" />

        <div className="space-y-14">
          {timeline.items.map((item, index) => (
            <Reveal
              key={`${item.date}-${item.title.en}`}
              delay={index * 0.08}
              className={`relative flex flex-col md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"
              }`}
            >
              {/* Punkt */}
              <div
                className={`absolute top-2 left-2 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-4 border-white bg-(--accent) shadow-sm dark:border-(--bg-primary) ${
                  index % 2 === 0
                    ? "md:left-auto md:right-0 md:translate-x-1/2"
                    : "md:left-0 md:-translate-x-1/2"
                }`}
              />

              <div className="ml-10 md:ml-0">
                <span className="font-mono text-sm font-semibold text-(--accent)">
                  {item.date}
                </span>

                <h3 className="mt-2 text-xl font-bold text-slate-950 dark:text-(--text-primary)">
                  {item.title[language]}
                </h3>

                <p className="mt-1 font-medium text-slate-500 dark:text-(--text-secondary)">
                  {item.company}
                </p>

                <p className="mt-4 leading-7 text-slate-600 dark:text-(--text-secondary)">
                  {item.description[language]}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-(--accent-border) bg-(--accent-soft) px-3 py-1 font-mono text-xs font-medium text-(--accent)"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;
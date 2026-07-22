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
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-400">
            {timeline.label[language]}
          </p>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
            {timeline.title[language]}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            {timeline.subtitle[language]}
          </p>
        </Reveal>

        <div className="relative">
          {/* Linie */}
          <div className="absolute left-1.75 top-2 h-full w-0.5 bg-slate-200 dark:bg-slate-800 md:left-1/2 md:-translate-x-1/2" />

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
                  className={`absolute top-2 z-10 h-4 w-4 rounded-full border-4 border-white bg-cyan-600 shadow-sm dark:border-slate-950 dark:bg-cyan-400
        left-0 -translate-x-1/2
        ${
          index % 2 === 0
            ? "md:left-auto md:right-0 md:translate-x-1/2"
            : "md:left-0 md:-translate-x-1/2"
        }
      `}
                />

                <div className="ml-10 md:ml-0">
                  <span className="font-mono text-sm font-semibold text-cyan-700 dark:text-cyan-400">
                    {item.date}
                  </span>

                  <h3 className="mt-2 text-xl font-bold text-slate-950 dark:text-white">
                    {item.title[language]}
                  </h3>

                  <p className="mt-1 font-medium text-slate-500 dark:text-slate-400">
                    {item.company}
                  </p>

                  <p className="mt-4 leading-7 text-slate-600 dark:text-slate-400">
                    {item.description[language]}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 font-mono text-xs font-medium text-cyan-700 dark:border-cyan-900 dark:bg-cyan-950/40 dark:text-cyan-300"
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

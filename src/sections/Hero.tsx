import profile from "../data/profile";
import Button from "../components/Button";
import CodeWindow from "../components/CodeWindow";
import { FaGithub } from "react-icons/fa";
import hero from "../data/hero";
import type { Language } from "../App";

interface HeroProps {
  language: Language;
}

function Hero({ language }: HeroProps) {
  return (
    <section
      id="home"
      className="relative flex min-h-[calc(100vh-72px)] items-center px-6 py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-(--accent)">
            {hero.greeting[language]}
          </p>

          <h1 className="mt-5 text-5xl font-bold tracking-[-0.04em] text-slate-950 dark:text-(--text-primary) sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          <h2 className="mt-4 text-2xl font-semibold text-slate-700 dark:text-slate-200 sm:text-3xl">
            {profile.title[language]}
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-(--text-secondary)">
            {profile.description[language]}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#projects">
              {hero.projectsButton[language]}
            </Button>

            <Button
              href={profile.github}
              variant="secondary"
              external
            >
              <span className="flex items-center gap-2">
                <FaGithub aria-hidden="true" />
                GitHub
              </span>
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="animate-code">
            <CodeWindow
              key={language}
              language={language}
            />
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 transition hover:text-(--accent-hover) md:flex dark:text-(--text-secondary)"
      >
        <span>Scroll</span>
        <span className="animate-bounce text-lg">↓</span>
      </a>
    </section>
  );
}

export default Hero;
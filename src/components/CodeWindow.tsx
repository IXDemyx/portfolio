import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import profile from "../data/profile";
import type { Language } from "../App";

interface CodeLine {
  plainText: string;
  content: ReactNode;
}

interface CodeWindowProps {
  language: Language;
}

function CodeWindow({ language }: CodeWindowProps) {
  const role = profile.title[language];
  const location = profile.location[language];

  const lines = useMemo<CodeLine[]>(
    () => [
      {
        plainText: "const developer = {",
        content: (
          <>
            <span className="text-purple-700 dark:text-purple-400">const</span>{" "}
            <span className="text-blue-700 dark:text-cyan-300">developer</span>{" "}
            <span className="text-slate-700 dark:text-slate-300">= {"{"}</span>
          </>
        ),
      },
      {
        plainText: `  name: "${profile.name}",`,
        content: (
          <>
            {"  "}
            <span className="text-blue-600 dark:text-sky-300">name</span>
            <span className="text-slate-700 dark:text-slate-300">: </span>
            <span className="text-green-700 dark:text-emerald-300">
              "{profile.name}"
            </span>
            <span className="text-slate-700 dark:text-slate-300">,</span>
          </>
        ),
      },
      {
        plainText: `  role: "${role}",`,
        content: (
          <>
            {"  "}
            <span className="text-blue-600 dark:text-sky-300">role</span>
            <span className="text-slate-700 dark:text-slate-300">: </span>
            <span className="text-green-700 dark:text-emerald-300">
              "{role}"
            </span>
            <span className="text-slate-700 dark:text-slate-300">,</span>
          </>
        ),
      },
      {
        plainText: `  location: "${location}",`,
        content: (
          <>
            {"  "}
            <span className="text-blue-600 dark:text-sky-300">location</span>
            <span className="text-slate-700 dark:text-slate-300">: </span>
            <span className="text-green-700 dark:text-emerald-300">
              "{location}"
            </span>
            <span className="text-slate-700 dark:text-slate-300">,</span>
          </>
        ),
      },
      {
        plainText: '  stack: ["React", "Vue.js", "Python"],',
        content: (
          <>
            {"  "}
            <span className="text-blue-600 dark:text-sky-300">stack</span>
            <span className="text-slate-700 dark:text-slate-300">: [</span>
            <span className="text-green-700 dark:text-emerald-300">
              "React"
            </span>
            <span className="text-slate-700 dark:text-slate-300">, </span>
            <span className="text-green-700 dark:text-emerald-300">
              "Vue.js"
            </span>
            <span className="text-slate-700 dark:text-slate-300">, </span>
            <span className="text-green-700 dark:text-emerald-300">
              "Python"
            </span>
            <span className="text-slate-700 dark:text-slate-300">],</span>
          </>
        ),
      },
      {
        plainText: '  hobbies: ["Gaming", "Fitness", "Movies", "Music"],',
        content: (
          <>
            {"  "}
            <span className="text-blue-600 dark:text-sky-300">hobbies</span>
            <span className="text-slate-700 dark:text-slate-300">: [</span>
            <span className="text-green-700 dark:text-emerald-300">
              "Gaming"
            </span>
            <span className="text-slate-700 dark:text-slate-300">, </span>
            <span className="text-green-700 dark:text-emerald-300">
              "Fitness"
            </span>
            <span className="text-slate-700 dark:text-slate-300">, </span>
            <span className="text-green-700 dark:text-emerald-300">
              "Movies"
            </span>
            <span className="text-slate-700 dark:text-slate-300">, </span>
            <span className="text-green-700 dark:text-emerald-300">
              "Music"
            </span>
            <span className="text-slate-700 dark:text-slate-300">],</span>
          </>
        ),
      },
      {
        plainText: "  openToWork: true",
        content: (
          <>
            {"  "}
            <span className="text-blue-600 dark:text-sky-300">openToWork</span>
            <span className="text-slate-700 dark:text-slate-300">: </span>
            <span className="text-orange-600 dark:text-orange-300">true</span>
          </>
        ),
      },
      {
        plainText: "};",
        content: (
          <span className="text-slate-700 dark:text-slate-300">{"};"}</span>
        ),
      },
      {
        plainText: "export default developer;",
        content: (
          <>
            <span className="text-purple-700 dark:text-purple-400">
              export default
            </span>{" "}
            <span className="text-blue-700 dark:text-cyan-300">developer</span>
            <span className="text-slate-700 dark:text-slate-300">;</span>
          </>
        ),
      },
    ],
    [role, location],
  );

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [visibleLines, setVisibleLines] = useState(() =>
    prefersReducedMotion ? lines.length : 0,
  );

  const [visibleCharacters, setVisibleCharacters] = useState(0);

  const [finished, setFinished] = useState(prefersReducedMotion);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;
    const currentLine = lines[visibleLines];

    if (!currentLine) {
      const finishTimeout = setTimeout(() => {
        setFinished(true);
      }, 0);

      return () => clearTimeout(finishTimeout);
    }

    if (visibleCharacters < currentLine.plainText.length) {
      timeoutId = setTimeout(() => {
        setVisibleCharacters((current) => current + 1);
      }, 28);
    } else {
      timeoutId = setTimeout(() => {
        setVisibleLines((current) => current + 1);
        setVisibleCharacters(0);
      }, 120);
    }

    return () => clearTimeout(timeoutId);
  }, [lines, prefersReducedMotion, visibleLines, visibleCharacters]);

  return (
    <div
      className="
        h-97.5 overflow-hidden rounded-3xl border
        border-slate-200 bg-white
        shadow-[0_25px_80px_-30px_rgba(15,23,42,0.25)]
        transition-colors duration-300
        dark:border-slate-700 dark:bg-slate-950
        dark:shadow-[0_25px_80px_-30px_rgba(34,211,238,0.25)]
      "
    >
      <div
        className="
          flex h-14 items-center gap-2 border-b
          border-slate-200 bg-slate-50 px-5
          transition-colors duration-300
          dark:border-slate-800 dark:bg-slate-900/50
        "
      >
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />

        <span className="ml-3 font-mono text-xs text-slate-500 dark:text-slate-400">
          developer.ts
        </span>
      </div>

      <div className="h-84 overflow-hidden p-7 font-mono text-sm leading-8">
        {lines.map((line, index) => {
          const isCompleted = index < visibleLines;
          const isCurrent = index === visibleLines;
          const isLastLine = index === lines.length - 1;

          return (
            <div
              key={`${index}-${line.plainText}`}
              className="min-h-8 whitespace-pre"
            >
              {isCompleted && line.content}

              {isCurrent && (
                <>
                  <span className="text-slate-700 dark:text-slate-300">
                    {line.plainText.slice(0, visibleCharacters)}
                  </span>

                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block h-5 w-2 translate-y-1 bg-cyan-600 dark:bg-cyan-400"
                  />
                </>
              )}

              {finished && isLastLine && (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-5 w-2 translate-y-1 animate-pulse bg-cyan-600 dark:bg-cyan-400"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CodeWindow;

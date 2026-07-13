import { useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import profile from "../data/profile";

interface CodeLine {
  content: ReactNode;
  plainText: string;
}

function CodeWindow() {
  const lines = useMemo<CodeLine[]>(
  () => [
    {
      plainText: "const developer = {",
      content: (
        <>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-cyan-300">developer</span>{" "}
          <span className="text-slate-300">= {"{"}</span>
        </>
      ),
    },
    {
      plainText: `  name: "${profile.name}",`,
      content: (
        <>
          {"  "}
          <span className="text-sky-300">name</span>
          <span className="text-slate-300">: </span>
          <span className="text-emerald-300">"{profile.name}"</span>
          <span className="text-slate-300">,</span>
        </>
      ),
    },
    {
      plainText: `  role: "${profile.title}",`,
      content: (
        <>
          {"  "}
          <span className="text-sky-300">role</span>
          <span className="text-slate-300">: </span>
          <span className="text-emerald-300">"{profile.title}"</span>
          <span className="text-slate-300">,</span>
        </>
      ),
    },
    {
      plainText: '  location: "Germany",',
      content: (
        <>
          {"  "}
          <span className="text-sky-300">location</span>
          <span className="text-slate-300">: </span>
          <span className="text-emerald-300">"Germany"</span>
          <span className="text-slate-300">,</span>
        </>
      ),
    },
    {
  plainText: '  stack: ["React", "Vue.js", "Python"],',
  content: (
    <>
      {"  "}
      <span className="text-sky-300">stack</span>
      <span className="text-slate-300">: [</span>
      <span className="text-emerald-300">"React"</span>
      <span className="text-slate-300">, </span>
      <span className="text-emerald-300">"Vue.js"</span>
      <span className="text-slate-300">, </span>
      <span className="text-emerald-300">"Python"</span>
      <span className="text-slate-300">],</span>
    </>
  ),
},
{
  plainText: '  hobbies: ["Gaming", "Fitness", "Movies"],',
  content: (
    <>
      {"  "}
      <span className="text-sky-300">hobbies</span>
      <span className="text-slate-300">: [</span>
      <span className="text-emerald-300">"Gaming"</span>
      <span className="text-slate-300">, </span>
      <span className="text-emerald-300">"Fitness"</span>
      <span className="text-slate-300">, </span>
      <span className="text-emerald-300">"Movies"</span>
      <span className="text-slate-300">],</span>
    </>
  ),
},

    {
      plainText: "  openToWork: true",
      content: (
        <>
          {"  "}
          <span className="text-sky-300">openToWork</span>
          <span className="text-slate-300">: </span>
          <span className="text-orange-300">true</span>
        </>
      ),
    },
    {
      plainText: "};",
      content: <span className="text-slate-300">{"};"}</span>,
    },
    {
      plainText: "export default developer;",
      content: (
        <>
          <span className="text-purple-400">export default</span>{" "}
          <span className="text-cyan-300">developer</span>
          <span className="text-slate-300">;</span>
        </>
      ),
    },
  ],
  [profile.name, profile.title],
);

  const [visibleLines, setVisibleLines] = useState(0);
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisibleLines(lines.length);
      setFinished(true);
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout>;

    const currentLine = lines[visibleLines];

    if (!currentLine) {
      setFinished(true);
      return;
    }

    if (visibleCharacters < currentLine.plainText.length) {
      timeoutId = setTimeout(() => {
        setVisibleCharacters((value) => value + 1);
      }, 28);
    } else {
      timeoutId = setTimeout(() => {
        setVisibleLines((value) => value + 1);
        setVisibleCharacters(0);
      }, 120);
    }

    return () => clearTimeout(timeoutId);
  }, [lines, visibleLines, visibleCharacters]);

  return (
    <div className="h-100 overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 shadow-[0_25px_80px_-30px_rgba(15,23,42,0.7)]">
      <div className="flex h-14 items-center gap-2 border-b border-slate-800/80 bg-slate-900/40 px-5">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />

        <span className="ml-3 font-mono text-xs text-slate-400">
          developer.ts
        </span>
      </div>

      <div className="h-84 overflow-hidden p-7 font-mono text-sm leading-8">
        {lines.map((line, index) => {
          const isCompleted = index < visibleLines;
          const isCurrent = index === visibleLines;

          return (
            <div key={line.plainText} className="min-h-8 whitespace-pre">
              {isCompleted && line.content}

              {isCurrent && (
                <>
                  <span className="text-slate-300">
                    {line.plainText.slice(0, visibleCharacters)}
                  </span>

                  <span
                    aria-hidden="true"
                    className="ml-0.5 inline-block h-5 w-2 translate-y-1 bg-cyan-400"
                  />
                </>
              )}

              {finished && index === lines.length - 1 && (
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block h-5 w-2 translate-y-1 animate-pulse bg-cyan-400"
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
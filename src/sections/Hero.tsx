import profile from "../data/profile";
import Button from "../components/Button";

function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-72px)] items-center px-6 py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Hallo, ich bin
          </p>

          <h1 className="mt-5 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          <h2 className="mt-4 text-2xl font-semibold text-slate-700 sm:text-3xl">
            {profile.title}
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            {profile.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="#projects">Projekte ansehen</Button>

            <Button
              href={profile.github}
              variant="secondary"
              external
            >
              GitHub
            </Button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-xl">
            <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-4">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />

              <span className="ml-3 font-mono text-xs text-slate-400">
                developer.ts
              </span>
            </div>

            <pre className="p-8 font-mono text-sm leading-8 text-slate-300">
              <code>{`const developer = {
  name: "${profile.name}",
  role: "${profile.title}",
  stack: ["React", "Vue.js", "Python"],
  openToWork: true
};`}</code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
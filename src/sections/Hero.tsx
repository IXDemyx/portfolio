import profile from "../data/profile";
import Button from "../components/Button";
import CodeWindow from "../components/CodeWindow";

function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-72px)] items-center px-6 py-16"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="max-w-xl">
          <p className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Hallo, ich bin
          </p>

          <h1 className="mt-5 text-5xl font-bold tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-7xl">
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

            <Button href={profile.github} variant="secondary" external>
              GitHub
            </Button>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-0 -z-10 scale-90 rounded-full bg-cyan-300/30 blur-3xl" />

          <CodeWindow />
        </div>
      </div>
    </section>
  );
}

export default Hero;

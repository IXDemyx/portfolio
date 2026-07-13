import profile from "../data/profile";
import Button from "../components/Button";

function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-[calc(100vh-72px)] items-center px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-lg font-medium text-cyan-500">
            Hallo, ich bin
          </p>

          <h1 className="mb-4 text-5xl font-bold tracking-tight text-slate-950 sm:text-6xl">
            {profile.name}
          </h1>

          <h2 className="mb-6 text-2xl font-semibold text-slate-700 sm:text-3xl">
            {profile.title}
          </h2>

          <p className="mb-6 max-w-2xl text-lg leading-8 text-slate-600">
            {profile.description}
          </p>

          <div className="mb-8 flex flex-wrap gap-3">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-4">
            <Button href="#projects">
              Projekte ansehen
            </Button>

            <Button
              href={profile.github}
              variant="secondary"
              external
            >
              GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
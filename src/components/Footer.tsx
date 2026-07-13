import profile from "../data/profile";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {currentYear} {profile.name}
        </p>

        <div className="flex gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-cyan-600"
          >
            GitHub
          </a>

          <a
            href={`mailto:${profile.email}`}
            className="transition hover:text-cyan-600"
          >
            E-Mail
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
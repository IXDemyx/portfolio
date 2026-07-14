import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import profile from "../data/profile";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 px-6 py-8 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {currentYear} {profile.name}
          </p>

          <p className="mt-1 font-mono text-xs text-slate-500">
            Entwickelt mit React, TypeScript und Tailwind CSS.
          </p>
        </div>

        <nav
          aria-label="Social-Media-Links"
          className="flex items-center gap-2"
        >
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub öffnen"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
          >
            <FaGithub aria-hidden="true" />
          </a>

          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn öffnen"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
            >
              <FaLinkedin aria-hidden="true" />
            </a>
          )}

          <a
            href={`mailto:${profile.email}`}
            aria-label="E-Mail schreiben"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:-translate-y-0.5 hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-800 dark:text-slate-400 dark:hover:border-cyan-500 dark:hover:text-cyan-400"
          >
            <MdEmail aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
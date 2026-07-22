import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import profile from "../data/profile";
import type { Language } from "../App";
import footer from "../data/footer";

interface FooterProps {
  language: Language;
}

function Footer({ language }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinkClasses =
    "flex h-10 w-10 items-center justify-center rounded-xl border " +
    "border-slate-200 text-slate-600 transition " +
    "hover:-translate-y-0.5 hover:border-(--accent) hover:text-(--accent) " +
    "dark:border-slate-800 dark:text-(--text-secondary) " +
    "dark:hover:border-(--accent) dark:hover:text-(--accent)";

  return (
    <footer className="border-t border-slate-200 px-6 py-8 dark:border-(--accent-soft)">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-slate-600 dark:text-(--text-secondary)">
            © {currentYear} {profile.name}
          </p>

          <p className="mt-1 font-mono text-xs text-slate-500 dark:text-(--text-secondary)">
            {footer.builtWith[language]}
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
            className={socialLinkClasses}
          >
            <FaGithub aria-hidden="true" />
          </a>

          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn öffnen"
              className={socialLinkClasses}
            >
              <FaLinkedin aria-hidden="true" />
            </a>
          )}

          <a
            href={`mailto:${profile.email}`}
            aria-label="E-Mail schreiben"
            className={socialLinkClasses}
          >
            <MdEmail aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
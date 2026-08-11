import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
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
    "dark:border-(--accent-border) dark:text-(--text-secondary) " +
    "dark:hover:border-(--accent) dark:hover:text-(--accent)";

  const legalLinkClasses =
    "text-xs text-slate-500 transition hover:text-(--accent) " +
    "dark:text-(--text-secondary) dark:hover:text-(--accent)";

  return (
    <footer className="border-t border-slate-200 px-6 py-8 dark:border-(--accent-soft)">
      <div className="mx-auto max-w-6xl">

        {/* Top */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-(--text-secondary)">
              © {currentYear} {profile.name}
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

        {/* Divider */}
        <div className="my-6 border-t border-slate-200 dark:border-(--accent-border)" />

        {/* Bottom */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-slate-500 dark:text-(--text-secondary)">
            {footer.builtWith[language]}
          </p>

          <nav
            aria-label={
              language === "de"
                ? "Rechtliche Informationen"
                : "Legal information"
            }
            className="flex items-center gap-4"
          >
            <Link
              to="/imprint"
              className={legalLinkClasses}
            >
              {language === "de" ? "Impressum" : "Legal Notice"}
            </Link>

            <span
              aria-hidden="true"
              className="text-slate-300 dark:text-(--accent-border)"
            >
              •
            </span>

            <Link
              to="/privacy"
              className={legalLinkClasses}
            >
              {language === "de" ? "Datenschutz" : "Privacy Policy"}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
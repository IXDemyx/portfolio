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
    <footer className="border-t border-slate-200 px-6 py-8 dark:border-(--accent-border)">
      <div className="mx-auto max-w-6xl">
        {/* Top */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-700 dark:text-(--text-secondary)">
              © {currentYear} {profile.name}
            </p>
          </div>

          <nav
            aria-label={footer.social.navigationLabel[language]}
            className="flex items-center gap-2"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label={footer.social.github[language]}
              className={socialLinkClasses}
            >
              <FaGithub aria-hidden="true" />
            </a>

            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label={footer.social.linkedin[language]}
                className={socialLinkClasses}
              >
                <FaLinkedin aria-hidden="true" />
              </a>
            )}

            <a
              href={`mailto:${profile.email}`}
              aria-label={footer.social.email[language]}
              className={socialLinkClasses}
            >
              <MdEmail aria-hidden="true" />
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-slate-200 dark:border-(--accent-soft)" />

        {/* Bottom */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-slate-500 dark:text-(--text-secondary)">
            {footer.builtWith[language]}
          </p>

          <nav
            aria-label={footer.legal.navigationLabel[language]}
            className="flex items-center gap-4"
          >
            <Link
              to="/legal"
              className={legalLinkClasses}
            >
              {footer.legal.impressum[language]}
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
              {footer.legal.privacy[language]}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
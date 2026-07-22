import { useEffect, useState } from "react";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";
import type { Language } from "../App";

interface NavbarProps {
  language: Language;
  setLanguage: (language: Language) => void;
}

function Navbar({ language, setLanguage }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const links =
    language === "de"
      ? [
          { label: "Start", href: "#home", id: "home" },
          { label: "Über mich", href: "#about", id: "about" },
          { label: "Werdegang", href: "#experience", id: "experience" },
          { label: "Skills", href: "#skills", id: "skills" },
          { label: "Projekte", href: "#projects", id: "projects" },
          { label: "Kontakt", href: "#contact", id: "contact" },
        ]
      : [
          { label: "Home", href: "#home", id: "home" },
          { label: "About", href: "#about", id: "about" },
          { label: "Experience", href: "#experience", id: "experience" },
          { label: "Skills", href: "#skills", id: "skills" },
          { label: "Projects", href: "#projects", id: "projects" },
          { label: "Contact", href: "#contact", id: "contact" },
        ];

useEffect(() => {
  const handleScroll = () => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const scrollPosition = window.scrollY + 150;

    let currentSection = "home";

    for (const section of sections) {
      if (section.offsetTop <= scrollPosition) {
        currentSection = section.id;
      }
    }

    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10;

    if (isAtBottom && sections.length > 0) {
      currentSection = sections[sections.length - 1].id;
    }

    setActiveSection(currentSection);
  };

  window.addEventListener("scroll", handleScroll);

  handleScroll();

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const switchLanguage = () => {
    setLanguage(language === "de" ? "en" : "de");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="font-mono text-lg font-bold text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400 dark:hover:text-cyan-300"
        >
          {"</DK>"}
        </a>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative py-2 text-sm font-medium transition ${
                    isActive
                      ? "text-cyan-600 dark:text-cyan-400"
                      : "text-slate-700 hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-cyan-500 transition-transform ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={switchLanguage}
              aria-label={
                language === "de" ? "Switch to English" : "Auf Deutsch wechseln"
              }
              className="hidden h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg px-2 font-mono text-xs font-semibold text-slate-500 transition hover:text-cyan-600 lg:flex dark:text-slate-400 dark:hover:text-cyan-400"
            >
              {language === "de" ? "EN" : "DE"}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={
                theme === "dark"
                  ? language === "de"
                    ? "Helles Design aktivieren"
                    : "Enable light mode"
                  : language === "de"
                    ? "Dunkles Design aktivieren"
                    : "Enable dark mode"
              }
              className="flex cursor-pointer h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            <button
              type="button"
              onClick={() => setMenuOpen((current) => !current)}
              aria-label={
                menuOpen
                  ? language === "de"
                    ? "Navigation schließen"
                    : "Close navigation"
                  : language === "de"
                    ? "Navigation öffnen"
                    : "Open navigation"
              }
              aria-expanded={menuOpen}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-600 lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            {links.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-cyan-50 text-cyan-700 dark:bg-cyan-400/10 dark:text-cyan-400"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                {language === "de" ? "Sprache" : "Language"}
              </span>

              <div className="flex items-center gap-1 font-mono text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLanguage("de")}
                  aria-pressed={language === "de"}
                  className={`rounded-lg px-3 py-2 transition ${
                    language === "de"
                      ? "bg-cyan-500 text-slate-950"
                      : "text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                  }`}
                >
                  DE
                </button>

                <button
                  type="button"
                  onClick={() => setLanguage("en")}
                  aria-pressed={language === "en"}
                  className={`rounded-lg px-3 py-2 transition ${
                    language === "en"
                      ? "bg-cyan-500 text-slate-950"
                      : "text-slate-500 hover:text-cyan-600 dark:text-slate-400 dark:hover:text-cyan-400"
                  }`}
                >
                  EN
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;

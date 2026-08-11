import { useEffect, useState } from "react";
import { FaBars, FaMoon, FaSun, FaTimes } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const links =
    language === "de"
      ? [
          { label: "Start", id: "home" },
          { label: "Über mich", id: "about" },
          { label: "Werdegang", id: "experience" },
          { label: "Skills", id: "skills" },
          { label: "Projekte", id: "projects" },
          { label: "Kontakt", id: "contact" },
        ]
      : [
          { label: "Home", id: "home" },
          { label: "About", id: "about" },
          { label: "Experience", id: "experience" },
          { label: "Skills", id: "skills" },
          { label: "Projects", id: "projects" },
          { label: "Contact", id: "contact" },
        ];

  const scrollToSection = (id: string) => {
    setMenuOpen(false);

    // Wir befinden uns bereits auf der Startseite
    if (isHomePage) {
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }

      return;
    }

    navigate(`/#${id}`);
  };

  useEffect(() => {
    if (!isHomePage) return;

    const hash = location.hash.replace("#", "");

    if (!hash) return;

    // Warten, bis die Sections gerendert wurden
    requestAnimationFrame(() => {
      const section = document.getElementById(hash);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }, [isHomePage, location.hash]);

  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = links
        .map((link) => document.getElementById(link.id))
        .filter(
          (section): section is HTMLElement =>
            Boolean(section)
        );

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
        currentSection =
          sections[sections.length - 1].id;
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  const switchLanguage = () => {
    setLanguage(language === "de" ? "en" : "de");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-(--accent-border) dark:bg-(--bg-primary)/90">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToSection("home")}
          className="cursor-pointer font-mono text-lg font-bold text-(--accent) transition hover:text-(--accent-hover)"
        >
          {"</DK>"}
        </button>

        <div className="flex items-center gap-4">

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 lg:flex">
            {links.map((link) => {
              const isActive =
                isHomePage &&
                activeSection === link.id;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() =>
                    scrollToSection(link.id)
                  }
                  className={`relative cursor-pointer py-2 text-sm font-medium transition ${
                    isActive
                      ? "text-(--accent)"
                      : "text-slate-700 hover:text-(--accent) dark:text-slate-300"
                  }`}
                >
                  {link.label}

                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-0.5 origin-left rounded-full bg-(--accent) transition-transform ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">

            {/* Sprache Desktop */}
            <button
              type="button"
              onClick={switchLanguage}
              aria-label={
                language === "de"
                  ? "Switch to English"
                  : "Auf Deutsch wechseln"
              }
              className="hidden h-10 min-w-10 cursor-pointer items-center justify-center rounded-lg px-2 font-mono text-xs font-semibold text-slate-500 transition hover:text-(--accent) lg:flex dark:text-(--text-secondary)"
            >
              {language === "de" ? "EN" : "DE"}
            </button>

            {/* Theme */}
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
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-(--accent) hover:text-(--accent) dark:border-(--accent-border) dark:bg-(--bg-secondary) dark:text-(--text-secondary) dark:hover:border-(--accent)"
            >
              {theme === "dark" ? <FaSun /> : <FaMoon />}
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() =>
                setMenuOpen((current) => !current)
              }
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
              className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-(--accent) hover:text-(--accent-hover) lg:hidden dark:border-slate-700 dark:bg-(--bg-secondary) dark:text-slate-300 dark:hover:border-(--accent)"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden dark:border-slate-800 dark:bg-(--bg-primary)">
          <div className="mx-auto flex max-w-6xl flex-col gap-2">

            {links.map((link) => {
              const isActive =
                isHomePage &&
                activeSection === link.id;

              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() =>
                    scrollToSection(link.id)
                  }
                  className={`cursor-pointer rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-(--accent-soft) text-(--accent)"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-(--bg-secondary)"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}

            {/* Sprache Mobile */}
            <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-(--text-secondary)">
                {language === "de"
                  ? "Sprache"
                  : "Language"}
              </span>

              <div className="flex items-center gap-1 font-mono text-xs font-semibold">
                <button
                  type="button"
                  onClick={() =>
                    setLanguage("de")
                  }
                  aria-pressed={
                    language === "de"
                  }
                  className={`cursor-pointer rounded-lg px-3 py-2 transition ${
                    language === "de"
                      ? "bg-(--accent) text-slate-950"
                      : "text-slate-500 hover:text-(--accent) dark:text-(--text-secondary)"
                  }`}
                >
                  DE
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setLanguage("en")
                  }
                  aria-pressed={
                    language === "en"
                  }
                  className={`cursor-pointer rounded-lg px-3 py-2 transition ${
                    language === "en"
                      ? "bg-(--accent) text-slate-950"
                      : "text-slate-500 hover:text-(--accent) dark:text-(--text-secondary)"
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
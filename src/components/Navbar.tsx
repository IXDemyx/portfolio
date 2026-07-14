import { useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const links = [
    { label: "Home", href: "#home" },
    { label: "Über mich", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projekte", href: "#projects" },
    { label: "Kontakt", href: "#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur transition-colors dark:border-slate-800 dark:bg-slate-950/85">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#home"
          className="font-mono text-lg font-bold text-cyan-600 dark:text-cyan-400"
        >
          {"</DK>"}
        </a>

        <div className="flex items-center gap-4">
          <nav className="hidden gap-6 text-slate-700 md:flex dark:text-slate-300">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? "Helles Design aktivieren"
                : "Dunkles Design aktivieren"
            }
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-cyan-400 hover:text-cyan-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:text-cyan-400"
          >
            {theme === "dark" ? (
              <FaSun aria-hidden="true" />
            ) : (
              <FaMoon aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-lg border border-slate-300 px-3 py-2 text-slate-700 md:hidden dark:border-slate-700 dark:text-slate-300"
            aria-label="Navigation öffnen"
            aria-expanded={menuOpen}
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="border-t border-slate-200 bg-white px-6 py-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto flex max-w-6xl flex-col gap-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-slate-700 transition hover:text-cyan-600 dark:text-slate-300 dark:hover:text-cyan-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur border-b border-slate-800">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-cyan-400">
          Daniel Keller
        </h1>

        <nav className="flex gap-6 text-slate-300">
          <a href="#home" className="hover:text-cyan-400 transition">
            Home
          </a>

          <a href="#about" className="hover:text-cyan-400 transition">
            Über mich
          </a>
          
          <a href="#skills" className="transition hover:text-cyan-400">
            Skills
          </a>
          
          <a href="#projects" className="hover:text-cyan-400 transition">
            Projekte
          </a>

          <a href="#contact" className="hover:text-cyan-400 transition">
            Kontakt
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
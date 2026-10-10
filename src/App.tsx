import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";
import Legal from "./pages/Legal";
import Privacy from "./pages/Privacy";

import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

export type Language = "de" | "en";

/** Gespeicherte Sprache, sonst die des Browsers (Deutsch für alle „de-…“, sonst Englisch). */
function getInitialLanguage(): Language {
  try {
    const saved = localStorage.getItem("language");
    if (saved === "de" || saved === "en") return saved;
  } catch {
    // Ohne Speicher einfach nach dem Browser gehen.
  }
  return navigator.language.toLowerCase().startsWith("de") ? "de" : "en";
}

function App() {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  // Wahl merken und dem Browser, Google und Screenreadern die Sprache mitteilen.
  useEffect(() => {
    document.documentElement.lang = language;
    try {
      localStorage.setItem("language", language);
    } catch {
      // Ohne Speicher gilt die Wahl nur bis zum Neuladen.
    }
  }, [language]);

  return (
    <div className="overflow-x-clip">
      <ScrollToTop />
      <Navbar language={language} setLanguage={setLanguage} />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <main>
                <Hero language={language} />
                <About language={language} />
                <Timeline language={language} />
                <Skills language={language} />
                <Projects language={language} />
                <Contact language={language} />
              </main>

              <Footer language={language} />
            </>
          }
        />

        <Route
          path="/legal"
          element={
            <>
              <main>
                <Legal language={language} />
              </main>

              <Footer language={language} />
            </>
          }
        />
        <Route
          path="/privacy"
          element={
            <>
              <main>
                <Privacy language={language} />
              </main>

              <Footer language={language} />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;

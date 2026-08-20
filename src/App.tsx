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
import GuessTheSong from "./pages/GuessTheSong";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

export type Language = "de" | "en";

function App() {
  const [language, setLanguage] = useState<Language>("en");

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
        <Route
          path="/guess-the-song"
          element={
            <>
              <main>
                <GuessTheSong />
              </main>

              <Footer language={language} />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

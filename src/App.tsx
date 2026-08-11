import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import Timeline from "./components/Timeline";
import Imprint from "./pages/Imprint";
import Privacy from "./pages/Privacy";

import { useState } from "react";
import { Routes, Route } from "react-router-dom";

export type Language = "de" | "en";

function App() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <div className="overflow-x-clip">
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

        <Route path="/imprint" element={<Imprint language={language} />} />
        <Route path="/privacy" element={<Privacy language={language} />} />
      </Routes>
    </div>
  );
}

export default App;

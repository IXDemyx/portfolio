import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";
import { useState } from "react";

export type Language = "de" | "en";

function App() {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <div className="overflow-x-clip">
      <Navbar
        language={language}
        setLanguage={setLanguage}
      />

      <main>
        <Hero language={language} />
        <About language={language} />
        <Skills language={language} />
        <Projects language={language} />
        <Contact language={language} />
      </main>

      <Footer language={language}/>
    </div>
  );
}

export default App;
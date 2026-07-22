import profile from "../data/profile";
import skillsSection from "../data/skillsSection";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import SkillCard from "../components/SkillCard";
import type { Language } from "../App";

interface SkillsProps {
  language: Language;
}

function Skills({ language }: SkillsProps) {
  return (
    <section
      id="skills"
      className="relative border-y border-slate-200 px-6 py-28 dark:border-(--accent-soft)"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            subtitle={skillsSection.subtitle[language]}
            title={skillsSection.title[language]}
            description={skillsSection.description[language]}
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((skill, index) => (
            <Reveal
              key={skill.name}
              delay={Math.min(index * 0.06, 0.3)}
            >
              <SkillCard
                title={skill.name}
                description={skill.description[language]}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
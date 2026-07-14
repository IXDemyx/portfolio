import profile from "../data/profile";
import Reveal from "../components/Reveal";
import SectionHeading from "../components/SectionHeading";
import SkillCard from "../components/SkillCard";

function Skills() {
  return (
    <section
      id="skills"
      className="relative border-y border-slate-800/40 px-6 py-28"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <SectionHeading
            subtitle="Skills"
            title="Technologien, mit denen ich arbeite"
            description="Eine Auswahl der Technologien und Werkzeuge, die ich für meine Projekte verwende."
          />
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((skill, index) => (
            <Reveal key={skill.name} delay={Math.min(index * 0.06, 0.3)}>
              <SkillCard title={skill.name} description={skill.description} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;

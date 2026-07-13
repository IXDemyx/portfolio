import profile from "../data/profile";
import SectionHeading from "../components/SectionHeading";
import SkillCard from "../components/SkillCard";

function Skills() {
  return (
    <section id="skills" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          subtitle="Skills"
          title="Technologien, mit denen ich arbeite"
          description="Eine Auswahl der Technologien und Werkzeuge, die ich für meine Projekte verwende."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.map((skill) => (
            <SkillCard key={skill} title={skill} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
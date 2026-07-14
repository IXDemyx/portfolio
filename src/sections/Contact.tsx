import profile from "../data/profile";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";

function Contact() {
  return (
    <section id="contact" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 transition-colors sm:px-10 dark:border-slate-800 dark:bg-slate-900">
          <SectionHeading
            subtitle="Kontakt"
            title="Lass mir gerne eine Nachricht da"
            description="Du hast Fragen, eine Idee für ein Projekt oder möchtest einfach Kontakt aufnehmen? Schreib mir gerne – ich freue mich darauf, von dir zu hören."
          />

          <div className="flex flex-wrap gap-4">
            <Button href={`mailto:${profile.email}`}>
              E-Mail schreiben
            </Button>

            <Button
              href={profile.github}
              variant="secondary"
              external
            >
              GitHub öffnen
            </Button>

            {profile.linkedin && (
              <Button
                href={profile.linkedin}
                variant="secondary"
                external
              >
                LinkedIn öffnen
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
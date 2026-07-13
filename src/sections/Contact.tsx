import profile from "../data/profile";
import Button from "../components/Button";
import SectionHeading from "../components/SectionHeading";

function Contact() {
  return (
    <section id="contact" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 sm:px-10">
          <SectionHeading
            subtitle="Kontakt"
            title="Lass uns miteinander sprechen"
            description="Du möchtest dich über ein Projekt, eine mögliche Zusammenarbeit oder eine berufliche Gelegenheit austauschen? Schreib mir gerne eine Nachricht."
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
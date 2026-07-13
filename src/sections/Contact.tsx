import profile from "../data/profile";

function Contact() {
  return (
    <section id="contact" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-6 py-12 sm:px-10">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-cyan-500">
              Kontakt
            </p>

            <h2 className="text-3xl font-bold text-slate-950 sm:text-4xl">
              Lass uns miteinander sprechen
            </h2>

            <p className="mt-4 text-lg leading-8 text-slate-600">
              Du möchtest dich über ein Projekt, eine mögliche Zusammenarbeit
              oder eine berufliche Gelegenheit austauschen? Schreib mir gerne
              eine Nachricht.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`mailto:${profile.email}`}
                className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                E-Mail schreiben
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600"
              >
                GitHub öffnen
              </a>

              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-cyan-500 hover:text-cyan-600"
                >
                  LinkedIn öffnen
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
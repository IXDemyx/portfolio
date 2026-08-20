import type { Language } from "../App";
import profile from "../data/profile";
import impressum from "../data/legal";

interface ImpressumProps {
  language: Language;
}

function Legal({ language }: ImpressumProps) {
  const sections = [
    impressum.sections.liabilityContent,
    impressum.sections.liabilityLinks,
    impressum.sections.copyright,
  ];

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 text-4xl font-bold text-slate-950 dark:text-(--text-primary)">
          {impressum.title[language]}
        </h1>

        <div className="space-y-8 text-base leading-7 text-slate-600 dark:text-(--text-secondary)">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {impressum.sections.information.title[language]}
            </h2>

            <p>
              {profile.name}
              <br />
              {profile.street}
              <br />
              {profile.area}
              <br />
              {profile.location[language]}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {impressum.sections.contact.title[language]}
            </h2>

            <p>
              {impressum.sections.contact.emailLabel[language]}:{" "}
              <a
                href={`mailto:${profile.email}`}
                className="text-(--accent) transition hover:text-(--accent-hover)"
              >
                {profile.email}
              </a>
            </p>
          </section>

          {sections.map((section) => (
            <section key={section.title.en}>
              <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
                {section.title[language]}
              </h2>

              <div className="space-y-4">
                {section.paragraphs[language].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}

export default Legal;

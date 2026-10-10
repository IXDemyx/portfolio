import type { Language } from "../App";
import profile from "../data/profile";
import privacy from "../data/privacy";

interface PrivacyProps {
  language: Language;
}

function Privacy({ language }: PrivacyProps) {
  const sections = [
    privacy.sections.general,
    privacy.sections.hosting,
    privacy.sections.email,
    privacy.sections.externalLinks,
    privacy.sections.cookies,
    privacy.sections.rights,
    privacy.sections.changes,
  ];

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 text-4xl font-bold text-slate-950 dark:text-(--text-primary)">
          {privacy.title[language]}
        </h1>

        <div className="space-y-10 text-base leading-7 text-slate-600 dark:text-(--text-secondary)">
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {privacy.sections.controller.title[language]}
            </h2>

            <p>
              Daniel Keller
              <br />
              {profile.street}
              <br />
              {profile.area}
              <br />
              {profile.location[language]}
              <br />
              <br />
              E-Mail:{" "}
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

export default Privacy;
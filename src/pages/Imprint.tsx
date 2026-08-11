import type { Language } from "../App";
import profile from "../data/profile";

type ImpressumProps = {
  language: Language;
};

export default function Impressum({ language }: ImpressumProps) {
  const isGerman = language === "de";

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 text-4xl font-bold">
          {isGerman ? "Impressum" : "Legal Notice"}
        </h1>

        <div className="space-y-8 text-base leading-7">
          <section>
            <h2 className="mb-3 text-xl font-semibold">
              {isGerman
                ? "Angaben gemäß § 18 Abs. 1 MStV"
                : "Information according to § 18 (1) MStV"}
            </h2>

            <p>
              Daniel Keller
              <br />
              Liebigstraße 24
              <br />
              32657 Lemgo
              <br />
              Deutschland
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">
              {isGerman ? "Kontakt" : "Contact"}
            </h2>

            <p>
              E-Mail:{" "}
              <a
                href="mailto:DEINE-EMAIL"
                className="text-[var(--accent)] hover:underline"
              >
                {profile.email}
              </a>
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">
              {isGerman ? "Haftung für Inhalte" : "Liability for Content"}
            </h2>

            <p>
              {isGerman
                ? "Als Diensteanbieter bin ich für eigene Inhalte auf dieser Website nach den allgemeinen Gesetzen verantwortlich."
                : "As a service provider, I am responsible for my own content on this website in accordance with general laws."}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">
              {isGerman ? "Haftung für Links" : "Liability for Links"}
            </h2>

            <p>
              {isGerman
                ? "Diese Website kann Links zu externen Websites Dritter enthalten, auf deren Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich."
                : "This website may contain links to external third-party websites over whose content I have no control. The respective provider or operator is always responsible for the content of linked websites."}
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold">
              {isGerman ? "Urheberrecht" : "Copyright"}
            </h2>

            <p>
              {isGerman
                ? "Die auf dieser Website erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Soweit Inhalte nicht von mir erstellt wurden, werden die Urheberrechte Dritter beachtet."
                : "The content and works created on this website are subject to German copyright law. Where content was not created by me, the copyrights of third parties are respected."}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
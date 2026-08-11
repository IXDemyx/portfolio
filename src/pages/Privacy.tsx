import type { Language } from "../App";
import profile from "../data/profile";


interface PrivacyProps {
  language: Language;
}

function Privacy({ language }: PrivacyProps) {
  const isGerman = language === "de";

  return (
    <main className="min-h-screen px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-10 text-4xl font-bold text-slate-950 dark:text-(--text-primary)">
          {isGerman ? "Datenschutzerklärung" : "Privacy Policy"}
        </h1>

        <div className="space-y-10 text-base leading-7 text-slate-600 dark:text-(--text-secondary)">
          {/* Controller */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {isGerman ? "1. Verantwortlicher" : "1. Controller"}
            </h2>

            <p>
              Daniel Keller
              <br />
              Liebigstraße 24
              <br />
              32657 Lemgo
              <br />
              Deutschland
              <br />
              <br />
              E-Mail:{" "}
              <a
                href="mailto:DEINE-EMAIL"
                className="text-(--accent) transition hover:text-(--accent-hover)"
              >
                {profile.email}
              </a>
            </p>
          </section>

          {/* General information */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {isGerman
                ? "2. Allgemeine Hinweise"
                : "2. General Information"}
            </h2>

            <p>
              {isGerman
                ? "Der Schutz Ihrer persönlichen Daten ist mir wichtig. Personenbezogene Daten werden auf dieser Website nur verarbeitet, soweit dies für die Bereitstellung und den Betrieb der Website erforderlich ist."
                : "Protecting your personal data is important to me. Personal data is processed on this website only to the extent necessary to provide and operate the website."}
            </p>
          </section>

          {/* Vercel */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {isGerman
                ? "3. Hosting mit Vercel"
                : "3. Hosting with Vercel"}
            </h2>

            <p>
              {isGerman
                ? "Diese Website wird über Vercel bereitgestellt. Anbieter ist die Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA."
                : "This website is hosted using Vercel. The provider is Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA."}
            </p>

            <p className="mt-4">
              {isGerman
                ? "Beim Aufruf dieser Website können technische Daten verarbeitet werden, die für die Auslieferung und Sicherheit der Website erforderlich sind. Dazu können insbesondere die IP-Adresse, Logdaten, Informationen zum verwendeten Browser und Betriebssystem sowie Zeitpunkt und Art des Seitenaufrufs gehören."
                : "When this website is accessed, technical data required to deliver and secure the website may be processed. This may include your IP address, log data, information about your browser and operating system, as well as the time and type of the request."}
            </p>

            <p className="mt-4">
              {isGerman
                ? "Die Verarbeitung erfolgt auf Grundlage meines berechtigten Interesses an einer sicheren, zuverlässigen und effizienten Bereitstellung dieser Website gemäß Art. 6 Abs. 1 lit. f DSGVO."
                : "Processing is based on my legitimate interest in providing this website securely, reliably and efficiently pursuant to Art. 6(1)(f) GDPR."}
            </p>

            <p className="mt-4">
              {isGerman
                ? "Da Vercel ein Unternehmen mit Sitz in den USA ist, kann eine Verarbeitung personenbezogener Daten auch außerhalb der Europäischen Union stattfinden."
                : "As Vercel is a company based in the United States, personal data may also be processed outside the European Union."}
            </p>
          </section>

          {/* Google Fonts */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              4. Google Fonts
            </h2>

            <p>
              {isGerman
                ? "Diese Website verwendet Google Fonts zur einheitlichen Darstellung von Schriftarten. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland."
                : "This website uses Google Fonts to provide a consistent display of fonts. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland."}
            </p>

            <p className="mt-4">
              {isGerman
                ? "Beim Aufruf einer Seite lädt Ihr Browser die benötigten Schriftarten direkt von Servern von Google. Dabei wird eine Verbindung zu Google hergestellt. Google erhält dabei unter anderem Ihre IP-Adresse, die angeforderte URL sowie Informationen über Ihren Browser, Ihr Betriebssystem und die zuvor aufgerufene beziehungsweise einbindende Seite."
                : "When a page is accessed, your browser loads the required fonts directly from Google's servers. This establishes a connection to Google. Google may receive information including your IP address, the requested URL, information about your browser and operating system, and the referring page."}
            </p>

            <p className="mt-4">
              {isGerman
                ? "Google gibt an, dass die Google Fonts Web API keine Cookies setzt und die über Google Fonts erhobenen Informationen nicht zur Erstellung von Nutzerprofilen oder für zielgerichtete Werbung verwendet werden."
                : "Google states that the Google Fonts Web API does not set cookies and that information collected through Google Fonts is not used to create user profiles or for targeted advertising."}
            </p>

            <p className="mt-4">
              {isGerman
                ? "Die Verwendung erfolgt zur einheitlichen und ansprechenden Darstellung dieser Website. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Mein berechtigtes Interesse liegt in einer konsistenten Darstellung der Website."
                : "Google Fonts are used to provide a consistent and visually appealing presentation of this website. Processing is based on Art. 6(1)(f) GDPR. My legitimate interest is the consistent presentation of the website."}
            </p>
          </section>

          {/* Email */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {isGerman
                ? "5. Kontaktaufnahme per E-Mail"
                : "5. Contact by Email"}
            </h2>

            <p>
              {isGerman
                ? "Auf dieser Website besteht die Möglichkeit, mich über einen E-Mail-Link zu kontaktieren. Dabei wird kein Kontaktformular verwendet und es werden durch diese Website selbst keine eingegebenen Nachrichten oder Kontaktdaten gespeichert."
                : "This website provides the option to contact me using an email link. No contact form is used and this website itself does not store messages or contact details entered by you."}
            </p>

            <p className="mt-4">
              {isGerman
                ? "Wenn Sie mir eine E-Mail senden, werden die von Ihnen übermittelten Daten zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet. Rechtsgrundlage hierfür ist je nach Inhalt der Anfrage Art. 6 Abs. 1 lit. b oder lit. f DSGVO."
                : "If you send me an email, the information you provide will be processed in order to respond to your request. Depending on the nature of the request, the legal basis is Art. 6(1)(b) or Art. 6(1)(f) GDPR."}
            </p>
          </section>

          {/* External links */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {isGerman
                ? "6. Externe Links"
                : "6. External Links"}
            </h2>

            <p>
              {isGerman
                ? "Diese Website enthält Links zu externen Angeboten wie GitHub und LinkedIn. Eine Verbindung zu diesen Diensten wird grundsätzlich erst hergestellt, wenn Sie einen entsprechenden Link anklicken. Ab diesem Zeitpunkt gelten die Datenschutzbestimmungen des jeweiligen Anbieters."
                : "This website contains links to external services such as GitHub and LinkedIn. A connection to these services is generally only established when you click the corresponding link. From that point onward, the privacy policies of the respective provider apply."}
            </p>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {isGerman
                ? "7. Cookies und Tracking"
                : "7. Cookies and Tracking"}
            </h2>

            <p>
              {isGerman
                ? "Diese Website verwendet derzeit keine eigenen Analyse-, Werbe- oder Trackingdienste. Es werden von mir keine Cookies zu Analyse- oder Marketingzwecken gesetzt."
                : "This website currently does not use its own analytics, advertising or tracking services. I do not set cookies for analytics or marketing purposes."}
            </p>
          </section>

          {/* Rights */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {isGerman ? "8. Ihre Rechte" : "8. Your Rights"}
            </h2>

            <p>
              {isGerman
                ? "Sie haben im Rahmen der geltenden Datenschutzgesetze insbesondere das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten sowie gegebenenfalls auf Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit."
                : "Under applicable data protection laws, you have the right to obtain information about your stored personal data and, where applicable, to request correction, deletion, restriction of processing and data portability."}
            </p>

            <p className="mt-4">
              {isGerman
                ? "Sie haben außerdem das Recht, einer Verarbeitung personenbezogener Daten, die auf Art. 6 Abs. 1 lit. f DSGVO beruht, aus Gründen zu widersprechen, die sich aus Ihrer besonderen Situation ergeben."
                : "You also have the right to object, on grounds relating to your particular situation, to processing of personal data based on Art. 6(1)(f) GDPR."}
            </p>

            <p className="mt-4">
              {isGerman
                ? "Darüber hinaus haben Sie das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren."
                : "You also have the right to lodge a complaint with a competent data protection supervisory authority."}
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="mb-3 text-xl font-semibold text-slate-950 dark:text-(--text-primary)">
              {isGerman
                ? "9. Änderung dieser Datenschutzerklärung"
                : "9. Changes to this Privacy Policy"}
            </h2>

            <p>
              {isGerman
                ? "Ich behalte mir vor, diese Datenschutzerklärung anzupassen, wenn sich die Website, eingesetzte Dienste oder rechtliche Anforderungen ändern."
                : "I reserve the right to update this privacy policy if the website, the services used or legal requirements change."}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Privacy;
const privacy = {
  title: {
    de: "Datenschutzerklärung",
    en: "Privacy Policy",
  },

  sections: {
    controller: {
      title: {
        de: "1. Verantwortlicher",
        en: "1. Controller",
      },
    },

    general: {
      title: {
        de: "2. Allgemeine Hinweise",
        en: "2. General Information",
      },

      paragraphs: {
        de: [
          "Der Schutz Ihrer persönlichen Daten ist mir wichtig. Personenbezogene Daten werden auf dieser Website nur verarbeitet, soweit dies für die Bereitstellung und den Betrieb der Website erforderlich ist.",
        ],
        en: [
          "Protecting your personal data is important to me. Personal data is processed on this website only to the extent necessary to provide and operate the website.",
        ],
      },
    },

    hosting: {
      title: {
        de: "3. Hosting und Cloudflare",
        en: "3. Hosting and Cloudflare",
      },

      paragraphs: {
        de: [
          "Diese Website läuft auf einem eigenen Server. Die Verbindung dorthin wird über Cloudflare bereitgestellt. Anbieter ist die Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.",
          "Cloudflare leitet die Anfragen weiter, schützt die Website vor Angriffen und verarbeitet dabei technische Daten, die für die Auslieferung und Sicherheit der Website erforderlich sind. Dazu gehören insbesondere die IP-Adresse, Datum und Uhrzeit des Zugriffs sowie Informationen zu Browser und Betriebssystem.",
          "Die Verarbeitung erfolgt auf Grundlage meines berechtigten Interesses an einer sicheren, zuverlässigen und effizienten Bereitstellung dieser Website gemäß Art. 6 Abs. 1 lit. f DSGVO.",
          "Da Cloudflare ein Unternehmen mit Sitz in den USA ist, kann eine Verarbeitung personenbezogener Daten auch außerhalb der Europäischen Union stattfinden. Cloudflare ist nach dem EU-US Data Privacy Framework zertifiziert.",
        ],

        en: [
          "This website runs on my own server. The connection to it is provided via Cloudflare. The provider is Cloudflare, Inc., 101 Townsend St., San Francisco, CA 94107, USA.",
          "Cloudflare forwards requests, protects the website against attacks and processes technical data required to deliver and secure the website. This includes in particular your IP address, the date and time of access and information about your browser and operating system.",
          "Processing is based on my legitimate interest in providing this website securely, reliably and efficiently pursuant to Art. 6(1)(f) GDPR.",
          "As Cloudflare is a company based in the United States, personal data may also be processed outside the European Union. Cloudflare is certified under the EU-US Data Privacy Framework.",
        ],
      },
    },

    email: {
      title: {
        de: "4. Kontaktaufnahme per E-Mail",
        en: "4. Contact by Email",
      },

      paragraphs: {
        de: [
          "Auf dieser Website besteht die Möglichkeit, mich über einen E-Mail-Link zu kontaktieren. Dabei wird kein Kontaktformular verwendet und es werden durch diese Website selbst keine eingegebenen Nachrichten oder Kontaktdaten gespeichert.",
          "Wenn Sie mir eine E-Mail senden, werden die von Ihnen übermittelten Daten zum Zweck der Bearbeitung Ihrer Anfrage verarbeitet. Rechtsgrundlage hierfür ist je nach Inhalt der Anfrage Art. 6 Abs. 1 lit. b oder lit. f DSGVO.",
        ],

        en: [
          "This website provides the option to contact me using an email link. No contact form is used and this website itself does not store messages or contact details entered by you.",
          "If you send me an email, the information you provide will be processed in order to respond to your request. Depending on the nature of the request, the legal basis is Art. 6(1)(b) or Art. 6(1)(f) GDPR.",
        ],
      },
    },

    externalLinks: {
      title: {
        de: "5. Externe Links",
        en: "5. External Links",
      },

      paragraphs: {
        de: [
          "Diese Website enthält Links zu externen Angeboten wie GitHub und LinkedIn. Eine Verbindung zu diesen Diensten wird grundsätzlich erst hergestellt, wenn Sie einen entsprechenden Link anklicken. Ab diesem Zeitpunkt gelten die Datenschutzbestimmungen des jeweiligen Anbieters.",
        ],

        en: [
          "This website contains links to external services such as GitHub and LinkedIn. A connection to these services is generally only established when you click the corresponding link. From that point onward, the privacy policies of the respective provider apply.",
        ],
      },
    },

    cookies: {
      title: {
        de: "6. Cookies und Tracking",
        en: "6. Cookies and Tracking",
      },

      paragraphs: {
        de: [
          "Diese Website verwendet derzeit keine eigenen Analyse-, Werbe- oder Trackingdienste. Es werden von mir keine Cookies zu Analyse- oder Marketingzwecken gesetzt.",
        ],

        en: [
          "This website currently does not use its own analytics, advertising or tracking services. I do not set cookies for analytics or marketing purposes.",
        ],
      },
    },

    rights: {
      title: {
        de: "7. Ihre Rechte",
        en: "7. Your Rights",
      },

      paragraphs: {
        de: [
          "Sie haben im Rahmen der geltenden Datenschutzgesetze insbesondere das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten sowie gegebenenfalls auf Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit.",
          "Sie haben außerdem das Recht, einer Verarbeitung personenbezogener Daten, die auf Art. 6 Abs. 1 lit. f DSGVO beruht, aus Gründen zu widersprechen, die sich aus Ihrer besonderen Situation ergeben.",
          "Darüber hinaus haben Sie das Recht, sich bei einer zuständigen Datenschutzaufsichtsbehörde zu beschweren.",
        ],

        en: [
          "Under applicable data protection laws, you have the right to obtain information about your stored personal data and, where applicable, to request correction, deletion, restriction of processing and data portability.",
          "You also have the right to object, on grounds relating to your particular situation, to processing of personal data based on Art. 6(1)(f) GDPR.",
          "You also have the right to lodge a complaint with a competent data protection supervisory authority.",
        ],
      },
    },

    changes: {
      title: {
        de: "8. Änderung dieser Datenschutzerklärung",
        en: "8. Changes to this Privacy Policy",
      },

      paragraphs: {
        de: [
          "Ich behalte mir vor, diese Datenschutzerklärung anzupassen, wenn sich die Website, eingesetzte Dienste oder rechtliche Anforderungen ändern.",
        ],

        en: [
          "I reserve the right to update this privacy policy if the website, the services used or legal requirements change.",
        ],
      },
    },
  },
} as const;

export default privacy;
const legal = {
  title: {
    de: "Impressum",
    en: "Legal Notice",
  },

  sections: {
    information: {
      title: {
        de: "Angaben gemäß § 18 Abs. 1 MStV",
        en: "Information according to § 18 (1) MStV",
      },
    },

    contact: {
      title: {
        de: "Kontakt",
        en: "Contact",
      },

      emailLabel: {
        de: "E-Mail",
        en: "Email",
      },
    },

    liabilityContent: {
      title: {
        de: "Haftung für Inhalte",
        en: "Liability for Content",
      },

      paragraphs: {
        de: [
          "Als Diensteanbieter bin ich für eigene Inhalte auf dieser Website nach den allgemeinen Gesetzen verantwortlich.",
        ],
        en: [
          "As a service provider, I am responsible for my own content on this website in accordance with general laws.",
        ],
      },
    },

    liabilityLinks: {
      title: {
        de: "Haftung für Links",
        en: "Liability for Links",
      },

      paragraphs: {
        de: [
          "Diese Website kann Links zu externen Websites Dritter enthalten, auf deren Inhalte ich keinen Einfluss habe. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber verantwortlich.",
        ],
        en: [
          "This website may contain links to external third-party websites over whose content I have no control. The respective provider or operator is always responsible for the content of linked websites.",
        ],
      },
    },

    copyright: {
      title: {
        de: "Urheberrecht",
        en: "Copyright",
      },

      paragraphs: {
        de: [
          "Die auf dieser Website erstellten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Soweit Inhalte nicht von mir erstellt wurden, werden die Urheberrechte Dritter beachtet.",
        ],
        en: [
          "The content and works created on this website are subject to German copyright law. Where content was not created by me, the copyrights of third parties are respected.",
        ],
      },
    },
  },
} as const;

export default legal;
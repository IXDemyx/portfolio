export interface Project {
  id: string;

  title: {
    de: string;
    en: string;
  };

  description: {
    de: string;
    en: string;
  };

  technologies: string[];
  github: string;
  demo?: string;
  image?: string;
}

const projects: Project[] = [
  {
    id: "cozynyte",

    title: {
      de: "Cozynyte",
      en: "Cozynyte",
    },

    description: {
      de: "Gemütliche Multiplayer-Partyspiele im Browser – Song erraten, Stadt Land Fluss, Montagsmaler, Länder-Quiz, Kniffel und mehr. Räume per Link, Chat und Spiellogik in Echtzeit auf dem eigenen Server.",
      en: "Cozy multiplayer party games in the browser – Guess the Song, Name Place Animal Thing, Draw & Guess, Country Quiz, Yahtzee and more. Rooms via link, chat and real-time game logic on my own server.",
    },

    technologies: ["React", "TypeScript", "Socket.IO", "Node.js", "Tailwind CSS", "Docker"],

    github: "https://github.com/IXDemyx/cozynyte",

    demo: "https://cozynyte.com",

    image: "/projects/games.png",
  },

  {
    id: "portfolio",

    title: {
      de: "Portfolio Website",
      en: "Portfolio Website",
    },

    description: {
      de: "Meine persönliche Portfolio-Website, entwickelt mit React und Tailwind CSS.",
      en: "My personal portfolio website, built with React and Tailwind CSS.",
    },

    technologies: ["React", "TypeScript", "Tailwind CSS"],

    github: "https://github.com/IXDemyx/portfolio",

    image: "/projects/portfolio.png",
  },

  {
    id: "curve-fever",

    title: {
      de: "Curve-Fever-Klon",
      en: "Curve Fever Clone",
    },

    description: {
      de: "Ein Zwei-Spieler-Spiel, bei dem man die Linie des Gegners nicht berühren darf.",
      en: "A two-player game where the goal is to avoid touching your opponent's trail.",
    },

    technologies: ["Python"],

    github: "https://github.com/IXDemyx/Curve-Fever",

    image: "/projects/curvefever.png",
  },

  {
    id: "bonhoeffer-thoughts",

    title: {
      de: "Bonhoeffer Thoughts",
      en: "Bonhoeffer Thoughts",
    },

    description: {
      de: "Eine Social-Media-Webanwendung – ähnlich wie Twitter – für meine damalige Schule.",
      en: "A social media web application similar to Twitter, created for my former school.",
    },

    technologies: ["Python", "HTML", "CSS", "JavaScript"],

    github: "https://github.com/IXDemyx/Socialmedia2",

    image: "/projects/socialmedia.png",
  },
];

export default projects;
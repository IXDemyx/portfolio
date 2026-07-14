export interface Project {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  demo?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "Portfolio Website",
    description:
      "Meine persönliche Portfolio-Website, entwickelt mit React und Tailwind CSS.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/...",
    image: "/projects/test.png"

  },

  // {
  //   title: "Mastermind",
  //   description:
  //     "Das Logik-Brettspiel 'Mastermind' komplett in Python.",
  //   technologies: ["Python"],
  //   github: "https://github.com/IXDemyx/Mastermind",
  // },

  {
    title: "Curve-Fever-Klon",
    description:
      "Ein 2 Spieler Spiel in dem man nicht die Linie des Gegners berühren darf.",
    technologies: ["Python"],
    github: "https://github.com/IXDemyx/Curve-Fever",
    image: "/projects/test.png"
  },

  {
    title: "Bonhoeffer Thoughts",
    description:
      "Socialmedia Webanwendung, wie eine art Twitter für meine damalige Schule.",
    technologies: ["Python", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/...",
    image: "/projects/test.png"

  },
];

export default projects;
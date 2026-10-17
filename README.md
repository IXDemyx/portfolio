# Portfolio Website

My personal portfolio – skills, selected projects and experience as a software developer –
built with **React**, **TypeScript** and **Tailwind CSS**. Live at <https://daniel-keller.dev>.

My multiplayer party games – Guess the Song, Stadt Land Fluss, Draw & Guess, Country Quiz,
Yahtzee and more – live in their own repository: [Cozynyte](https://github.com/IXDemyx/cozynyte),
playable at <https://cozynyte.com>.

## Tech Stack

- React, TypeScript, Vite
- Tailwind CSS
- Framer Motion
- German and English, light and dark theme

## Getting Started

```bash
git clone <repository-url>
cd portfolio
npm install
npm run dev
```

`npm run dev` starts the portfolio on <http://localhost:5173>.

Other scripts:

| Script            | What it does                                    |
| ----------------- | ----------------------------------------------- |
| `npm run build`   | Type-checks and builds the portfolio to `dist/` |
| `npm run lint`    | Runs ESLint                                     |
| `npm run preview` | Serves the built portfolio locally              |

## Docker

```bash
docker compose up -d --build
```

The portfolio is then served by nginx on <http://localhost:5173>. In production it runs on a
home server behind a Cloudflare Tunnel.

## License

This project was created as a personal portfolio and reference project. It is intended to
showcase my work, skills and experience as a software developer.

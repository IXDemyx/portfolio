# Portfolio Website

My personal portfolio – skills, selected projects and experience as a software developer –
built with **React**, **TypeScript** and **Tailwind CSS**. Live at <https://daniel-keller.dev>.

The repository also contains [`games/`](games/README.md): multiplayer party games in the
browser (Guess the Song, Stadt Land Fluss, Draw & Guess, Yahtzee, …), live at
<https://games.daniel-keller.dev>.

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

`npm run dev` starts the portfolio on <http://localhost:5173> **and** the games on
<http://localhost:5174> (run `npm install` in `games/` once beforehand).
Portfolio only: `npm run dev:portfolio`.

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

| Service    | Port   | Contents                                          |
| ---------- | ------ | ------------------------------------------------- |
| `frontend` | `5173` | Portfolio, served by nginx                        |
| `games`    | `1337` | Games: frontend, API and WebSockets (Node server) |

In production both run on a home server behind a Cloudflare Tunnel.

## License

This project was created as a personal portfolio and reference project. It is intended to
showcase my work, skills and experience as a software developer.

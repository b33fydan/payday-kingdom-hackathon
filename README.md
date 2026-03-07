# Payday Kingdom
> Turn your boring budget into an epic voxel adventure.

[Live Demo](https://pk-hackathon-2026.vercel.app/) · [GitHub Repo](https://github.com/b33fydan/payday-kingdom-hackathon)

![Payday Kingdom landing page](./output/browser-checks/landing-page.png)

## What Is This?

Payday Kingdom is a hackathon-built budgeting game where your recurring bills become voxel monsters, payday summons your hero, and every disciplined month grows a tiny floating kingdom. It keeps everything local in the browser, skips bank integrations entirely, and turns personal finance into a short loop of planning, battling, leveling, and sharing.

## Demo

Play it here: [https://pk-hackathon-2026.vercel.app/](https://pk-hackathon-2026.vercel.app/)

## Screenshots

### Landing

![Landing page](./output/browser-checks/landing-page.png)

### Onboarding

![Onboarding flow](./output/browser-checks/landing-cta-onboarding.png)

### Kingdom Battle

![Payday battle](./output/browser-checks/payday-complete.png)

### Achievements

![Achievements modal](./output/browser-checks/achievements-modal.png)

## How It Works

1. Enter monthly income and recurring bills.
2. Watch each bill become a themed voxel monster on your island.
3. Trigger payday to send your hero into battle.
4. Gain XP, level up, unlock achievements, and grow the kingdom.
5. Capture a shareable kingdom image directly from the game.

## Features

- Manual income and bill entry with local persistence
- Responsive voxel island rendered with Three.js
- Hero payday battle flow with XP, levels, and island growth
- Screenshot capture, copy, download, and native share support
- Retro procedural sound effects with mute toggle
- Achievement toasts, trophy gallery, and share cards
- Landing page with animated live scene preview

## Tech Stack

![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.183-black?logo=three.js&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State-7c5cff)
![Tailwind](https://img.shields.io/badge/TailwindCSS-4-38bdf8?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646cff?logo=vite&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-QA-45ba63?logo=playwright&logoColor=white)

## Run Locally

```bash
npm install
npm run dev
```

Then open [http://127.0.0.1:5173](http://127.0.0.1:5173).

To verify the production bundle:

```bash
npm run build
```

## Roadmap

- [ ] AI agent integration with kingdom NPCs and advisors
- [ ] Multiplayer kingdom visits and flex battles
- [ ] Plaid import for optional automated bill ingestion
- [ ] Mobile app build with React Native
- [ ] Seasonal events and limited-time island themes

## Built By

Skyframe Innovations LLC  
Dan: [@b33fydan on GitHub](https://github.com/b33fydan)

## License

MIT. See [LICENSE](./LICENSE).

# project-x-mobile-app

React Native app with Expo and expo-router.

## Setup

1. Install dependencies: `pnpm install`
2. Add app icons in `assets/app/` (see `assets/app/README.md`) or adjust `app.json` to use Expo defaults.
3. Start: `pnpm start`

## Scripts

- `pnpm start` – Start Expo dev server
- `pnpm web` – Start for web
- `pnpm lint` – Lint and fix
- `pnpm check-types` – TypeScript check
- `pnpm check-circular` – Circular dependency check
- `pnpm build:dev` / `pnpm build:stage` / `pnpm build:prod` – EAS workflows (requires EAS project)

## Structure

- `app/` – expo-router screens and layouts: `(app)`, `(auth)`, `_layout`, `+not-found`, `contact-support`, `faq`
- `src/` – `api`, `components`, `constants`, `contexts`, `hooks`, `types`, `utils`
- `assets/` – `app`, `icons`, `images`, `loading-animation.json`

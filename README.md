# project-x-mobile-app

React Native app with Expo and expo-router.

## Setup

1. Install dependencies: `yarn install`
2. Add app icons in `assets/app/` (see `assets/app/README.md`) or adjust `app.json` to use Expo defaults.
3. Start: `yarn start`

## Scripts

- `yarn start` – Start Expo dev server
- `yarn web` – Start for web
- `yarn lint` – Lint and fix
- `yarn check-types` – TypeScript check
- `yarn check-circular` – Circular dependency check
- `yarn build:dev` / `yarn build:stage` / `yarn build:prod` – EAS workflows (requires EAS project)

## Structure

- `app/` – expo-router screens and layouts: `(app)`, `(auth)`, `_layout`, `+not-found`, `contact-support`, `faq`
- `src/` – `api`, `components`, `constants`, `contexts`, `hooks`, `types`, `utils`
- `assets/` – `app`, `icons`, `images`, `loading-animation.json`

# ein1

React Native app with Expo and expo-router.

## Setup

1. Install dependencies: `pnpm install`
2. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_API_URL` (default: `https://api.ein1.app`)
3. Add app icons in `assets/app/` (see `assets/app/README.md`) or adjust `app.json` to use Expo defaults.
4. Start Metro and open iOS simulator: `pnpm start` then press **`i`** in the terminal

### Development build (simulator)

This project uses **expo-dev-client**. The first screen is a launcher until Metro is connected.

1. Run `pnpm start` (keep it running).
2. Press **`i`** in that terminal to open the simulator with the bundle loaded, **or** on the launcher tap **Enter URL manually** → `http://localhost:8081`
3. You should then see **Sign in** (`/sign-in`).

If you only open the app from the home screen without Metro, you will stay on “No development servers found”.

### Dev client vs API

- **Metro** (`pnpm start`, e.g. port `8075`) — serves your JavaScript bundle. The Expo dev client “Development servers” screen is for this, not your backend.
- **API** (`EXPO_PUBLIC_API_URL`) — your backend (e.g. `https://api.ein1.app`). The app calls this via `http` from `@/src/api/client`.

On a physical device, `localhost` in the dev client points at the phone. Run `pnpm start`, then connect using your computer’s LAN IP and port (e.g. `http://192.168.1.x:8075`), or use `npx expo start --tunnel`.

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

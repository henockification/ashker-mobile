# Agent Behavior

- **Concise**: sacrifice grammar for brevity in responses & commits
- **Code-first**: deliver code first, ≤3-line clarification max
- **No fluff**: no high-level hand-waving, summaries, or docs unless asked
- **Fewer lines = better**: prefer composable utilities
- **Treat user as peer**: casual & terse but accurate
- **Suggest alternatives**: proactively when useful
- **Flag speculation**: clearly mark uncertain info
- **Dev server assumed running**: never auto-start
- **Use Playwright MCP**: test UI changes via MCP
- **agent-browser**: use for CLI browser automation (Codex/terminal). Run `agent-browser --help`. Workflow: `agent-browser open <url>` → `agent-browser snapshot -i` → `agent-browser click @e1` / `fill @e2 "text"`. Re-snapshot after page changes.

# Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.

## Project Overview

- This is `ashker-hub`, a private Expo React Native app using Expo Router, React 19, React Native 0.81, TypeScript strict mode, TanStack Query, HeroUI Native, and Uniwind/Tailwind-style classes.
- Use `pnpm` for all package and script commands. The declared package manager is `pnpm@9.15.0`.
- The app entry is `expo-router/entry`; route files live under `app/`.
- Environment variables are public Expo variables. Start from `.env.example`; do not commit local env files such as `.env.local`.

## Repository Structure

- `app/`: Expo Router screens, route groups, and layouts.
  - `(auth)`: sign-in/sign-up auth screens.
  - `(app)`: main app shell and public/signed-in app routes.
  - `(app)/(tabs)`: tabbed screens for search, businesses, projects, collections, and me.
  - Root files such as `_layout.tsx`, `index.tsx`, `faq.tsx`, `contact-support.tsx`, and `+not-found.tsx`.
- `src/api/`: Axios client, auth manager/token handling, and endpoint modules.
- `src/hooks/`: React Query hooks and feature hooks.
- `src/components/`: feature components, shared UI, forms, layouts, navigation, and gradients.
- `src/constants/`: routes, API constants, UI constants, nav/sidebar config, validation, and feature constants.
- `src/contexts/`: session/auth and user providers.
- `src/types/`: API and domain TypeScript types.
- `src/utils/`: helpers, media utilities, accessibility helpers, and icon registry support.
- `assets/`: app icons/splash assets, SVG icons, images, and animations.
- `ios/`: generated/native iOS project. Avoid editing unless a native Expo/iOS change requires it.
- `.eas/`, `eas.json`, `app.config.ts`: EAS build and Expo app configuration.

## Commands

- Install: `pnpm install`
- Start dev client Metro: `pnpm start`
- Start web: `pnpm web`
- iOS simulator/dev build: `pnpm ios`
- Android dev build: `pnpm android`
- Lint and autofix: `pnpm lint`
- Type check: `pnpm check-types`
- Circular dependency check: `pnpm check-circular`
- Regenerate SVG icon registry after changing `assets/icons/*.svg`: `pnpm sync:icons`
- EAS workflows: `pnpm build:dev`, `pnpm build:stage`, `pnpm build:prod`

## Coding Conventions

- Prefer TypeScript and keep strict mode clean. Avoid `any` unless there is a narrow, documented reason.
- Use the `@/` path alias for project-root imports when importing across folders.
- Follow the existing import ordering. ESLint enforces `simple-import-sort`, `import/first`, no duplicate imports, and a newline after imports.
- `console.error` and `console.warn` are allowed; other `console.*` calls are lint errors.
- Keep components functional. Follow existing colocated patterns: feature UI under `src/components/<feature>`, shared primitives under `src/components/ui`, feature state/data hooks under `src/hooks`.
- Component helper functions belong in `src/components/<feature>/helpers/` (e.g. `business.helpers.ts`), not inline in screen or component files. Create `helpers/` when logic grows beyond a few lines.
- Use domain types from `src/types` and keep API response unwrapping in `src/api` or shared helpers rather than inside screen components.
- Do not introduce broad barrel exports unless the folder already uses them meaningfully.

## Routing And Navigation

- Add screens by placing route files in `app/` according to Expo Router conventions.
- Keep route constants in `src/constants/routes.ts` when a route is navigated to from code.
- Root app providers and drawer navigation live in `app/_layout.tsx`; app stack configuration lives in `app/(app)/_layout.tsx`; tab configuration lives in `app/(app)/(tabs)/_layout.tsx`.
- Route groups such as `(auth)` and `(app)` are organizational and are omitted from URLs.

## API, Auth, And State

- Use `apiClient` from `src/api/client.ts` for backend calls. It owns base URL normalization, auth headers, refresh handling, logout handling, and unauthenticated endpoint skipping.
- Backend base URL comes from `EXPO_PUBLIC_API_URL`, defaulting to `https://api.ashker.events`.
- Tenant resolution uses `EXPO_PUBLIC_TENANT_ORIGIN` (sent as `Origin` / `Referer` on API requests).
- Media base URL comes from `EXPO_PUBLIC_MEDIA_URL`.
- Use TanStack Query for server state. Define query keys near the hook, as in `businessKeys`, and invalidate/update the relevant keys after mutations.
- Keep token/session behavior inside `src/api/auth-manager.ts`, `src/api/token-store.ts`, and `src/contexts/auth.tsx`.

## UI And Styling

- Use HeroUI Native primitives and existing local UI components before adding new primitives.
- Use `className` with Uniwind/Tailwind tokens for layout and styling. Prefer existing design tokens from `global.css` such as `primary`, `neutral`, `success`, `info`, `danger`, and `yellow`.
- Use `cn` from `heroui-native` or `tailwind-merge` patterns already present when composing class names.
- Use `tailwind-variants` for reusable variant-driven components.
- The app loads Nunito Sans in `app/_layout.tsx`; use the configured font utility classes where possible.
- Use or create UI → prefer **@components/ui** first, then Tailwind CSS (avoid new custom components if @components/ui covers it)
- Use **@components/ui** to create reusable components, whenever there is a repeated component or reusable component

## Assets And Icons

- SVG icons live in `assets/icons/` and are imported as React components.
- After adding, removing, or renaming SVG icons, run `pnpm sync:icons` to regenerate `src/utils/iconRegistry/registry.ts`.
- App icon, splash, and favicon assets live in `assets/app/` and are referenced by `app.config.ts`.

## Verification

- For most code changes, run `pnpm check-types`.
- Run `pnpm lint` when touching TypeScript/TSX files or import order.
- Run `pnpm check-circular` after moving modules, changing barrel exports, or adding cross-folder dependencies.
- For native/config changes, verify the relevant Expo/EAS path and avoid editing generated native files unless necessary.

## Safety Notes

- The working tree may contain user changes. Do not revert unrelated edits.
- Do not commit secrets, `.env.local`, build artifacts, or generated files unless the user explicitly asks and the file is intended to be tracked.
- Keep changes scoped to the requested feature or fix; avoid opportunistic refactors in unrelated screens or shared components.

# Commits

Use conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`

Keep messages short, lowercase preferred.

# A note to the agent

When you learn something non-obvious or fix the same issue repeatedly, add it to `**docs/agent-notes.md**` and keep this section as the pointer.

→ **Learnings & repeated fixes**: `docs/agent-notes.md`
# stocks-app

Expo SDK 56 + React Native 0.85 + React 19.2 + expo-router v3. Brand new versions; training data is mostly wrong. Verify APIs against https://docs.expo.dev/versions/v56.0.0/ before writing code.

## Project Context: Stock Alert Application (Technical Test)

This app is a real-time stock tracking and alert application. 

**Functional Requirements:**
1.  **Authentication:** Users must be able to log in to the application.
2.  **Stock List:** Display a list of stocks.
3.  **Real-Time Data:** Integrate **Finnhub Stock APIs** (using WebSockets) for real-time price updates.
4.  **Charts:** Include a graphic/chart visualization of the stocks.
5.  **Alert Management:** Provide a form to create Stock Price alerts.
6.  **Push Notifications:** Integrate Firebase Cloud Messaging (FCM) to receive notifications when a price exceeds the alert threshold.

**Deliverable Constraints:**
- Include detailed code documentation (JSDoc, inline comments).

## Commands

Package manager is **pnpm** (lockfile + `pnpm-workspace.yaml`). The README still says `npm install` — ignore it.

- `pnpm install` — install
- `pnpm start` / `pnpm ios` / `pnpm android` / `pnpm web` — dev server
- `pnpm lint` — runs `expo lint` (no eslint config file; uses Expo defaults)
- `pnpm exec tsc --noEmit` — no script; this is how to typecheck
- No test runner is configured. Don't invent one.

`pnpm-workspace.yaml` exists only to whitelist SDK 56 packages past a global `minimumReleaseAge` and to allow `msgpackr-extract` build scripts. It is not a real monorepo.

## Layout & Architecture

- `src/app/` — expo-router routes only (`_layout.tsx`, `index.tsx`, `explore.tsx`, login/auth routes). Everything else goes elsewhere in `src/`.
- `src/components/`, `src/hooks/`, `src/constants/` — app code.
- `src/api/` — use this directory for backend API connections and Firebase API interactions.
- Path aliases: `@/*` -> `src/*`, `@/assets/*` -> `assets/*`. Always use these, never relative `../../`.
- Entry point is `expo-router/entry` (set in `package.json` `main`). There is no `App.tsx`.
- `/ios` and `/android` are gitignored — **managed workflow via prebuild/EAS**, do not commit native folders.

## Conventions

- File names: **kebab-case** (`themed-text.tsx`, `use-color-scheme.ts`, `stock-chart.tsx`). Component exports are PascalCase.
- Platform-specific files use Metro's `.web.tsx` / `.ios.tsx` / `.android.tsx` suffix.
- Single quotes, 2-space indent. VSCode runs `source.organizeImports` + `source.sortMembers` on save; match that import grouping (external, blank line, `@/...`).
- Theming: read colors from `Colors` in `src/constants/theme.ts` via `useTheme()`; use `ThemedText` / `ThemedView` rather than raw `Text` / `View`. Spacing comes from the `Spacing` scale, not magic numbers.
- **React Compiler is enabled** (`experiments.reactCompiler` in `app.json`). Don't add `useMemo`/`useCallback`/`memo` unless profiling proves it's needed.
- **Typed routes are enabled** (`experiments.typedRoutes`). `Href` strings are typechecked against `src/app/`.

## Framework Gotchas (SDK 56 era & External Integrations)

- **UI Components:** `expo-glass-effect`, `expo-symbols`, `@expo/ui` are iOS-first; gate non-iOS usage with `Platform.OS` checks.
- **Theming:** `ThemeProvider`, `DarkTheme`, `DefaultTheme` are imported from **`expo-router`**, not `@react-navigation/native`.
- **Firebase/FCM Integration:** Because the `android` and `ios` folders are gitignored (managed workflow), Firebase *must* be configured using Expo Config Plugins (e.g., `app.json` plugins for `@react-native-firebase/app` and `@react-native-firebase/messaging`). Do not attempt manual native file edits (`MainActivity.java`, `build.gradle`, etc.).
- **Real-Time Performance:** Ensure the Finnhub WebSocket connection handles rapid state updates efficiently without memory leaks, leveraging React 19 state management properly.

## Other

- `CLAUDE.md` just re-exports this file (`@AGENTS.md`); keep guidance here only.
- `pnpm run reset-project` wipes `src/` and `scripts/` — destructive, never run it for cleanup.

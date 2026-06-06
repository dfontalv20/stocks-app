# stocks-app

Expo SDK 56 + React Native 0.85 + React 19.2 + expo-router v3. Brand new versions; training data is mostly wrong. Verify APIs against https://docs.expo.dev/versions/v56.0.0/ before writing code.

## Commands

Package manager is **pnpm** (lockfile + `pnpm-workspace.yaml`). The README still says `npm install` — ignore it.

- `pnpm install` — install
- `pnpm start` / `pnpm ios` / `pnpm android` / `pnpm web` — dev server
- `pnpm lint` — runs `expo lint` (no eslint config file; uses Expo defaults)
- `pnpm exec tsc --noEmit` — no script; this is how to typecheck
- No test runner is configured. Don't invent one.

`pnpm-workspace.yaml` exists only to whitelist SDK 56 packages past a global `minimumReleaseAge` and to allow `msgpackr-extract` build scripts. It is not a real monorepo.

## Layout

- `src/app/` — expo-router routes only (`_layout.tsx`, `index.tsx`, `explore.tsx`). Everything else goes elsewhere in `src/`.
- `src/components/`, `src/hooks/`, `src/constants/` — app code.
- Path aliases: `@/*` -> `src/*`, `@/assets/*` -> `assets/*`. Always use these, never relative `../../`.
- Entry point is `expo-router/entry` (set in `package.json` `main`). There is no `App.tsx`.
- `/ios` and `/android` are gitignored — managed workflow via prebuild/EAS, do not commit native folders.
- `expo-env.d.ts` is auto-generated, do not edit.

## Conventions

- File names: **kebab-case** (`themed-text.tsx`, `use-color-scheme.ts`). Component exports are PascalCase.
- Platform-specific files use Metro's `.web.tsx` / `.ios.tsx` / `.android.tsx` suffix (see `animated-icon.web.tsx`, `app-tabs.web.tsx`, `use-color-scheme.web.ts`).
- Single quotes, 2-space indent. VSCode runs `source.organizeImports` + `source.sortMembers` on save; match that import grouping (external, blank line, `@/...`).
- Theming: read colors from `Colors` in `src/constants/theme.ts` via `useTheme()`; use `ThemedText` / `ThemedView` rather than raw `Text` / `View`. Spacing comes from the `Spacing` scale, not magic numbers.
- **React Compiler is enabled** (`experiments.reactCompiler` in `app.json`). Don't add `useMemo`/`useCallback`/`memo` unless profiling proves it's needed.
- **Typed routes are enabled** (`experiments.typedRoutes`). `Href` strings are typechecked against `src/app/`.

## Framework gotchas (SDK 56 era)

- Tabs use `NativeTabs` from `expo-router/unstable-native-tabs` (unstable API, breaking changes likely). See `src/components/app-tabs.tsx`.
- Reanimated 4 + RN 0.85: worklets live in the separate **`react-native-worklets`** package. Schedule JS callbacks from worklets with `scheduleOnRN` (not the old `runOnJS`). See `src/components/animated-icon.tsx`.
- `expo-glass-effect`, `expo-symbols`, `@expo/ui` are iOS-first; gate non-iOS usage with `Platform.OS` checks.
- `ThemeProvider`, `DarkTheme`, `DefaultTheme` are imported from **`expo-router`**, not `@react-navigation/native`.

## Other

- `CLAUDE.md` just re-exports this file (`@AGENTS.md`); keep guidance here only.
- `pnpm run reset-project` wipes `src/` and `scripts/` — destructive, never run it for cleanup.

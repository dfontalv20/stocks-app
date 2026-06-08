# Stocks App — Real-Time Stock Tracking & Alerts

A React Native mobile application for real-time stock tracking and price alert management. Built with Expo SDK 56, this app delivers live market data via Finnhub WebSockets, interactive charts, and push notifications through Firebase Cloud Messaging (FCM).

## Features

- **Authentication** — Secure login flow with persistent session management.
- **Real-Time Stock Data** — Live price updates streamed via Finnhub WebSocket.
- **Interactive Charts** — Visualize stock performance with `react-native-gifted-charts`.
- **Price Alerts** — Create and manage custom stock price thresholds.
- **Push Notifications** — FCM-powered alerts when a price crosses your threshold.
- **Dark/Light Mode** — Native theme support via Expo Router's `ThemeProvider`.

## Tech Stack

- **React Native** 0.85 — Cross-platform UI framework.
- **Expo SDK 56** — Managed workflow with Expo Router v3 (file-based routing).
- **pnpm** — Fast, disk-efficient package manager.
- **React 19** — Latest concurrent features with React Compiler enabled.
- **TypeScript 6** — Strict-type checking across the entire codebase.
- **@tanstack/react-query** — Server state and cache management.
- **Firebase** — FCM for push notifications (configured via Expo Config Plugins).
- **Finnhub API** — Real-time stock data via WebSocket.

## Architecture & Conventions

The project follows a **feature-based architecture** under `src/`. All business logic, components, and API layers are organized by domain rather than by technical role.

### Coding Conventions

| Convention | Rule |
|---|---|
| **File names** | `kebab-case` (e.g., `stock-chart.tsx`, `use-color-scheme.ts`) |
| **Indentation** | 2 spaces, no tabs |
| **Imports** | External first, blank line, then `@/` aliases |
| **Components** | PascalCase exports; platform-specific files use `.web.tsx` / `.ios.tsx` / `.android.tsx` |
| **Design System** | Use `ThemedText` / `ThemedView` instead of raw `Text` / `View` — they read from `src/constants/theme.ts` and automatically adapt to dark/light mode |
| **Memoization** | React Compiler is enabled; avoid `useMemo` / `useCallback` / `React.memo` unless profiling proves necessary |
| **Hooks** | Custom hooks in `src/hooks/` — prefixed with `use-` |

## Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm installed globally

```bash
npm install -g pnpm
```

- Expo CLI (optional — `pnpm expo` uses the local SDK)

### Installation

```bash
git clone <repository-url>
cd stocks-app
pnpm install
```

### Running the App

Start the Expo development server:

```bash
pnpm start
```

Once the Metro bundler loads, press:

- **`a`** — Open on Android emulator / connected device
- **`i`** — Open on iOS simulator (macOS only)
- **`w`** — Open in web browser

For native builds (required for Firebase/FCM):

```bash
pnpm android   # expo run:android
pnpm ios       # expo run:ios
```

## Project Structure

```
stocks-app/
├── assets/               # Images, fonts, and icons
│   ├── expo.icon/
│   └── images/
├── src/
│   ├── app/              # Expo Router file-based routes
│   │   ├── _layout.tsx   # Root layout (providers, theme)
│   │   ├── index.tsx     # Home / stock list screen
│   │   ├── login.tsx     # Authentication screen
│   │   └── (tabs)/       # Tab navigator routes
│   ├── api/              # Backend API clients & Firebase helpers
│   │   ├── client.ts     # Axios instance with interceptors
│   │   ├── auth.ts       # Auth API calls
│   │   ├── stocks.ts     # Stock data API calls
│   │   ├── alerts.ts     # Alert API calls
│   │   └── shared.ts     # Shared API types & utilities
│   ├── components/       # Reusable UI components
│   │   ├── ui/           # Primitives (ThemedText, ThemedView, etc.)
│   │   ├── stocks/       # Stock list, chart, search components
│   │   ├── alerts/       # Alert form, alert list components
│   │   └── Header.tsx
│   ├── constants/        # App-wide constants & theme tokens
│   │   ├── theme.ts      # Color palette, spacing scale
│   │   └── session.ts    # Session configuration
│   ├── hooks/            # Custom React hooks
│   │   ├── use-auth.tsx
│   │   ├── use-theme.ts
│   │   ├── use-color-scheme.ts
│   │   ├── use-stocks-query.ts
│   │   └── use-finnhub-websocket.ts
│   ├── lib/              # Utility modules
│   │   ├── api.ts        # Generic API helpers
│   │   ├── session.ts    # Session storage (SecureStore)
│   │   └── toast.ts      # Toast notification helpers
│   └── global.css        # Global styles
├── app.json              # Expo configuration
├── tsconfig.json         # TypeScript config with @/ path alias
├── pnpm-lock.yaml
└── package.json
```

## Available Scripts

| Command | Description |
|---|---|
| `pnpm start` | Start the Expo dev server |
| `pnpm android` | Build and run on Android |
| `pnpm ios` | Build and run on iOS |
| `pnpm web` | Start dev server targeting web |
| `pnpm lint` | Run ESLint via `expo lint` |
| `pnpm format` | Format all files with Prettier |
| `pnpm format:check` | Check formatting without writing |
| `pnpm exec tsc --noEmit` | Type-check the project |

> **Note:** No test runner is currently configured. This repository uses `pnpm` as the package manager — do **not** use `npm` or `yarn`.

# CodeRun Mobile App

Expo React Native demo app built around the stack requested in the vacancy: Expo Router, TanStack Query, TanStack Form, TypeScript, NativeWind, persisted auth, CI/CD, and Docker.

## Features

- File-based navigation with Expo Router.
- Protected routes for authenticated screens.
- Login form built with TanStack Form.
- Async server-state loading with TanStack Query.
- Persisted auth session with AsyncStorage.
- In-app mock API layer that works on simulator and real devices.
- No password-in-query auth flow.
- Contact list, search, details screen, loading/error/empty states.
- Tailwind tokens configured in `tailwind.config.js`.
- Runtime color constants in `src/config/theme.ts`.
- ESLint, Prettier, Vitest tests.
- GitHub Actions CI/CD.
- Docker web build served by nginx.

## Demo Login

```text
Email: demo@coderun.dev
Password: password123
```

## Tech Stack

- Expo SDK 53
- Expo Router
- React Native
- React
- TypeScript
- NativeWind / Tailwind CSS
- TanStack Query
- TanStack Form
- AsyncStorage
- Vitest
- ESLint
- Prettier
- GitHub Actions
- Docker + nginx

## Project Structure

```text
app
├── _layout.tsx
├── index.tsx
└── contacts
    ├── index.tsx
    └── [id].tsx

src
├── components
├── config
├── features
│   ├── auth
│   └── contacts
├── screens
├── shared
│   └── api
├── types
└── utils
```

## Mock API

The project intentionally does not use `json-server`. Data is served from an in-app mock API layer:

```text
src/shared/api/mockApi.ts
src/shared/api/mockData.ts
```

This means the app works the same way on:

- iOS Simulator;
- Android Emulator;
- real devices;
- web build.

Auth is modeled as a function call with a payload, not as query parameters:

```ts
signIn({ email, password });
```

This keeps the demo closer to a future real `POST /login` implementation.

## Run

Use Node 20 for Expo compatibility.

```bash
npm install
npm start
```

iOS:

```bash
npm run ios:local
```

Android:

```bash
npm run android:local
```

Web:

```bash
npm run web:local
```

## Build

Local web build:

```bash
npm run build:local
```

Release web build:

```bash
npm run build:release
```

## Quality Checks

```bash
npm run check:expo
npm run lint
npm run format:check
npm run test
npm run typecheck
```

Full local CI:

```bash
npm run ci
```

## CI/CD

GitHub Actions workflows:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy-web.yml`

CI runs Expo dependency checks, ESLint, Prettier check, Vitest, TypeScript, and release build.

Deploy runs after successful CI on `main` and publishes the web build to GitHub Pages.

## Docker

Build:

```bash
docker build -t coderun-mobile-app .
```

Run:

```bash
docker run --rm -p 8080:80 coderun-mobile-app
```

Docker Compose:

```bash
docker compose up --build
```

Open:

```text
http://localhost:8080
```

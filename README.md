# MyApp

Expo React Native application with protected routes, local API data, Redux Toolkit state management, RTK Query requests, environment-based scripts, CI/CD, and Docker web deployment.

## What This Project Demonstrates

This project started as a login screen and was extended into a small but realistic mobile/web application architecture.

Key implemented features:

- Protected navigation based on authentication state.
- Fake login request through the local JSON API.
- Persisted auth state with `redux-persist` and AsyncStorage.
- Login form validation.
- Contact list loaded from a local JSON API.
- Contact details screen loaded by item id.
- Contact search by name, role, company, or city.
- Reusable loading, error, and empty states.
- RTK Query API layer.
- Local development API with `json-server`.
- One-command local startup with `concurrently`.
- Project version displayed in the app header from `package.json`.
- Separate local and release environment files.
- Separate run/build commands per environment.
- GitHub Actions CI/CD workflows.
- Docker production web build with nginx.
- Docker Compose for local web/API containers.
- ESLint, Prettier, and unit tests.

## Tech Stack

- Expo SDK 53
- React 19
- React Native 0.79
- TypeScript
- NativeWind / Tailwind CSS
- React Navigation
- Redux Toolkit
- RTK Query
- redux-persist
- json-server
- dotenv-cli
- concurrently
- ESLint
- Prettier
- Vitest
- GitHub Actions
- Docker + nginx

## Project Structure

```text
.
├── App.tsx
├── db.json
├── package.json
├── app.json
├── Dockerfile
├── docker-compose.yml
├── nginx.conf
├── .env.local
├── .env.release
├── .github/workflows
│   ├── ci.yml
│   └── deploy-web.yml
└── src
    ├── components
    │   ├── EmptyState.tsx
    │   ├── ErrorState.tsx
    │   └── LoadingState.tsx
    ├── config
    │   └── appConfig.ts
    ├── features/auth
    │   └── authSlice.ts
    ├── navigation
    │   ├── RootNavigator.tsx
    │   └── types.ts
    ├── screens
    │   ├── LoginScreen.tsx
    │   ├── ContactsScreen.tsx
    │   └── ContactDetailsScreen.tsx
    ├── services
    │   ├── apiConfig.ts
    │   └── contactsApi.ts
    ├── store
    │   ├── hooks.ts
    │   └── store.ts
    ├── types
    │   └── contact.ts
    └── utils
        └── text.ts
```

## Architecture Overview

The app has two navigation states:

- Public state: shows only the login screen.
- Protected state: shows the contacts list and contact details.

Authentication is intentionally local and simple. When the user submits a valid email and password, the app stores the user in Redux:

```ts
isAuthenticated: true;
token: "fake-token-1";
user: {
  email;
  name;
}
```

The protected screens are rendered only when `isAuthenticated` is true.
Auth state is persisted, so the user remains signed in after app reload until logout.

## Local API

The local API is powered by `json-server` and uses [db.json](./db.json).

Available endpoint:

```bash
GET http://localhost:3001/users
GET http://localhost:3001/contacts
GET http://localhost:3001/contacts/:id
```

The app requests this data through RTK Query, not directly inside the UI components.

Demo login:

```text
Email: demo@coderun.dev
Password: password123
```

## Environment Files

The project uses two environment files:

```text
.env.local
.env.release
```

Local environment:

```bash
EXPO_PUBLIC_APP_ENV=local
EXPO_PUBLIC_API_URL=http://localhost:3001
```

Release environment:

```bash
EXPO_PUBLIC_APP_ENV=release
EXPO_PUBLIC_API_URL=https://api.example.com
```

For a real production deployment, replace `https://api.example.com` with the actual backend URL.

## Install

Use Node 20 for the best Expo compatibility.

```bash
npm install
```

For CI or clean installs:

```bash
npm ci
```

## Run Locally

Start local API and Expo together:

```bash
npm start
```

This runs:

```bash
npm run server
npm run dev:local
```

Run only the local JSON API:

```bash
npm run server
```

Run Expo with local env:

```bash
npm run dev:local
```

## Platform Commands

iOS local:

```bash
npm run ios:local
```

iOS release env:

```bash
npm run ios:release
```

Android local:

```bash
npm run android:local
```

Android release env:

```bash
npm run android:release
```

Web local:

```bash
npm run web:local
```

Web release env:

```bash
npm run web:release
```

## Build

Build web with local env:

```bash
npm run build:local
```

Output:

```text
dist/local
```

Build web with release env:

```bash
npm run build:release
```

Output:

```text
dist/release
```

## Validation And Checks

TypeScript:

```bash
npm run typecheck
```

Expo dependency compatibility:

```bash
npm run check:expo
```

Lint:

```bash
npm run lint
```

Formatting check:

```bash
npm run format:check
```

Format files:

```bash
npm run format
```

Unit tests:

```bash
npm run test
```

Full local CI check:

```bash
npm run ci
```

This runs:

```bash
npm run check:expo
npm run lint
npm run format:check
npm run test
npm run typecheck
npm run build:release
```

## UI Details

The contacts list cards truncate long text:

- Title limit: 24 characters.
- Description limit: 56 characters.

If text is longer, it is displayed with `...`. The full content is available on the details screen.

The list also supports search by:

- name;
- role;
- company;
- city.

The app version is read from `package.json` and displayed in the protected screen header:

```text
v1.0.0
```

## CI/CD

GitHub Actions workflows are located in:

```text
.github/workflows
```

### CI

[ci.yml](./.github/workflows/ci.yml) runs on pull requests and pushes to `main` or `master`.

It performs:

- Dependency install with `npm ci`.
- Expo dependency compatibility check.
- ESLint check.
- Prettier check.
- Unit tests.
- TypeScript check.
- Release web build.
- Upload of the web build artifact.

### Deploy Web

[deploy-web.yml](./.github/workflows/deploy-web.yml) runs after a successful CI workflow on `main` or manually from GitHub Actions.

It performs:

- Dependency install.
- TypeScript check.
- Release web build.
- GitHub Pages artifact upload.
- Deployment to GitHub Pages.

To use GitHub Pages deployment, enable:

```text
GitHub repository -> Settings -> Pages -> Source -> GitHub Actions
```

## Docker

The project includes a production Dockerfile for the web build.

Build image:

```bash
docker build -t myapp .
```

Run container:

```bash
docker run --rm -p 8080:80 myapp
```

Open:

```text
http://localhost:8080
```

Docker flow:

1. Uses Node 20 to install dependencies.
2. Runs `npm run build:release`.
3. Copies `dist/release` into nginx.
4. Serves the app as static web files.

Local Docker Compose:

```bash
docker compose up --build
```

This starts:

- `api` on `http://localhost:3001`;
- `web` on `http://localhost:8080`.

## Notes For Developers

- Keep API calls inside RTK Query services.
- Keep global state in Redux slices.
- Keep navigation types in `src/navigation/types.ts`.
- Keep shared UI-independent helpers in `src/utils`.
- Local API data can be updated in `db.json`.
- Use `.env.local` for development.
- Use `.env.release` for release builds.
- Keep tests near the functions or slices they cover.

## Current Limitations

- Authentication is fake/local and does not call a real backend.
- Release API URL is a placeholder.
- The app currently has contacts only as sample data.
- Docker image serves only the web build, not native iOS/Android apps.

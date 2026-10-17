# Starfall RPG

A top-down, old-school RPG set in the Starfall universe.

This initial project uses **React + TypeScript + Vite** for the browser UI and
**Jest** for tests. There is no game-framework dependency. The current app is a
title screen with a session-start placeholder; gameplay is still to be built.

## Getting started

Use Node.js 24 (see `.nvmrc`) and npm.

```sh
npm ci
npm run dev
```

Open the local URL Vite prints. Use `npm run build` for the production bundle and
`npm run preview` to serve that bundle locally.

## Project boundaries

| Location | Responsibility |
| --- | --- |
| `src/game/` | Plain TypeScript game rules, state, simulation, and data |
| `src/adapters/` | Future browser, renderer, audio, input, and storage integrations |
| `src/ui/` | React screens, components, UI interactions, and styles |
| `src/main.tsx` | Browser entry point and application composition |
| `tests/` | Shared Jest setup and mocks |

React UI and platform adapters may use game code. Game code must not depend on
React, UI, adapters, browser APIs, or a game framework. Its separate TypeScript
check omits DOM and ambient Node types, and import restrictions enforce the layer
boundary. This lets a future renderer change without moving game rules into it.

Use plain, serializable state and explicit actions. The small session reducer
demonstrates this boundary. External effects such as time, randomness, storage,
and rendering should be provided through adapters when those features are needed.
Do not add a game loop or renderer abstraction until there is a concrete use case.

## Testing and checks

```sh
npm test                 # All Jest projects
npm run test:watch       # Watch mode
npm run test:game        # Game tests in Node, without a DOM
npm run test:ui          # React tests in jsdom
npm run test:ci          # All tests with coverage, no watch mode
npm run typecheck       # Strict TypeScript checks, including tests
npm run lint            # Oxlint, including game-layer import restrictions
npm run check           # Lint, tests with coverage, typecheck, production build
```

Colocate game tests as `src/game/**/*.test.ts` and UI tests as
`src/ui/**/*.test.tsx` (or `.test.ts`). UI tests use React Testing Library,
user-event, and jest-dom. Test the observable behavior of components and game
systems; prefer deterministic inputs over browser or engine mocks in game tests.
Adapter tests can live alongside their implementations and run in the UI Jest
project's jsdom environment.

Jest transforms TypeScript and JSX through Babel into CommonJS for its test
runtime. Vite handles the browser build separately. Babel does not typecheck, so
`npm run typecheck` checks production code and tests as part of `npm run check`.
Jest configuration lives in `jest.config.cjs`; test-only Babel configuration
lives in `babel.config.cjs`. No `import.meta.env` or Vite APIs belong in game code.

`package-lock.json` is committed for repeatable installs. Generated builds,
coverage, dependencies, local environment files, and TypeScript caches are ignored.

GitHub Actions runs the same install and check commands on pushes and pull requests.

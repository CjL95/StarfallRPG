# Game code

Keep rules, simulation, state, and game data here as plain TypeScript. This layer
must not import React, UI code, renderer libraries, or browser APIs. It should run
in Node without a DOM; `tsconfig.game.json` checks it without DOM or ambient Node
types, and the `game` Jest project uses the Node environment.

The session reducer is a small starting point for serializable state and explicit
actions, not a commitment to a particular game engine or state library. Future
systems should accept their inputs explicitly. Inject time, randomness, storage,
and other external services when needed so tests can control them.

Colocate unit tests as `*.test.ts`. Browser and rendering integrations belong in
`src/adapters`; React presentation belongs in `src/ui`.

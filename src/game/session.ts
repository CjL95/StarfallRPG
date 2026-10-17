/** Serializable state with no React, browser, or engine dependencies. */
export interface GameSession {
  readonly phase: 'title' | 'in-game'
}

export type GameSessionAction =
  | { readonly type: 'start-new-game' }
  | { readonly type: 'return-to-title' }

export function createGameSession(): GameSession {
  return { phase: 'title' }
}

export function gameSessionReducer(
  session: GameSession,
  action: GameSessionAction,
): GameSession {
  switch (action.type) {
    case 'start-new-game':
      return { ...session, phase: 'in-game' }
    case 'return-to-title':
      return createGameSession()
  }
}

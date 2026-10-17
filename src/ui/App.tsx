import { useReducer } from 'react'
import { createGameSession, gameSessionReducer } from '../game/session'
import './App.css'

export default function App() {
  const [session, dispatch] = useReducer(
    gameSessionReducer,
    undefined,
    createGameSession,
  )

  return (
    <main className="game-shell">
      <section className="game-panel" aria-labelledby="game-title">
        <p className="eyebrow">A new adventure</p>
        <h1 id="game-title">Starfall RPG</h1>
        {session.phase === 'title' ? (
          <>
            <p>A world of stories awaits.</p>
            <button
              type="button"
              onClick={() => dispatch({ type: 'start-new-game' })}
            >
              New game
            </button>
          </>
        ) : (
          <section aria-label="Game world" aria-live="polite">
            <h2>Your adventure awaits</h2>
            <p>The world is taking shape.</p>
            <button
              type="button"
              onClick={() => dispatch({ type: 'return-to-title' })}
            >
              Return to title
            </button>
          </section>
        )}
      </section>
    </main>
  )
}

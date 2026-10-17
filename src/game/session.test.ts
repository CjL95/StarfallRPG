import { describe, expect, it } from '@jest/globals'
import { createGameSession, gameSessionReducer } from './session'

describe('game sessions', () => {
  it('starts at the title screen with independent state for each session', () => {
    const first = createGameSession()
    const second = createGameSession()

    expect(first).toEqual({ phase: 'title' })
    expect(second).toEqual(first)
    expect(second).not.toBe(first)
  })

  it('starts a new game without mutating the previous snapshot', () => {
    const previous = Object.freeze(createGameSession())
    const next = gameSessionReducer(previous, { type: 'start-new-game' })

    expect(next.phase).toBe('in-game')
    expect(previous.phase).toBe('title')
  })

  it('returns to a fresh title state without mutating an active session', () => {
    const active = Object.freeze(
      gameSessionReducer(createGameSession(), { type: 'start-new-game' }),
    )
    const next = gameSessionReducer(active, { type: 'return-to-title' })

    expect(next).toEqual(createGameSession())
    expect(active.phase).toBe('in-game')
  })
})

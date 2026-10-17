import { describe, expect, it } from '@jest/globals'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

describe('the game shell', () => {
  it('presents the title and an accessible new-game control', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: 'Starfall RPG' }),
    ).toBeVisible()
    expect(screen.getByRole('button', { name: 'New game' })).toBeEnabled()
  })

  it('can start with the keyboard and return to the title', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.tab()
    expect(screen.getByRole('button', { name: 'New game' })).toHaveFocus()
    await user.keyboard('{Enter}')

    expect(screen.getByRole('region', { name: 'Game world' })).toBeVisible()
    expect(screen.queryByRole('button', { name: 'New game' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Return to title' }))

    expect(screen.getByRole('button', { name: 'New game' })).toBeVisible()
    expect(screen.queryByRole('region', { name: 'Game world' })).not.toBeInTheDocument()
  })
})

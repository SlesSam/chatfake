import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChatList from '../chatList'
import { useRouter, usePathname } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}))


jest.mock('@/data/chat.json', () => [
  {
    id: '1',
    userId: 'user1',
    title: 'JSON Chat',
    lastMessage: 'Hola desde json',
  },
])

describe('ChatList', () => {
  beforeEach(() => {
    localStorage.clear()
    ;(usePathname as jest.Mock).mockReturnValue('/chats/1')
    ;(useRouter as jest.Mock).mockReturnValue({ push: jest.fn() })
  })

  it('muestra mensaje si no hay chats', () => {
    render(<ChatList userId="unknownUser" />)
    expect(screen.getByText('No hay chats disponibles')).toBeInTheDocument()
  })

  it('renderiza chats del userId correctamente', () => {
    localStorage.setItem(
      'chats',
      JSON.stringify([
        {
          id: '2',
          userId: 'user1',
          title: 'Local Chat',
          lastMessage: 'Mensaje local',
        },
      ])
    )

    render(<ChatList userId="user1" />)

    expect(screen.getByText('Local Chat')).toBeInTheDocument()
    expect(screen.getByText('Mensaje local')).toBeInTheDocument()
    expect(screen.getByText('JSON Chat')).toBeInTheDocument()
  })

})

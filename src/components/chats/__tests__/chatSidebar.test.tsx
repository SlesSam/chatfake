import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChatSidebar from '../chatSidebar'


const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => '/chats/123', 
}))


const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => { store[key] = value },
    clear: () => { store = {} },
  }
})()
Object.defineProperty(window, 'localStorage', { value: localStorageMock })

describe('ChatSidebar', () => {
  beforeEach(() => {
    localStorage.clear()
    mockPush.mockClear()
  })

  it('renderiza el botón + New chat y título', () => {
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'Leslie' }))
    render(<ChatSidebar />)

    expect(screen.getByText('+ New chat')).toBeInTheDocument()
    expect(screen.getByText('Chat')).toBeInTheDocument()
  })

  it('redirige al login si no hay usuario', () => {
    render(<ChatSidebar />)
    expect(mockPush).toHaveBeenCalledWith('/')
  })

  it('crea nuevo chat y redirige correctamente', () => {
    localStorage.setItem('user', JSON.stringify({ id: '1', name: 'Leslie' }))
    render(<ChatSidebar />)

    fireEvent.click(screen.getByText('+ New chat'))

    const chats = JSON.parse(localStorage.getItem('chats') || '[]')
    expect(chats[0].title).toBe('Nuevo chat')
    expect(mockPush).toHaveBeenCalledWith(`/chats/${chats[0].id}`)
  })
})
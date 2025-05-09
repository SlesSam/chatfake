import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import LoginForm from '../loginForm'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))


jest.mock('@/data/user.json', () => [
  {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    password: '123456',
  },
])


const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

describe('LoginForm', () => {
  const mockPush = jest.fn()

  beforeEach(() => {
    localStorage.clear()
    mockPush.mockClear()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  })

  it('renders the login form', () => {
    render(<LoginForm />)
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('shows error with invalid credentials', () => {
    render(<LoginForm />)
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'wrong@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpass' },
    })
    fireEvent.click(screen.getByText('Login'))

    expect(screen.getByText('Correo o contraseña incorrectos.')).toBeInTheDocument()
  })

  it('logs in with correct credentials and redirects', () => {
    render(<LoginForm />)
    fireEvent.change(screen.getByPlaceholderText('Email'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '123456' },
    })
    fireEvent.click(screen.getByText('Login'))

    expect(mockPush).toHaveBeenCalledWith('/chats')
    expect(localStorage.getItem('user')).toContain('test@example.com')
  })
})

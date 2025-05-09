import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChatMessages from '../chatMessages'
import { Message } from '@/types/message'


jest.mock('../chatEmpty', () => {
  const MockEmptyChat = () => <div data-testid="empty-chat">Empty</div>
  MockEmptyChat.displayName = 'MockEmptyChat'
  return MockEmptyChat
})

describe('ChatMessages', () => {
  it('muestra EmptyChat si no hay mensajes', () => {
    render(<ChatMessages messages={[]} />)
    expect(screen.getByTestId('empty-chat')).toBeInTheDocument()
  })

  it('renderiza mensajes correctamente', () => {
    const messages: Message[] = [
      {
        id: '1',
        chatId: 'abc',
        sender: 'user',
        text: 'Hola\n¿cómo estás?',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        chatId: 'abc',
        sender: 'ai',
        text: '¡Hola!\nEstoy bien :)',
        timestamp: new Date().toISOString(),
      },
    ]

    render(<ChatMessages messages={messages} />)

    expect(screen.getByText('Hola')).toBeInTheDocument()
    expect(screen.getByText('¿cómo estás?')).toBeInTheDocument()
    expect(screen.getByText('¡Hola!')).toBeInTheDocument()
    expect(screen.getByText('Estoy bien :)')).toBeInTheDocument()
  })
})

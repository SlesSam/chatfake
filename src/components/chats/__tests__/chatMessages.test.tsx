import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ChatMessages from '../chatMessages'
import { Message } from '@/types/message'


jest.mock('../chatEmpty', () => {
  const MockEmptyChat = () => <div data-testid="empty-chat">Empty</div>
  MockEmptyChat.displayName = 'MockEmptyChat'
  return MockEmptyChat
})

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn()
})

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
  error: jest.fn(),
}))

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


  it('muestra los botones de reacción en mensajes de la IA', () => {
    const messages: Message[] = [
      {
        id: '1',
        chatId: 'abc',
        sender: 'ai',
        text: 'Respuesta de la IA',
        timestamp: new Date().toISOString(),
      },
    ]

    render(<ChatMessages messages={messages} />)

    expect(screen.getByTitle('Copiar')).toBeInTheDocument()
    expect(screen.getByTitle('Me gusta')).toBeInTheDocument()
    expect(screen.getByTitle('No me gusta')).toBeInTheDocument()
    expect(screen.getByTitle('Regenerar')).toBeInTheDocument()
  })

  it('copia el texto al hacer clic en el botón de copiar', async () => {
    const writeText = jest.fn()
    Object.assign(navigator, {
      clipboard: { writeText },
    })

    const messages: Message[] = [
      {
        id: '1',
        chatId: 'abc',
        sender: 'ai',
        text: 'Texto para copiar',
        timestamp: new Date().toISOString(),
      },
    ]

    render(<ChatMessages messages={messages} />)

    const copyBtn = screen.getByTitle('Copiar')
    copyBtn.click()

    expect(writeText).toHaveBeenCalledWith('Texto para copiar')
  })
})
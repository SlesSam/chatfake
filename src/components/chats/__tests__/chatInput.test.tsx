import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatInput from '../chatInput';

describe('ChatInput', () => {
  it('permite escribir y enviar un mensaje', () => {
    const mockOnSend = jest.fn();

    render(<ChatInput onSend={mockOnSend} />);

    const textarea = screen.getByPlaceholderText("What's in your mind?...");
    const button = screen.getByRole('button');

    // Escribe en el textarea
    fireEvent.change(textarea, { target: { value: 'Hola mundo' } });
    expect(textarea).toHaveValue('Hola mundo');

    // Envía el formulario
    fireEvent.click(button);

    // onSend ha sido llamado
    expect(mockOnSend).toHaveBeenCalledWith('Hola mundo');

    // El textarea debe estar vacío después de enviar
    expect(textarea).toHaveValue('');
  });

  it('no envía si el texto está vacío o solo espacios', () => {
    const mockOnSend = jest.fn();
    render(<ChatInput onSend={mockOnSend} />);

    const textarea = screen.getByPlaceholderText("What's in your mind?...");
    fireEvent.change(textarea, { target: { value: '    ' } });

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnSend).not.toHaveBeenCalled();
  });
});

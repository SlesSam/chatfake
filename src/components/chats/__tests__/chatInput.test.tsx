import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatInput from '../chatInput';

describe('ChatInput', () => {
  it('permite escribir y enviar un mensaje', () => {
    const mockOnSend = jest.fn();

    render(<ChatInput onSend={mockOnSend} />);

    const textarea = screen.getByPlaceholderText("What's in your mind?...");
    const button = screen.getByRole('button');

    fireEvent.change(textarea, { target: { value: 'Hola mundo' } });
    expect(textarea).toHaveValue('Hola mundo');

    fireEvent.click(button);

    expect(mockOnSend).toHaveBeenCalledWith('Hola mundo');
  
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

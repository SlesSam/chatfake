import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmptyChat from '../chatEmpty';

describe('EmptyChat', () => {
  it('muestra el mensaje y botones', () => {
    render(<EmptyChat />);
    expect(screen.getByText('¿En qué puedo ayudarte?')).toBeInTheDocument();
    expect(screen.getByText('Buscar')).toBeInTheDocument();
    expect(screen.getByText('Investigación')).toBeInTheDocument();
    expect(screen.getByText('Crea una imagen')).toBeInTheDocument();
  });
});

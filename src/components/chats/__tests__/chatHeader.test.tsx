import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ChatHeader from '../chatHeader';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockRouter = { push: jest.fn() };
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: () => JSON.stringify({ name: 'Leslie' }),
    removeItem: jest.fn(),
  },
});

describe('ChatHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('muestra el nombre del usuario', () => {
    render(<ChatHeader />);
    expect(screen.getByText('Hola, Leslie 👋')).toBeInTheDocument();
  });

  it('redirige al hacer logout', () => {
    render(<ChatHeader />);
    const button = screen.getByText(/cerrar session/i);
    fireEvent.click(button);
    expect(window.localStorage.removeItem).toHaveBeenCalledWith('user');
    expect(mockRouter.push).toHaveBeenCalledWith('/');
  });
});
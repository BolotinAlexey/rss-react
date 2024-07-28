import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';
import { useTheme } from '../../hooks/useTheme';
import { Mock, vi } from 'vitest';

vi.mock('../../hooks/useTheme', () => ({
  useTheme: vi.fn(),
}));

describe('Header Component', () => {
  it('should render without crashing', () => {
    (useTheme as Mock).mockImplementation(() => [false, vi.fn()]);

    render(<Header />);
    const switcherInput = screen.getByRole('checkbox', { name: /theme/i });

    expect(switcherInput).toBeInTheDocument();
  });

  it('should call toggleTheme when the switch is toggled', () => {
    const mockToggleTheme = vi.fn();

    (useTheme as Mock).mockImplementation(() => [false, mockToggleTheme]);
    render(<Header />);
    const switcherInput = screen.getByRole('checkbox', { name: /theme/i });
    fireEvent.click(switcherInput);

    expect(mockToggleTheme).toHaveBeenCalled();
  });
});

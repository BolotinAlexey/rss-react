import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '../components/ThemeProvider';
import { useTheme } from './useTheme';

const TestComponent = () => {
  const [theme, toggleTheme] = useTheme();

  return (
    <div>
      <span>Current theme: {theme ? 'Dark' : 'Light'}</span>
      <label>
        <input type="checkbox" onChange={toggleTheme} />
        Toggle Theme
      </label>
    </div>
  );
};

describe('useTheme', () => {
  it('provides the default theme value', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText(/Current theme: Light/i)).toBeInTheDocument();
  });

  it('toggles the theme value when the checkbox is clicked', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const checkbox = screen.getByLabelText(/Toggle Theme/i);
    fireEvent.click(checkbox);

    expect(screen.getByText(/Current theme: Dark/i)).toBeInTheDocument();
  });
});

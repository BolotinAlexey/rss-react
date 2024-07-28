import { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import {
  ThemeContext,
  ThemeUpdateContext,
  ThemeProvider,
} from './ThemeProvider';

const TestComponent = () => {
  const theme = useContext(ThemeContext);
  const toggleTheme = useContext(ThemeUpdateContext);

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

describe('ThemeProvider', () => {
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

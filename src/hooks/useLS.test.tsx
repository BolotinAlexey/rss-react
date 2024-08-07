import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { TestComponent } from '../tests/mockElement';

describe('useLS', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: vi.fn(),
        setItem: vi.fn(),
        clear: vi.fn(),
        removeItem: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with value from localStorage if no query param', () => {
    (window.localStorage.getItem as Mock).mockReturnValue('storedValue');

    render(<TestComponent query={{}} />);

    expect(screen.getByTestId('name').textContent).toBe('storedValue');
  });

  it('should initialize with query parameter if provided', () => {
    render(<TestComponent query={{ search: 'queryValue' }} />);

    expect(screen.getByTestId('name').textContent).toBe('queryValue');
  });
});

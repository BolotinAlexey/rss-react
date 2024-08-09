import { render, screen } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi, Mock } from 'vitest';
import { ReadonlyURLSearchParams } from 'next/navigation';
import useLS from '../hooks/useLS';

vi.mock('next/navigation', () => ({
  __esModule: true,
  ReadonlyURLSearchParams: vi.fn(),
}));

const TestComponent = ({ query }: { query: ReadonlyURLSearchParams }) => {
  const [name] = useLS(query);

  return <div data-testid="name">{name}</div>;
};

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

  it('should initialize with value from localStorage if no search query param is provided', () => {
    (window.localStorage.getItem as Mock).mockReturnValue('storedValue');

    const mockQuery =
      new URLSearchParams() as unknown as ReadonlyURLSearchParams;

    render(<TestComponent query={mockQuery} />);

    expect(screen.getByTestId('name').textContent).toBe('storedValue');
  });

  it('should initialize with search query parameter if provided', () => {
    const mockQuery = new URLSearchParams({
      search: 'queryValue',
    }) as unknown as ReadonlyURLSearchParams;

    render(<TestComponent query={mockQuery} />);

    expect(screen.getByTestId('name').textContent).toBe('queryValue');
  });
});

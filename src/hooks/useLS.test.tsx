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

  // it('should update localStorage when name changes', async () => {
  //   render(<TestComponent query={{}} />);

  //   act(() => {
  //     screen.getByText('Update Name').click();
  //   });

  //   await act(async () => {
  //     new Promise((r) => setTimeout(r, 100));
  //   });

  //   expect(window.localStorage.setItem).toHaveBeenCalledWith(
  //     LS_KEY,
  //     'newValue'
  //   );
  //   expect(screen.getByTestId('name').textContent).toBe('newValue');
  // });

  // it('should save name to localStorage on unmount', async () => {
  //   render(<TestComponent query={{}} />);

  //   act(() => {
  //     screen.getByText('Update Name').click();
  //   });

  //   const { unmount } = render(<TestComponent query={{}} />);
  //   unmount();

  //   await act(async () => {
  //     new Promise((r) => setTimeout(r, 100));
  //   });

  //   expect(window.localStorage.setItem).toHaveBeenCalledWith(
  //     LS_KEY,
  //     'newValue'
  //   );
  // });
});
